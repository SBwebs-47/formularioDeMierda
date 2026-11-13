# Bad UX Form — El Formulario Anti-Usuario

> *"Si crees que llenar un formulario en internet es aburrido, es porque todavía no probaste este."*

## Descripción

**Bad UX Form** es un proyecto experimental diseñado **intencionalmente mal** desde el punto de vista de la experiencia de usuario (UX/UI). El objetivo principal no es recolectar datos de forma eficiente, sino **poner a prueba la paciencia y el nivel de estrés** de quien intente completarlo.

Cada campo está pensado para romper con las convenciones modernas de diseño web y obligar al usuario a pensar dos veces (o diez) antes de hacer clic en *Enviar*.

---

##  Características "hostiles" incluidas

* **Selector de fecha mes por mes:** ¿Naciste hace 25 años? Prepárate para hacer más de 300 clics retrocediendo mes a mes, sin posibilidad de escribir ni saltar de año.
* * Teléfono en palabras:** Olvídate del teclado numérico. Aquí el número se escribe letra por letra (`dosseisuno...`) y el backend se encarga de descifrarlo.
* * Validación estricta de mayoría de edad:** Si sobreviviste al calendario, el servidor verificará al día exacto si realmente tienes más de 18 años.
* * Inputs bloqueados y reglas poco intuitivas:** Porque nada dice "bienvenido" como un formulario que se resiste a ser llenado.

---

##  Tecnologías utilizadas

* **Frontend:** HTML5, CSS3, JavaScript Vanilla (DOM manipulation pura para máxima tortura).
* **Backend:** Node.js + Express.
* **Validación:** [Zod](https://zod.dev/) (encargado de transformar texto a números, validar fechas y rechazar cualquier intento fallido).

---

##  Cómo ejecutarlo en local

1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
   cd tu-repositorio
