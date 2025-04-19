<script lang="ts" setup>
import { TaskFilter } from '@/types';

const props = defineProps<{
    filter: TaskFilter
    currentFilter: TaskFilter;
}>()

const emits = defineEmits<{
    setFilters: [filter: TaskFilter]
}>()
</script>

<template>
    <button class="secondary" :class="{
        contrast: props.currentFilter === props.filter
    }" @click="emits('setFilters', props.filter)">{{ props.filter }}
    </button>
</template>

<style scoped>
button {
    text-transform: capitalize;
}
</style>