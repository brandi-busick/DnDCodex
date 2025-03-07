<script setup>
import FilterPanel from './FilterPanel.vue';
</script>
<template>
    <div class="m-3 flex flex-col items-center">
        <div class="max-w-5xl">
            <FilterPanel>
                <div class="grid w-full grid-cols-5 gap-4">
                    <slot name="filters"></slot>
                </div>
                <slot name="disclosure"></slot>
            </FilterPanel>
            <table class="w-screen border-0 max-w-5xl mt-8">
                <slot name="table"></slot>
            </table>
            <div class="flex items-center justify-center gap-2 m-2">
                <slot name="pagination"></slot>
            </div>
        </div>
    </div>
</template>

<style>
svg {
    display: flex;
    align-self: center;
    width: 32px;
    height: 32px;
    color: var(--color-text);
}
</style>