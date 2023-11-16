<!-- src/components/FormsList.vue -->

<template>
	<div>
		<h2>Forms List</h2>

		<ul class="lista-formularios">
			<li class="item-formulario" v-for="form in forms" :key="form.id">
				<div class="item-formulario-container">
					
          <div class="item-formulario-information">
						<strong>{{ form.nombre_formulario }}</strong>
						<p>
							<i>Fecha de creación: {{ form.fecha_creacion }}</i>
						</p>
					</div>

					<div class="item-formulario-buttons">
						<button @click="showDialog(form)">
							Ver Formulario 
						</button>

						<button>
							<router-link :to="{ path: '/respuestas/', query: { id: form.id } }"> Ver Respuestas  </router-link>
						</button>

						<button @click="showShareLinkDialog(form.id)" >
							<!-- <router-link to="/forms-list"> Compartir </router-link> -->
							Compartir
						</button>
					</div>
				</div>
			</li>
		</ul>

		<dialog>
			

      <div id="formulario_Seleccionado">

      </div>

      <button autofocus @click="closeDialog()">Close</button>

		</dialog>

	</div>
</template>

<script>
export default {
	name: "FormsList",
	data() {
		return {
			forms: [],
      currentForm: null
		}
	},
	mounted() {
		// Make an HTTP request to fetch forms from the API
		this.fetchForms()
	},
	methods: {
		async fetchForms() {
			try {
				const response = await this.$axios.get("/api/getForms") // Replace with your API endpoint
				this.forms = response.data
			} catch (error) {
				console.error("Error fetching forms:", error)
			}
		},
		showShareLinkDialog(id) {
			
			alert(`Compartir este link con el usuario: ${document.location.origin}/#/formulario-respuesta/?id=${id}`)

		},

		showDialog( form ) {
      this.currentForm = form


      const div_dialog_info = this.$el.querySelector("#formulario_Seleccionado")

      div_dialog_info.innerHTML = `<h2>Formulario Seleccionado: ${this.currentForm.nombre_formulario}</h2>`
			div_dialog_info.innerHTML += `<pre>${JSON.stringify(this.currentForm, null, 2)}</pre>`


			const dialog = this.$el.querySelector("dialog")
      dialog.showModal()
		},
    closeDialog() {
      const dialog = this.$el.querySelector("dialog")
      dialog.close()
    }


	}
}
</script>

<style scoped>
.lista-formularios {
	display: flex;
	flex-direction: column;
	align-items: center;

	list-style: none;
	padding: 0;
}


/*********************** Componente de Formulario ************************/

.item-formulario {
	padding: 10px;
	border: 1px solid #ccc;
	margin-bottom: 10px;
	background-color: white;
	border-radius: 5px;
	width: 60%;
}

.item-formulario-container {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}

.item-formulario-information {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin-left: 5%;
}

.item-formulario-buttons {
	margin-right: 5%;
}

.item-formulario-buttons button {
	margin: 5px;
	padding: 10px;
	border: none;
	border-radius: 5px;
	background-color: #4caf50;
	color: white;
	cursor: pointer;
	text-decoration: none;
	height: 40px;
}

a:link,
a:visited,
a:active,
a:hover {
	color: white;
	text-decoration: none;
}

@media (max-width: 768px) {
  .item-formulario {
    width: 90%;
  }

  .item-formulario-container {
    flex-direction: column;
  }

  .item-formulario-buttons {
    margin-right: 0;
    flex-direction: column;
  }
  .item-formulario-buttons button {
    width: 100%;
  }
}


/*********************** DIALOG ************************/
dialog {
	/* max-width: 600px; */
	margin: auto;
	padding: 20px;
	background-color: #fff;
	border-radius: 8px;
  border-color: #ccc;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

}

dialog button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  width: 100%;
}

#formulario_Seleccionado pre{
  min-height: 50vh;
  overflow: scroll;
}

@media (max-width: 768px) {

  dialog {
    width: 80%;
    max-height: 80vh;
  }

}


</style>
