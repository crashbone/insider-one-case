<template>
    <div class="button insider-button-style1" v-bind="$attrs">
        <div v-if="iconText" class="button-icon">{{ iconText }}</div>
        <div v-if="$slots.default || text" class="button-text">{{ text }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    type?: 'button' | 'submit' | 'reset'
    iconText?: string
    text?: string
}>()
</script>

<style src="./InsiderButtonStyle1.scss" lang="scss" scoped></style>
