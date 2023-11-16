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

//Ruta para Obtener un formulario por su ID en el body
// app.get("/api/getForm", async (req, res) => {
// 	const { id } = req.body

// 	try {
// 		const formsRef = firestore.collection("formularios")
// 		const snapshot = await formsRef.doc(id).get()
// 		const form = snapshot.data()

// 		res.status(200).json(form)
// 	} catch (error) {
// 		console.error('Error getting form:', error);
// 		res.status(500).json({ error: 'Internal Server Error' });
// 	}
// })

app.get("/api/getForm", async (req, res) => {
	const { id } = req.query; // Use req.query to get the id from the URL parameters

	try {
			const formsRef = firestore.collection("formularios");
			const snapshot = await formsRef.doc(id).get();
			const form = snapshot.data();
			res.status(200).json(form);
	} catch (error) {
			console.error('Error getting form:', error);
			res.status(500).json({ error: 'Internal Server Error' });
	}
});


app.post("/api/uploadAnswer", async (req, res) => {

	const { respuestaFormulario } = req.body
	console.log(respuestaFormulario)
	try {
		const formsRef = firestore.collection("repuestas")

		respuestaFormulario.fecha_creacion = new Date().toISOString()

    const result = await formsRef.add(respuestaFormulario);

    console.log(`Form uploaded with ID: ${result.id}`);
    res.status(200).json({ message: 'Form uploaded successfully' });
	} catch (error) {
    console.error('Error uploading form:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


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



//Rutarpara guardar la respuesta de un formulario con la referencia del formulario
// app.post("/api/uploadAnswer", async (req, res) => {

// 	const { id_formulario, campos_formulario} = req.body

// 	try {
// 		const formsRef = firestore.collection("respuestas")

// 		const result = await formsRef.add({
// 			id_formulario: id_formulario,
// 			campos_formulario: campos_formulario,
// 			fecha_creacion: new Date().toISOString()
// 		});

// 		console.log(`Answer uploaded with ID: ${result.id}`);
// 		res.status(200).json({ message: 'Answer uploaded successfully' });
// 	} catch (error) {
// 		console.error('Error uploading answer:', error);
// 		res.status(500).json({ error: 'Internal Server Error' });
// 	}

// })


//Ruta para obtener todas las respuestas de un formulario por su ID
app.get("/api/getAnswers", async (req, res) => {
	const { id } = req.query

	try {
		const formsRef = firestore.collection("repuestas")
		const snapshot = await formsRef.where("id_formulario", "==", id).get()
		console.log(snapshot)

		const answers = []

		snapshot.forEach((doc) => {
			answers.push({ id: doc.id, ...doc.data() })

		})

		res.status(200).json(answers)
	} catch (error) {
		console.error('Error getting answers:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
})







//Iniciamos la aplicacion en el puerto 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

