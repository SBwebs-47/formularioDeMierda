import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend!" });
});


function textoADigitos(texto) {
  const mapa = {
    cero: '0',
    uno: '1',
    un: '1',
    dos: '2',
    tres: '3',
    cuatro: '4',
    cinco: '5',
    seis: '6',
    siete: '7',
    ocho: '8',
    nueve: '9'
  };

  const limpio = texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const coincidencias = limpio.match(/cero|uno|un|dos|tres|cuatro|cinco|seis|siete|ocho|nueve/g);

  return coincidencias ? coincidencias.map((palabra) => mapa[palabra]).join('') : '';
}

const formSchema = z.object({
  materia: z.string().min(2, "El campo 'materia' debe tener al menos 2 caracteres.").nonempty("El campo 'materia' no puede estar vacío."),
  profesor: z.string().min(2, "El campo 'profesor' debe tener al menos 2 caracteres.").nonempty("El campo 'profesor' no puede estar vacío."),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (YYYY-MM-DD)')
    .refine((fechaStr) => {
      // Separamos año, mes y día para evitar problemas de zona horaria
      const [anio, mes, dia] = fechaStr.split('-').map(Number);
      const nacimiento = new Date(anio, mes - 1, dia);
      
      // Verificar que sea una fecha real (ej. que no sea 31 de febrero)
      if (
        nacimiento.getFullYear() !== anio ||
        nacimiento.getMonth() !== mes - 1 ||
        nacimiento.getDate() !== dia
      ) {
        return false;
      }

      const hoy = new Date();
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const diferenciaMeses = hoy.getMonth() - nacimiento.getMonth();

      // Si aún no llegó el mes de cumpleaños, o es el mes pero aún no llegó el día, restamos 1 año
      if (
        diferenciaMeses < 0 ||
        (diferenciaMeses === 0 && hoy.getDate() < nacimiento.getDate())
      ) {
        edad--;
      }

      return edad >= 18;
    }, {
      message: 'Debes ser mayor de 18 años'
    }),
  password: z.string()
    .transform((val) => textoADigitos(val),)
    .refine((num) => /^\d{7,15}$/.test(num), 'Contraseña inválida (7 a 15 dígitos) solo debe ser números'),
  email: z.string().email("El campo 'email' debe ser un correo electrónico válido."),
  telefono: z
    .string()
    .transform((val) => textoADigitos(val))
    .refine((num) => /^\d{7,15}$/.test(num), 'Teléfono inválido'),
  nombre: z.string().min(2, "El campo 'nombre' debe tener al menos 2 caracteres.").nonempty("El campo 'nombre' no puede estar vacío.")
});

const validar = (formSchema) => (req, res, next) => {
  
  const resultado = formSchema.safeParse(req.body);
  if (!resultado.success) {
    console.error("Errores de validación:", resultado.error.flatten().fieldErrors);
    return res.status(400).json({ errores: resultado.error.flatten().fieldErrors });
  }
  req.body = resultado.data; // Datos limpios y sanitizados
  next();
};

app.post("/submit-form", validar(formSchema), async (req, res) => {
  const { materia, profesor, fecha, password, email, telefono, nombre } = req.body;

  // Aquí puedes procesar los datos recibidos y guardarlos en una base de datos o realizar otras acciones necesarias.
  console.log("Datos recibidos:", { materia, profesor, fecha, password, email, telefono, nombre });





  return res.json({
    ok: true,
    redirectUrl: '/gracias.html' // Opcional: puedes mandar la ruta desde el backend
  });
});

app.get("/gracias", (req, res) => {
  res.sendFile(path.join(__dirname, "public/gracias.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});