<template>
  <div class="manage">
    <ul class="manage__customer-list">
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
  </div>
</template>

<script>
export default {
  name: "manage",
  computed: {
    customers() {
      return this.$store.getters["customer/customers"];
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
}
</style>