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

## 2. Publicar la web (Netlify, gratis)

1. Entra en https://app.netlify.com/drop
2. Arrastra la carpeta `landing-boda` completa.
3. Netlify da una dirección del tipo `nombre-aleatorio.netlify.app`. En Site settings puedes cambiarla, por ejemplo `laurayrafa.netlify.app`, o conectar un dominio propio.

## Pendiente

- Guirnalda a tamaño completo: sustituir `img/guirnalda.webp` (la actual es una miniatura).
- Punto kilométrico de la finca (km 4 o km 5): ahora la dirección no lo indica.
- Tipografías: se usan Ephesis y Cormorant Garamond (Google Fonts). Las de la invitación (Hamilton Script y Alize) necesitan licencia web.
