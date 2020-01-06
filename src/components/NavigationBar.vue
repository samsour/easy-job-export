<template>
    <nav class="navigation-bar">
        <button v-if="!$route.path.includes('home')" class="navigation-bar__back-button">
            <img @click="$router.go(-1)" class="navigation-bar__arrow" src="@/assets/icons/arrow.svg">
        </button>

        <h1 class="navigation-bar__headline">{{ $route.name }}</h1>
    </nav>
</template>

<script>
export default {
    name: "navigation-bar",
}
</script>

<style lang="scss">
.navigation-bar {
    padding: 30px 30px 30px 10px;
    display: flex;
    align-items: center;

    &__back-button {
        padding: 20px;
        margin-right: 20px;
        cursor: pointer;
        border: 0;
    }

    &__arrow {
        width: 20px;
        transform: rotate(180deg);
    }
}
</style>