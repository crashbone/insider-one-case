<template>
    <div class="button insider-button-style2" v-bind="$attrs">
        <div v-if="iconText" class="button_icon">{{ iconText }}</div>
        <div v-if="$slots.default || text" class="button_text">{{ text }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    type?: 'button' | 'submit' | 'reset'
    iconText?: string
    text?: string
}>()
</script>

<style src="./InsiderButtonStyle2.scss" lang="scss" scoped></style>
