<template>
  <div class="customer">
    <div class="customer__head">
      <label class="customer__image-container">
        <img v-if="customer.image" :src="customer.image" class="customer__image">
        <div v-else class="customer__no-image"></div>
        <input type="file" @change="changeImage" name="customerImage" accept="image/*" class="customer__image-upload">
      </label>
      <h2 class="customer__name">{{ customer.name }}</h2>
    </div>

    <ul v-if="projects.length > 0" class="customer__task-list">
      <li v-for="project in projects" :key="project.id" class="customer-task-item">
        <span>{{ project.name }} </span><span>({{ project.exportValue }})</span>
      </li>
    </ul>
    <span v-else>Keine Projekte</span>

    <button @click="newProject = {}">Neues Projekt</button>
    <section v-if="newProject !== null" class="customer__new-project">
      <label>
        Name
        <input v-model="newProject.name" />
      </label>
      <label>
        Export Value:
        <input v-model="newProject.exportValue" />
      </label>
      <button @click="addNewProject">Projekt hinzufügen</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "manage",
  computed: {
    customer() {
      return this.$store.getters["customer/customerById"](this.$route.params.id);
    },
    projects() {
      return this.$store.getters["project/customerProjects"](this.customer.id);
    }
  },
  data() {
    return {
      newProject: null
    }
  },
  methods: {
    generateId() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },
    changeImage(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        this.$store.dispatch("customer/setImage", { id: this.customer.id, imageUrl: reader.result })
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    addNewProject() {
      this.$store.dispatch("project/addProject", {
        id: this.generateId(),
        customer: this.customer.id,
        exportValue: this.newProject.exportValue,
        name: this.newProject.name,
        tasks: []
      })
      this.newProject = null;
    }
  }
};
</script>

<style lang="scss">
.customer {
  &__head {
    display: flex;
  }
  &__image-container {
    width: 150px;
    height: 150px;
    margin-right: 20px;
    position: relative;
    cursor: pointer;
  
    &:hover {
      &::after {
        opacity: 1;
      }
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(27,27,27,0.5);
      opacity: 0;
      transition: opacity 0.2s ease;
    }
  }

  &__image, &__no-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__no-image {
    background: #bbbbbb;
  }

  &__image-upload {
    display: none;
  }
}
</style>