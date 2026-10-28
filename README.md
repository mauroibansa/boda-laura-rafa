# Landing boda Laura y Rafa

Contenido: `index.html` (la web), `img/` (recursos) y `apps-script.gs` (lo que guarda las confirmaciones en Google Sheets).

## 1. Conectar el formulario a Google Sheets (10 minutos)

1. Crea una hoja de cálculo nueva en Google Drive, por ejemplo "Boda Laura y Rafa – Confirmaciones".
2. En la hoja: Extensiones → Apps Script.
3. Borra lo que haya, pega el contenido de `apps-script.gs` y guarda.
4. Implementar → Nueva implementación → tipo "Aplicación web".
   - Ejecutar como: Yo
   - Quién tiene acceso: Cualquier usuario
5. Autoriza los permisos que pide Google y copia la URL de la aplicación web (termina en `/exec`).
6. En `index.html`, busca `const ENDPOINT = '';` y pega la URL entre las comillas.

Cada confirmación crea una fila por persona (titular y acompañantes) con sus alergias, y en los acompañantes si es niño/a y su edad. Si alguien vuelve a enviar con el mismo nombre, se sustituyen sus filas anteriores.

## 2. Publicación

La web se publica con GitHub Pages desde la rama `main` del repositorio `mauroibansa/boda-laura-rafa`: https://mauroibansa.github.io/boda-laura-rafa/

Dominio propio `laurayrafa.es` (DonDominio, renovación manual). DNS:

| Tipo | Nombre | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | mauroibansa.github.io |

Después, en Settings → Pages → Custom domain: `laurayrafa.es` y marcar Enforce HTTPS.

Para retirar la web tras la boda: Settings → Pages → desactivar (o archivar/borrar el repositorio). El dominio caduca solo al no renovarlo.

## Pendiente

- Guirnalda sustituida el 28/10/2026 por versión de mayor resolución (desde captura de Canva, fondo quitado).
- Punto kilométrico de la finca (km 4 o km 5): ahora la dirección no lo indica.
- Formulario conectado a la hoja "Confirmaciones" (Drive de Mauro, carpeta MAMMUT/Boda Laura y Rafa). Si se cambia el script: Implementar → Gestionar implementaciones → editar → Nueva versión, para mantener la URL.
- Tipografías: se usan Ephesis y Cormorant Garamond (Google Fonts). Las de la invitación (Hamilton Script y Alize) necesitan licencia web.
