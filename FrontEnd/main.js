const wrapper = document.getElementById('pickerWrapper');
    const dateDisplay = document.getElementById('dateDisplay');
    const dateValue = document.getElementById('dateValue');
    const popup = document.getElementById('calendarPopup');
    const monthTitle = document.getElementById('monthTitle');
    const daysGrid = document.getElementById('daysGrid');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    let viewDate = new Date(); // Mes que se está visualizando
    viewDate.setDate(1);
    let selectedDate = null;   // Fecha elegida por el usuario

    // Abrir / cerrar calendario
    dateDisplay.addEventListener('click', () => {
      popup.classList.toggle('open');
      renderCalendar();
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        popup.classList.remove('open');
      }
    });

    // Navegar SOLO mes por mes
    prevBtn.addEventListener('click', () => {
      viewDate.setMonth(viewDate.getMonth() - 1);
      renderCalendar();
    });

    nextBtn.addEventListener('click', () => {
      viewDate.setMonth(viewDate.getMonth() + 1);
      renderCalendar();
    });

    function renderCalendar() {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();

      // Título estático (no clickeable para evitar saltos de año)
      monthTitle.textContent = viewDate.toLocaleDateString('es-ES', {
        month: 'long',
        year: 'numeric'
      });

      daysGrid.innerHTML = '';

      // Primer día del mes (ajustado para que Lunes sea 0 y Domingo 6)
      const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Espacios vacíos antes del día 1
      for (let i = 0; i < firstDayIndex; i++) {
        const empty = document.createElement('button');
        empty.type = 'button';
        empty.className = 'empty';
        empty.disabled = true;
        daysGrid.appendChild(empty);
      }

      // Botones de cada día del mes
      for (let day = 1; day <= daysInMonth; day++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = day;

        if (
          selectedDate &&
          selectedDate.getDate() === day &&
          selectedDate.getMonth() === month &&
          selectedDate.getFullYear() === year
        ) {
          btn.classList.add('selected');
        }

        btn.addEventListener('click', () => {
          selectedDate = new Date(year, month, day);
          
          const yyyy = year;
          const mm = String(month + 1).padStart(2, '0');
          const dd = String(day).padStart(2, '0');

          // Guardar valor estándar YYYY-MM-DD y mostrar DD/MM/YYYY
          dateValue.value = `${yyyy}-${mm}-${dd}`;
          dateDisplay.value = `${dd}/${mm}/${yyyy}`;
          
          popup.classList.remove('open');
        });

        daysGrid.appendChild(btn);
      }
    }




function validarSoloTexto(texto) {
    // \d busca cualquier dígito del 0 al 9 en el string
    const contieneNumeros = /\d/.test(texto);

    if (contieneNumeros) {
        alert("El campo no puede contener números.");
        return false;
    }else if (texto.trim() === "") {
        alert("El campo no puede estar vacío.");
        return false;
    }

    return true;
}


function guardarDato(fieldId, valor) {
    console.log(`[GUARDAR DATO] Campo: "${fieldId}" | Valor actual: "${valor}"`);

    if (fieldId === 'password') {
        validarSoloTexto(valor);
    }
}



document.querySelector("#Formulario").addEventListener("submit", async function(event) {
   
    const materia = document.querySelector("input[name='materia']").value;
    const profesor = document.querySelector("input[name='profesor']").value;
    const fecha = document.querySelector("input[name='fecha']").value;  
    const password = document.querySelector("input[name='password']").value;
    const email = document.querySelector("input[name='email']").value;
    const telefono = document.querySelector("input[name='telefono']").value;
    const nombre = document.querySelector("input[name='nombre']").value;
    if (!validarSoloTexto(telefono) || !validarSoloTexto(password)) {
        
    }   

    

    const body={
        materia,
        profesor,
        fecha,
        password,
        email,
        telefono,
        nombre
    };

    console.log("Enviando datos al backend:", body);
    try {
        const response = await fetch("http://localhost:3000/submit-form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        console.log("Respuesta del servidor:", response);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Errores de validación del servidor:", errorData);
            alert("Errores de validación: " + JSON.stringify(errorData.errores));
            return;
        }else {
            const data = await response.json();
            console.log("Datos recibidos del servidor:", data);
            if (data.redirectUrl) {
                window.location.href = 'http://localhost:3000/gracias'; // Redirige a la página de gracias
            } else {
                alert("Formulario enviado correctamente.");
            }
          }
    } catch (error) {
        console.error("Error de red:", error);
        alert("Hubo un error de red al enviar el formulario.");
    }


})

