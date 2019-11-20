<template>
  <div class="manage">
    <ul v-if="customers.length > 0" class="manage__customer-list">
      <router-link tag="li" :to="`customer/${customer.id}`" v-for="customer in customers" :key="customer.id" class="manage__list-item">
        <figure class="manage__customer">
          <div class="manage__image-wrapper">
            <img v-if="customer.image" :src="customer.image" class="manage__customer-image">
            <div v-else class="manage__no-image"></div>
          </div>
          <figcaption class="manage__customer-name">{{ customer.name }}</figcaption>
        </figure>
      </router-link>
    </ul>
    <span v-else>Keine Kundendaten vorhanden</span>
    
    <button @click="newCustomer = {}">Neuer Kunde</button>
    <section v-if="newCustomer !== null" class="customer__new-project">
      <label class="manage__input manage__input--text">
        Name
        <input v-model="newCustomer.name" />
      </label>
      <label class="manage__input manage__input--image">
        <input type="file" @change="changeNewCustomerImage" name="customerImage" accept="image/*">
      </label>
      <button @click="addNewCustomer">Kunden hinzufügen</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "manage",
  computed: {
    customers() {
      return this.$store.getters["customer/customers"];
    }
  },
  data() {
    return {
      newCustomer: null
    }
  },
  methods: {
    generateId() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },
    changeNewCustomerImage(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        this.newCustomer.image = reader.result;
      }, false);

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    addNewCustomer() {
      this.$store.dispatch("customer/add",{
        id: this.generateId(),
        name: this.newCustomer.name,
        image: this.newCustomer.image
      })
      this.newCustomer = null;
    }
  }
};
</script>

<style lang="scss">
.manage {
  &__customer-list {
    list-style-type: none;
  }

  &__list-item {
    margin-bottom: 20px;

    &:hover {
      background: #f7f7f7;
      cursor: pointer;
    }
  }

  &__customer {
    display: flex;
    align-items: center;
  }

  &__image-wrapper {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }

  &__customer-image, &__no-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__no-image {
    background: #bbbbbb;
  }

  &__customer-name {
    font-weight: bold;
  }

  &__input {
    &--text {
      
    }

    &--image {

    }
  }
}
</style>