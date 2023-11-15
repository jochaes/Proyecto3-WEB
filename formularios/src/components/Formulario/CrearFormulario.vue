import { default } from '../../App.vue';
<template>
	<div class="contenedor_formulario">
		<form id="miFormulario">
			<label for="nombreFormulario">Nombre del Formulario:</label>
			<input type="text" id="nombreFormulario" placeholder="Nombre del formulario" />

			<button type="button" @click="agregarCampo()">Agregar Campo</button>
			<button type="button" @click="guardarFormulario()">Guardar Formulario</button>
			<button type="button" @click="verFormularios()">Ver Formularios Guardados</button>
			<br /><br />
			<div id="camposFormulario"></div>
		</form>

		<select id="formulariosGuardados" @change="cargarFormularioSeleccionado()" style="display: none">
			<option value="-1">Seleccione un formulario</option>
		</select>

		<div id="informacionGenerada" style="display: none"></div>
	</div>
</template>

<script>
export default {
	name: "CrearFormulario",
	data() {
		return {
			formularios: []
		}
	},
	mounted() {
		// Make an HTTP request to fetch forms from the API
		this.fetchFormularios()
	},
	methods: {
		async fetchFormularios() {
			try {
				const response = await this.$axios.get("/api/getForms") // Replace with your API endpoint
				console.log(response.data)

				this.formularios = response.data
				this.actualizarListaFormularios()
			} catch (error) {
				console.error("Error fetching forms:", error)
			}
		},
		mostrarOpcionesOCantidad(tipoCampo, contenedor) {
			// Limpiar el contenedor antes de agregar nuevos elementos
			while (contenedor.childNodes.length > 2) {
				contenedor.removeChild(contenedor.lastChild)
			}

			if (tipoCampo === "combobox") {
				var sugerenciaLabel = document.createElement("label")
				sugerenciaLabel.setAttribute("for", "sugerenciaCombobox")
				sugerenciaLabel.innerText = "Sugerencia (Chars separados por coma): "

				var sugerenciaInput = document.createElement("input")
				sugerenciaInput.setAttribute("type", "text")
				sugerenciaInput.setAttribute("id", "sugerenciaCombobox")
				sugerenciaInput.setAttribute("placeholder", "M,C,F")

				contenedor.appendChild(sugerenciaLabel)
				contenedor.appendChild(sugerenciaInput)
			} else if (tipoCampo === "matriz") {
				// Agregar elementos para la opción de matriz
				var columnasMatrizLabel = document.createElement("label")
				columnasMatrizLabel.setAttribute("for", "columnasMatriz")
				columnasMatrizLabel.innerText = "Columnas adicionales de la Matriz (separadas por coma): "

				var columnasMatrizInput = document.createElement("input")
				columnasMatrizInput.setAttribute("type", "text")
				columnasMatrizInput.setAttribute("id", "columnasMatriz")
				columnasMatrizInput.setAttribute("placeholder", "Escriba las columnas adicionales")

				contenedor.appendChild(columnasMatrizLabel)
				contenedor.appendChild(columnasMatrizInput)
			}
		},

		agregarCampo() {
			var formulario = document.getElementById("camposFormulario")

			var nuevoCampo = document.createElement("div")
			var tipoCampo = document.createElement("select")
			tipoCampo.innerHTML = `
                <option value="string">Texto</option>
                <option value="entero">Entero</option>
                <option value="combobox">Combobox</option>
                <option value="matriz">Matriz</option>
            `
			var nombreCampo = document.createElement("input")
			nombreCampo.setAttribute("type", "text")
			if (tipoCampo.value === "combobox") {
				nombreCampo.setAttribute("placeholder", "Chars separados por coma")
			} else {
				nombreCampo.setAttribute("placeholder", "Nombre del Campo")
			}
			nuevoCampo.appendChild(nombreCampo)
			nuevoCampo.appendChild(tipoCampo)

			// Agregar evento para mostrar opciones o cantidad en base al tipo de campo seleccionado
			tipoCampo.addEventListener("change", () => {
				this.mostrarOpcionesOCantidad(tipoCampo.value, nuevoCampo)
			})

			formulario.appendChild(nuevoCampo)
		},

		async guardarFormulario() {
			var nombreFormulario = document.getElementById("nombreFormulario").value
			if (!nombreFormulario.trim()) {
				alert("Por favor, ingrese un nombre para el formulario.")
				return
			}

			var camposNuevos = document.querySelectorAll("#camposFormulario div")

			var camposFormulario = []

			var self = this // Almacenar una referencia a 'this'

			camposNuevos.forEach(function (campoNuevo) {
				var nombreCampo = campoNuevo.querySelector("input").value
				if (!nombreCampo.trim()) {
					alert("Por favor, ingrese un nombre para todos los campos.")
					return
				}

				var tipoCampo = campoNuevo.querySelector("select").value
				var datosAdicionales = self.obtenerDatosAdicionales(tipoCampo, campoNuevo)

				camposFormulario.push({ nombre_campo: nombreCampo, tipo_campo: tipoCampo, ...datosAdicionales })
			})

			try {
				this.$axios
					.post("/api/uploadForm", {
						nombre_formulario: nombreFormulario,
						campos_formulario: camposFormulario
					})
					.then(function (response) {
						console.log(response)

						

						this.limpiarFormulario()
					})
					.catch(function (error) {
						return Promise.reject(error)
					})
			} catch (error) {
				console.error("Error saving form:", error)
			}
			//Send the form to the API

			// this.formularios.push({ nombre_formulario: nombreFormulario, campos_formulario: camposFormulario })

			// Limpiar el formulario actual

			// Actualizar la lista de formularios guardados
			// this.actualizarListaFormularios()
		},

		verFormularios() {
			var selectFormularios = document.getElementById("formulariosGuardados")
			var informacionGenerada = document.getElementById("informacionGenerada")

			// Mostrar u ocultar el combo box y la información generada según sea necesario
			selectFormularios.style.display = selectFormularios.style.display === "none" ? "inline-block" : "none"
			informacionGenerada.style.display = "none"
		},

		cargarFormularioSeleccionado() {
			var selectFormularios = document.getElementById("formulariosGuardados")
			var indexSeleccionado = selectFormularios.value

			if (indexSeleccionado !== "-1") {
				var formularioSeleccionado = this.formularios[indexSeleccionado]
				this.mostrarInformacionGenerada(formularioSeleccionado)
			}
		},

		actualizarListaFormularios() {
			var selectFormularios = document.getElementById("formulariosGuardados")

			selectFormularios.innerHTML = "<option value='-1'>Seleccione un formulario</option>"

			this.formularios.forEach(function (formulario, index) {
				var option = document.createElement("option")
				option.value = index
				option.text = formulario.nombre_formulario
				selectFormularios.appendChild(option)
			})
		},
		limpiarFormulario() {
			document.getElementById("nombreFormulario").value = ""
			document.getElementById("camposFormulario").innerHTML = ""
		},

		obtenerDatosAdicionales(tipoCampo, contenedor) {
			switch (tipoCampo) {
				case "combobox":
					var sugerenciaCombobox = contenedor.querySelector("#sugerenciaCombobox").value
					return { sugerencia: sugerenciaCombobox.split(",") }
				case "matriz":
					var columnasMatriz = contenedor.querySelector("#columnasMatriz").value.split(",")
					return { columnas: columnasMatriz, columnas_usuarios: [] }
				default:
					return {}
			}
		},

		mostrarInformacionGenerada(formulario) {
			var informacionGenerada = document.getElementById("informacionGenerada")
			var selectFormularios = document.getElementById("formulariosGuardados")

			// Ocultar el combo box y mostrar la información generada
			selectFormularios.style.display = "none"
			informacionGenerada.style.display = "block"

			informacionGenerada.innerHTML = `<h2>Formulario Seleccionado: ${formulario.nombre_formulario}</h2>`
			informacionGenerada.innerHTML += `<pre>${JSON.stringify(formulario, null, 2)}</pre>`
		}
	}
}
</script>

<style scoped>
/* Add your component-specific styles here */
.contenedor_formulario {
	font-family: "Arial", sans-serif;
	background-color: #f0f0f0;
	margin: 0;
	padding: 0;
}

form {
	max-width: 600px;
	margin: 20px auto;
	padding: 20px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
	display: block;
	margin-bottom: 10px;
	font-weight: bold;
}

input[type="text"] {
	width: 100%;
	padding: 8px;
	margin-bottom: 15px;
	box-sizing: border-box;
	border: 1px solid #ccc;
	border-radius: 4px;
}

select {
	width: 100%;
	padding: 8px;
	margin-bottom: 15px;
	box-sizing: border-box;
	border: 1px solid #ccc;
	border-radius: 4px;
}

button {
	background-color: #4caf50;
	color: #fff;
	padding: 10px 15px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	margin-right: 10px;
}

button:hover {
	background-color: #45a049;
}

#camposFormulario {
	margin-bottom: 20px;
}

#informacionGenerada {
	max-width: 600px;
	margin: 20px auto;
	padding: 20px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	display: none;
}

pre {
	white-space: pre-wrap;
}
</style>
