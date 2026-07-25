<template>
    <SubNav />
</template>

<script lang="ts" setup>
    definePageMeta({
        middleware: ['auth-middleware']
    })
</script>