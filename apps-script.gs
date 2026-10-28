// Recibe las confirmaciones de la landing y las guarda en la hoja "Confirmaciones" (o en la primera pestaña).
// Una fila por persona. Si alguien reenvía con el mismo nombre, se sustituyen sus filas.

const HOJA = 'Confirmaciones';
const CABECERA = ['Fecha', 'Grupo (quien confirma)', 'Persona', 'Tipo', 'Niño/a', 'Edad', 'Asiste', 'Alergias e intolerancias', 'Otra', 'Mensaje'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const nombre = String(d.nombre || '').trim().slice(0, 120);
    if (!nombre || !['si', 'no'].includes(d.asiste)) return json({ ok: false, error: 'datos incompletos' });

    const sh = hoja();
    borrarGrupo(sh, nombre);

    const ahora = new Date();
    const asiste = d.asiste === 'si' ? 'Sí' : 'No';
    const filas = [[ahora, nombre, nombre, 'Titular', 'No', '', asiste, limpio(d.alergias), limpio(d.otra), limpio(d.mensaje, 1000)]];
    (d.acompanantes || []).slice(0, 10).forEach(a => {
      const nino = a.nino === true;
      const edad = nino && /^\d{1,2}$/.test(String(a.edad)) ? Number(a.edad) : '';
      filas.push([ahora, nombre, limpio(a.nombre, 120), 'Acompañante', nino ? 'Sí' : 'No', edad, asiste, limpio(a.alergias), limpio(a.otra), '']);
    });
    sh.getRange(sh.getLastRow() + 1, 1, filas.length, CABECERA.length).setValues(filas);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function hoja() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(HOJA) || ss.getSheets()[0];
  if (sh.getRange(1, 1).getValue() !== CABECERA[0]) sh.getRange(1, 1, 1, CABECERA.length).setValues([CABECERA]);
  if (sh.getFrozenRows() !== 1) {
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, CABECERA.length).setFontWeight('bold');
  }
  return sh;
}

function borrarGrupo(sh, nombre) {
  const n = sh.getLastRow();
  if (n < 2) return;
  const clave = normal(nombre);
  const grupos = sh.getRange(2, 2, n - 1, 1).getValues();
  for (let i = grupos.length - 1; i >= 0; i--) {
    if (normal(grupos[i][0]) === clave) sh.deleteRow(i + 2);
  }
}

// Evita que un texto empiece por =, +, - o @ y se interprete como fórmula
function limpio(v, max) {
  let s = String(v || '').trim().slice(0, max || 300);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function normal(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/\s+/g, ' ').trim();
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
