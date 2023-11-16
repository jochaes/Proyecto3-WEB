<template>
	<div id="respuestasFormulario_body">
		<div id="respuestas-container"></div>
	</div>
</template>

<script>
export default {
	name: "RespuestasTodas",
	data() {
		return {
			formId: null,
			respuestasJSON: [],
			respuestasContainer: document.getElementById("respuestas-container")
		}
	},

	mounted() {
		this.formId = this.$route.query.id
		console.log(this.formId)
		this.initRespuesta()
	},

	methods: {
		initRespuesta() {
			this.respuestasContainer = document.getElementById("respuestas-container")
			this.cargarRespuestas()
		},

		cargarRespuestas: async function () {
			try {
				// Send the ID in the request body

				const response = await this.$axios.get(`/api/getAnswers?id=${this.formId}`)
				console.log(response.data)

				this.respuestasJSON = response.data // Assuming you want to store the answers in a variable

				this.mostrarRespuestas()

				// Do something with the answers if needed
			} catch (error) {
				console.error("Error getting answers:", error)
			}
		},

		mostrarRespuestas: function () {
			this.respuestasContainer.innerHTML = ""

			if (this.respuestasJSON.length === 0) {
				const noRespuestasElement = document.createElement("h2")
				noRespuestasElement.textContent = "No hay respuestas para este formulario"
				this.respuestasContainer.appendChild(noRespuestasElement)
				return
				
			}

			this.respuestasJSON.forEach(respuesta => {

				const formularioId = respuesta.nombre_formulario
				const respuestas = respuesta.respuesta_formulario

				const formularioElement = document.createElement("div")
				formularioElement.classList.add("formulario")

				// Mostrar el nombre del formulario

				const nombreFormularioElement = document.createElement("h2")
				nombreFormularioElement.textContent = `Nombre del Formulario: ${formularioId}`
				formularioElement.appendChild(nombreFormularioElement)

				//Muestra el nombre del usuario que lleno el form
				const nombreUsuarioElement = document.createElement("h3")
				nombreUsuarioElement.textContent = `Nombre del Usuario: ${respuesta.nombre_usuario}`
				formularioElement.appendChild(nombreUsuarioElement)

				//Fecha de Respuesta
				const fechaElement = document.createElement("h3")
				fechaElement.textContent = `Fecha de Respuesta: ${respuesta.fecha_creacion}`
				formularioElement.appendChild(fechaElement)


				// Mostrar cada pregunta con su respuesta
				const respuestasElement = document.createElement("ul")
				Object.entries(respuestas).forEach(([pregunta, respuesta]) => {
					const respuestaItem = document.createElement("li")
					respuestaItem.textContent = `${pregunta}: ${respuesta}`
					respuestasElement.appendChild(respuestaItem)
				})
				formularioElement.appendChild(respuestasElement)

				this.respuestasContainer.appendChild(formularioElement)
			})
		}
	}
}
</script>

<style >
#respuestasFormulario_body {
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	margin: 20px;
	background-color: #f0f0f0;
	text-align: center;
	color: #333;
}

#respuestas-container {
	max-width: 800px;
	margin: 0 auto;
}

.formulario {
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 10px;
	margin-bottom: 20px;
	padding: 20px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

h2 {
	color: #4caf50;
	font-size: 30px;
	margin-bottom: 15px;
}

ul {
	list-style-type: none;
	padding: 0;
}

li {
	margin-bottom: 15px;
	font-size: 18px;
}

select {
	padding: 15px;
	font-size: 18px;
	margin-bottom: 20px;
	border: 2px solid #3498db;
	border-radius: 8px;
	background-color: #ecf0f1;
	color: #333;
}

button {
	background-color: #3498db;
	color: white;
	padding: 15px 20px;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	font-size: 18px;
	transition: background-color 0.3s ease;
}

button:hover {
	background-color: #2980b9;
}
</style>
