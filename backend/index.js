//Librerias necesarias para crear el servidor
const express = require("express")
const bodyParser = require("body-parser")
const admin = require("firebase-admin")
const cors = require("cors")
const morgan = require("morgan")


// Para crear un servidor con Express, debemos crear una instancia de la clase express().
const app = express()

// Configuracin con Firebase
const serviceAccount = require("./firebase/formularios-6d195-firebase-adminsdk-601o8-fb0146a834.json")

// Inicializamos admin con la configuracin de Firebase
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
})

// Inicializamos Firestore
const firestore = admin.firestore();

// Configuracin de CORS
const allowedOrigins = ["http://192.168.100.2:3006", "http://localhost:3006", "https://formularios-6d195.web.app", "https://formularios-6d195.firebaseapp.com"] // Add the allowed origins

// Configuramos CORS con las opciones necesarias
const corsOptions = {
	origin: allowedOrigins,
	methods: ["GET", "POST", "PUT", "DELETE"],
	optionsSuccessStatus: 200
}

// Middleware para imprimir en consola las peticiones que llegan al servidor
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

//Middleware para imprimir en consola las peticiones que llegan al servidor
app.use(requestLogger)

app.use(morgan("dev"))

// Middleware para configurar CORS
app.use(cors(corsOptions))

// Middleware para configurar el body parser
app.use(bodyParser.json())


// Ruta inicial
app.get("/", (req, res) => {
	res.send("Hello World!")
})


// Ruta para obtener todos los formularios
app.get("/api/getForms", async (req, res) => {
	try {
		const formsRef = firestore.collection("formularios")
		const snapshot = await formsRef.get()
		const forms = []

		snapshot.forEach((doc) => {
			forms.push({ id: doc.id, ...doc.data() })
		})

		res.status(200).json(forms)
	} catch (error) {
		console.error('Error getting forms:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
})

// Ruta para obtener un formulario por su ID
app.post("/api/uploadForm", async (req, res) => {

	const { nombre_formulario, campos_formulario } = req.body

	try {
		const formsRef = firestore.collection("formularios")

    const result = await formsRef.add({
      nombre_formulario: nombre_formulario,
			campos_formulario: campos_formulario,
			fecha_creacion: new Date().toISOString()
    });

    console.log(`Form uploaded with ID: ${result.id}`);
    res.status(200).json({ message: 'Form uploaded successfully' });


	} catch (error) {
    console.error('Error uploading form:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})



//Iniciamos la aplicacion en el puerto 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

