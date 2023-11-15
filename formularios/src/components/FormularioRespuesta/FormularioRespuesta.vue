import { default } from '../Formulario/CrearFormulario.vue';
<template>
	<div id="respuestaFormularioContainer">
		<div id="buscarFormulario_input">
			<label for="buscarFormulario">Ingrese el Id del Formulario</label>
			<input
				type="text"
				id="buscarFormulario"
				name="buscarFormulario"
				placeholder="Buscar Formulario"
				value="KLpu2UqKiV3lavgqR8gr" />
			<button @click="cargarFormulario">Cargar fomulario</button>
		</div>

		<div id="respuestaFormulario"></div>
	</div>
</template>

<script>
export default {
	name: "RespuestaFormulario",
	data() {
		return {
			formulariosJSON: {},
			datosGuardados: [],
			container: document.getElementById("respuestaFormulario"),
			formularioSelect: document.createElement("select"),
			camposContainer: document.createElement("div"),
			respuestasContainer: document.createElement("div")
		}
	},

	mounted() {
		this.initRespuesta()
	},

	methods: {
		cargarFormulario: async function () {
			const formularioId = document.getElementById("buscarFormulario").value

			console.log(formularioId)

			//Llamar al API que me devuelva el formulario con el id seleccionado
			try {
				//Enviar el formulario seleccionado al API, pero enviandole el id por el body
				const response = await this.$axios.get(`/api/getForm?id=${formularioId}`)
				console.log(response.data)

				this.formulariosJSON = response.data
				this.formulariosJSON.id_formulario = formularioId

				//Limpiar campos anteriores
				this.camposContainer.innerHTML = ""

				this.mostrarCamposFormulario()
			} catch (error) {
				console.error("Error fetching forms:", error)
			}
		},

		initRespuesta() {
			this.container = document.getElementById("respuestaFormulario")
			this.respuestasContainer = document.createElement("div")

			// const datosGuardados = []

			// // Crear lista de formularios para que el usuario elija
			// this.formularioSelect = document.createElement("select")

			// this.formulariosJSON.formularios.forEach(formulario => {
			// 	const option = document.createElement("option")
			// 	option.value = formulario.id
			// 	option.text = formulario.nombre_formulario
			// 	this.formularioSelect.appendChild(option)
			// })

			// this.container.appendChild(this.formularioSelect)

			// Crear contenedor para mostrar campos del formulario seleccionado
			this.camposContainer = document.createElement("div")
			this.container.appendChild(this.camposContainer)

			// Agregar evento al cambio en la selección del formulario
			// this.formularioSelect.addEventListener("change", this.mostrarCamposFormulario)

			// // Agregar botón para ver formularios llenos
			// const verFormulariosLlenosButton = document.createElement("button")
			// verFormulariosLlenosButton.textContent = "Ver Formularios Llenos"
			// verFormulariosLlenosButton.addEventListener("click", this.verFormulariosLlenos)
			// this.container.appendChild(verFormulariosLlenosButton)

			// Agregar contenedor para mostrar formularios llenos
			// this.container.appendChild(this.respuestasContainer)
		},

		mostrarCamposFormulario() {
			// const formularioIdSeleccionado = this.formularioSelect.value;
			const formularioSeleccionado = this.formulariosJSON

			// Limpiar campos anteriores
			this.camposContainer.innerHTML = ""

			// Mostrar campos del formulario seleccionado
			formularioSeleccionado.campos_formulario.unshift({
				nombre_campo: "Nombre Usuario",
				tipo_campo: "texto"
			})

			console.log(formularioSeleccionado)

			formularioSeleccionado.campos_formulario.forEach(campo => {
				console.log(campo)
				const labelElement = document.createElement("label")
				labelElement.textContent = campo.nombre_campo
				labelElement.for = campo.nombre_campo

				const inputElement = document.createElement("input")
				inputElement.id = campo.nombre_campo
				inputElement.type = campo.tipo_campo
				inputElement.name = campo.nombre_campo
				inputElement.placeholder = campo.nombre_campo

				// Puedes manejar campos específicos aquí, por ejemplo, agregar opciones a un select
				if (campo.tipo_campo === "combobox") {
					const selectElement = document.createElement("select")
					selectElement.name = campo.nombre_campo
					selectElement.id = campo.nombre_campo
					selectElement.placeholder = campo.nombre_campo
					campo.sugerencia.forEach(opcion => {
						const optionElement = document.createElement("option")
						optionElement.value = opcion
						optionElement.text = opcion

						selectElement.appendChild(optionElement)
					})
					this.camposContainer.appendChild(labelElement)
					this.camposContainer.appendChild(selectElement)
				} else {
					this.camposContainer.appendChild(labelElement)
					this.camposContainer.appendChild(inputElement)
				}
				this.camposContainer.appendChild(document.createElement("br"))
			})

			// Agregar botón para guardar respuestas
			const guardarButton = document.createElement("button")
			guardarButton.textContent = "Guardar Respuestas"
			guardarButton.addEventListener("click", this.guardarRespuestas)
			this.camposContainer.appendChild(guardarButton)
		},
		async guardarRespuestas() {
			const formularioId = this.formulariosJSON
			const respuestas = {}
			const listaRespuestas = {}
			respuestas["id_formulario"] = formularioId.id_formulario
			respuestas["nombre_formulario"] = formularioId.nombre_formulario

			// Obtener respuestas del formulario
			this.camposContainer.querySelectorAll("input, select").forEach(input => {
				if (input.name === "Nombre Usuario") {
					respuestas["nombre_usuario"] = input.value
					return
				}
				listaRespuestas[input.name] = input.value
			})

			respuestas["respuesta_formulario"] = listaRespuestas

			//Envia respuestas como post al api
			try {
				//Enviar el formulario seleccionado al API, pero enviandole el id por el body

				const response = await this.$axios.post("/api/uploadForm", {
					respuestaFormulario: respuestas
				})

				console.log(response.data)

				//Limpiar campos anteriores
				this.camposContainer.innerHTML = ""
			} catch (error) {
				console.error("Error fetching forms:", error)
			}

			// Puedes hacer lo que desees con las respuestas, por ejemplo, almacenarlas en una base de datos
			console.log("Respuestas guardadas:", respuestas)
		},

		verFormulariosLlenos() {
			this.respuestasContainer.innerHTML = "<h2>Formularios Llenos</h2>"

			// Mostrar formularios y respuestas almacenadas
			this.datosGuardados.forEach((data, index) => {
				const respuestaElement = document.createElement("p")
				respuestaElement.key = index
				respuestaElement.textContent = `Formulario ${data.formularioId}, Respuestas: ${JSON.stringify(data.respuestas)}`
				this.respuestasContainer.appendChild(respuestaElement)
			})

			// Limpiar campos del formulario seleccionado
			this.camposContainer.innerHTML = ""
		}
	}
}
</script>

<style scoped>
#respuestaFormularioContainer {
	font-family: Arial, sans-serif;
	margin: 20px;
}

#app {
	max-width: 600px;
	margin: 0 auto;
}

form {
	margin-bottom: 20px;
}

label {
	display: block;
	margin-bottom: 5px;
}

input,
select,
button {
	width: 100%;
	padding: 8px;
	margin-bottom: 10px;
	box-sizing: border-box;
}

button {
	background-color: #4caf50;
	color: white;
	border: none;
	padding: 10px 15px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	cursor: pointer;
}

button:hover {
	background-color: #45a049;
}

#respuestas {
	max-width: 600px;
	margin: 20px auto;
}

h2 {
	color: #333;
	border-bottom: 1px solid #ccc;
	padding-bottom: 10px;
}
</style>
