<script lang="ts" setup>
import { Task } from '@/types';

const props = defineProps<{
    tasks: Task[]
}>();

const emits = defineEmits<{
    toggleDone: [id: string]
    removeTask: [id: string]
}>()

</script>

<template>
    <TransitionGroup name="task-list" tag="div">
        <article v-for="task in tasks" class="task" :key="task.id">
            <label>
                <input @input="emits('toggleDone', task.id)" :checked="task.done" type="checkbox" name="task" id="task">
                <span :class="{ done: task.done }">{{ task.title }}</span>
            </label>
            <button @click="emits('removeTask', task.id)" class="outline">Remove</button>
        </article>
    </TransitionGroup>
</template>

<style scoped>
article {
    display: flex;
    margin-top: 1rem;
}

.done {
    text-decoration: line-through;
}

.task {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.task-list-enter-active,
.task-list-leave-active {
    transition: all 0.5s ease;
}

.task-list-enter-from,
.task-list-leave-to {
    opacity: 0;
    transform: translateX(300px);
}
</style>