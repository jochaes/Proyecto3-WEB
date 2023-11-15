import { default } from '../Formulario/CrearFormulario.vue';
<template>
  <div id="respuestaFormularioContainer">

  </div>
	<div id="respuestaFormulario"></div>
</template>

<script>
export default {
	name: "RespuestaFormulario",
	data() {
		return {
			formulariosJSON: {
        "formularios" : [
				{
					id: "wKM0iXjxN3UupIH0ZhjE",
					nombre_formulario: "Información Personal",
					campos_formulario: [
						{
							nombre_campo: "Cedula",
							tipo_campo: "texto"
						},
						{
							nombre_campo: "Nombre",
							tipo_campo: "texto"
						},
						{
							opciones: ["M", "F"],
							nombre_campo: "Genero",
							tipo_campo: "comboBox"
						},
						{
							nombre_campo: "Telefono",
							tipo_campo: "numero"
						},
						{
							nombre_campo: "Horario",
							columnas_sugeridas: ["Limpieza?"],
							tipo_campo: "tabla",
							columnas: ["Hora", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado", "Domingo"]
						}
					]
				},
				{
					id: "otroId",
					nombre_formulario: "Otro Formulario",
					campos_formulario: [
						{
							nombre_campo: "Campo1",
							tipo_campo: "texto"
						},
						{
							nombre_campo: "Campo2",
							tipo_campo: "numero"
						},
						{
							nombre_campo: "Campo3",
							tipo_campo: "comboBox",
							opciones: ["Opción1", "Opción2"]
						}
					]
				}
			]},
      datosGuardados : [],
      container: document.getElementById("respuestaFormulario"),
      formularioSelect : document.createElement("select"),
      camposContainer : document.createElement("div"),
      respuestasContainer : document.createElement("div")

		}
	},

	mounted() {
		
		this.initRespuesta()
	},

	methods: {
		initRespuesta() {
			this.container = document.getElementById("respuestaFormulario")
			this.respuestasContainer = document.createElement("div")
			// const datosGuardados = []

			// Crear lista de formularios para que el usuario elija
			this.formularioSelect = document.createElement("select")

			this.formulariosJSON.formularios.forEach(formulario => {
				const option = document.createElement("option")
				option.value = formulario.id
				option.text = formulario.nombre_formulario
				this.formularioSelect.appendChild(option)
			})

			this.container.appendChild(this.formularioSelect)

			// Crear contenedor para mostrar campos del formulario seleccionado
			this.camposContainer = document.createElement("div")
			this.container.appendChild(this.camposContainer)

			// Agregar evento al cambio en la selección del formulario
			this.formularioSelect.addEventListener("change", this.mostrarCamposFormulario)

			// Agregar botón para ver formularios llenos
			const verFormulariosLlenosButton = document.createElement("button")
			verFormulariosLlenosButton.textContent = "Ver Formularios Llenos"
			verFormulariosLlenosButton.addEventListener("click", this.verFormulariosLlenos)
			this.container.appendChild(verFormulariosLlenosButton)

			// Agregar contenedor para mostrar formularios llenos
			this.container.appendChild(this.respuestasContainer)
		},
    mostrarCamposFormulario() {
        const formularioIdSeleccionado = this.formularioSelect.value;
        const formularioSeleccionado = this.formulariosJSON.formularios.find(formulario => formulario.id === formularioIdSeleccionado);

        // Limpiar campos anteriores
        this.camposContainer.innerHTML = '';

        // Mostrar campos del formulario seleccionado
        formularioSeleccionado.campos_formulario.forEach(campo => {
            const labelElement = document.createElement('label');
            labelElement.textContent = campo.nombre_campo;

            const inputElement = document.createElement('input');
            inputElement.type = campo.tipo_campo;
            inputElement.name = campo.nombre_campo;
            inputElement.placeholder = campo.nombre_campo;

            // Puedes manejar campos específicos aquí, por ejemplo, agregar opciones a un select
            if (campo.tipo_campo === 'comboBox') {
                const selectElement = document.createElement('select');
                campo.opciones.forEach(opcion => {
                    const optionElement = document.createElement('option');
                    optionElement.value = opcion;
                    optionElement.text = opcion;
                    selectElement.appendChild(optionElement);
                });
                this.camposContainer.appendChild(selectElement);
            } else {
                this.camposContainer.appendChild(inputElement);
            }

            this.camposContainer.appendChild(document.createElement('br'));
        });

        // Agregar botón para guardar respuestas
        const guardarButton = document.createElement('button');
        guardarButton.textContent = 'Guardar Respuestas';
        guardarButton.addEventListener('click', this.guardarRespuestas);
        this.camposContainer.appendChild(guardarButton);
    },
    guardarRespuestas() {
        const formularioId = this.formularioSelect.value;
        const respuestas = {};

        // Obtener respuestas del formulario
        this.camposContainer.querySelectorAll('input, select').forEach(input => {
            respuestas[input.name] = input.value;
        });

        // Almacenar respuestas
        this.guardarDatos(formularioId, respuestas);

        // Puedes hacer lo que desees con las respuestas, por ejemplo, almacenarlas en una base de datos
        console.log('Respuestas guardadas:', respuestas);
    },
    guardarDatos(formularioId, respuestas) {
        this.datosGuardados.push({ formularioId, respuestas });
    },
    verFormulariosLlenos() {
        this.respuestasContainer.innerHTML = '<h2>Formularios Llenos</h2>';

        // Mostrar formularios y respuestas almacenadas
        this.datosGuardados.forEach((data, index) => {
            const respuestaElement = document.createElement('p');
            respuestaElement.key  = index;
            respuestaElement.textContent = `Formulario ${data.formularioId}, Respuestas: ${JSON.stringify(data.respuestas)}`;
            this.respuestasContainer.appendChild(respuestaElement);
        });

        // Limpiar campos del formulario seleccionado
        this.camposContainer.innerHTML = '';
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

input, select, button {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
}

button {
    background-color: #4CAF50;
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