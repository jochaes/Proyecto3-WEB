const express = require("express")
const bodyParser = require("body-parser")
const admin = require("firebase-admin")
const cors = require("cors")
const morgan = require("morgan")

const app = express()
const port = 3000 // Choose any port you prefer

// Firebase configuration - replace with your Firebase credentials
const serviceAccount = require("./firebase/formularios-6d195-firebase-adminsdk-601o8-fb0146a834.json")

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
})

const firestore = admin.firestore();

const allowedOrigins = ["http://192.168.100.2:3006", "http://localhost:3006"] // Add the allowed origins

const corsOptions = {
	origin: '*',
	methods: ["GET", "POST", "PUT", "DELETE"],
	optionsSuccessStatus: 200
}
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)
app.use(morgan("dev"))
app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.get("/getForms", async (req, res) => {
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



app.post("/uploadForm", async (req, res) => {
	// console.log("*******")
	// console.log(req.body)
	// console.log("*******")

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

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
