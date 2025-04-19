<script lang="ts" setup>
import { ref } from 'vue';

const newTask = ref("")
const error = ref("")

const emit = defineEmits<{
    addTask: [newTask: string]
}>()

function formSubmited() {
    if (newTask.value.trim()) {
        emit("addTask", newTask.value.trim())
        newTask.value = ""
    } else {
        error.value = "Task Cannot be empty!!"
    }
}
</script>


<template>
    <form @submit.prevent="formSubmited">
        <label for="tasks-app">
            Nova tarefa
            <input v-model="newTask" name="newTask" :aria-invalid="!!error || undefined">
            <small v-if="error" id="invalid-helper">
                {{ error }}
            </small>
        </label>
        <div class="button-container">
            <button>Adicionar</button>
        </div>
    </form>
</template>

<style scoped>
.button-container {
    display: flex;
    justify-content: end;
}
</style>