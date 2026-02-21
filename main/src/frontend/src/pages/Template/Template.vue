<template>
    <div class="page template">
        <div class="top-bar flex-row">
            <div class="top-bar-left grow">
                <div class="page-title">Interactive Template Builder</div>
            </div>
            <div class="top-bar-right flex-row">
                <!-- TODO: create button component -->
                <div class="button style1">
                    <div class="button-icon"></div>
                    <div class="button-text">Undo</div>
                </div>

                <div class="button style1">
                    <div class="button-icon"></div>
                    <div class="button-text">Redo</div>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="left-bar">
                <div class="elements-container">
                    <div class="sub-title">ELEMENTS</div>
                    <template v-for="el in [
                        {
                            'letter': 'H',
                            'name': 'Heading'
                        },
                        {
                            'letter': 'T',
                            'name': 'Text'
                        },
                        {
                            'letter': '□',
                            'name': 'Button'
                        },
                        {
                            'letter': '▣',
                            'name': 'Image'
                        },
                        {
                            'letter': '—',
                            'name': 'Divider'
                        }
                    ]">
                        <div class="button style2">
                            <div class="button-icon">{{ el.letter }}</div>
                            <div class="button-text">{{ el.name }}</div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="template-canvas-container">
                <TemplateCanvas />
            </div>
            <div class="right-properties">

            </div>
        </div>
        <div class="bottom-bar flex-row">
            <div class="button style1">
                <div class="button-icon"></div>
                <div class="button-text">New</div>
            </div>
            <div class="button style1">
                <div class="button-icon"></div>
                <div class="button-text">Save</div>
            </div>
            <div class="button style1">
                <div class="button-icon"></div>
                <div class="button-text">Export JSON</div>
            </div>
        </div>

        <ComponentOne />
        <ComponentTwo />
    </div>
</template>

<script setup lang="ts">
import ComponentOne from '@/components/ComponentOne.vue'
import ComponentTwo from '@/components/ComponentTwo.vue'
import TemplateCanvas from '@/components/TemplateCanvas/TemplateCanvas.vue'
</script>
<style src="./Template.scss" lang="scss"></style>