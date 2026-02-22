<template>
    <div class="canvas-element-content image" :style="`background-image: url('${ fakeUrl }')`"></div>
</template>

<script setup lang="ts">
import { type ImageElement } from '@/models/ImageElement'

defineProps<{
    element: ImageElement
}>()

const fakeUrl = 'https://media.istockphoto.com/id/1131230925/de/vektor/kontrollzeichen-rotes-kreuzsymbol-einfach-vektor.jpg?s=612x612&w=0&k=20&c=UXmgkeGFn5y4IRknTPhaD4LFnoX_IlpgLuLAri69kr4=';

</script>
