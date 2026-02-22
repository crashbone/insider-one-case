<template>
    <div class="canvas-element-content text" :style="style">
        {{ element.content }}
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type TextBasedElement } from '@/models/TextBasedElement'

const props = defineProps<{
    element: TextBasedElement
}>()

const style = computed(() => ({
    fontSize: `${props.element.fontSize}px`,
    color: props.element.color,
    textAlign: props.element.alignment,
}))
</script>