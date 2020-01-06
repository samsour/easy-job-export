<template>
    <nav class="navigation-bar">
        <a v-if="!$route.path.includes('home')">
            <img @click="$router.go(-1)" class="navigation-bar__arrow" src="@/assets/icons/arrow.svg">
        </a>
    </nav>
</template>

<script>
export default {
    name: "navigation-bar",
}
</script>

<style lang="scss">
.navigation-bar {
    padding: 30px;

    &__arrow {
        width: 40px;
        transform: rotate(180deg);
    }
}
</style>