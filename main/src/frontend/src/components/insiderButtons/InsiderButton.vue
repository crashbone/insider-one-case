<template>
    <InsiderButtonStyle1
        v-if="variant === 'style1'"
        :type="type"
        :iconText="iconText"
        :text="text"
        v-bind="$attrs"
    >
        <slot />
    </InsiderButtonStyle1>
    <InsiderButtonStyle2
        v-else-if="variant === 'style2'"
        :type="type"
        :iconText="iconText"
        :text="text"
        v-bind="$attrs"
    >
        <slot />
    </InsiderButtonStyle2>
</template>

<script setup lang="ts">
import InsiderButtonStyle1 from './InsiderButtonStyle1.vue'
import InsiderButtonStyle2 from './InsiderButtonStyle2.vue'

export type InsiderButtonVariant = 'style1' | 'style2'

defineProps<{
    variant?: InsiderButtonVariant
    type?: 'button' | 'submit' | 'reset'
    iconText?: string
    text?: string
}>()
</script>
<style src="./InsiderButton.scss" lang="scss" scoped></style>