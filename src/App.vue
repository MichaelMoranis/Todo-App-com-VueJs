<script lang="ts" setup>
import { computed, ref } from 'vue';
import TaskForm from "./components/TaskForm.vue"
import { Task, TaskFilter } from './types';
import TaskList from './components/TaskList.vue';
import FitlerButton from './components/FitlerButton.vue';

const message = ref("Aplicativo de Tarefas")
const tasks = ref<Task[]>([])
const filter = ref<TaskFilter>("Todas");

const totalDone = computed(() => tasks.value.reduce((total, task) => task.done ? total + 1 : total, 0))

const filteredTasks = computed(() => {
  switch (filter.value) {
    case "Todas":
      return tasks.value;
    case "Falta":
      return tasks.value.filter((tasks) => !tasks.done)
    case "Concluidas":
      return tasks.value.filter((tasks) => tasks.done)
  }
  return tasks.value
})

function addTask(task: string) {
  tasks.value.push({
    id: crypto.randomUUID(),
    title: task,
    done: false
  })
}

function toggleDone(id: string) {
  const task = tasks.value.find((task) => task.id === id)
  if (task) {
    task.done = !task.done
  }
}

function removeTask(id: string) {
  const index = tasks.value.findIndex((task) => task.id === id)
  if (index !== -1) {
    tasks.value.splice(index, 1);
  }
}

function setFilter(value: TaskFilter) {
  filter.value = value
}

</script>

<template>
  <main>
    <h1>{{ message }}</h1>
    <TaskForm @addTask="addTask" />
    <h3 v-if="!tasks.length">Adicione uma tarefa para começar.</h3>
    <h3 v-else> {{ totalDone }} / {{ tasks.length }} tarefas concluídas</h3>
    <div v-if="tasks.length" class="button-container">
      <FitlerButton :currentFilter="filter" filter="Todas" @setFilters="setFilter" />
      <FitlerButton :currentFilter="filter" filter="Falta" @setFilters="setFilter" />
      <FitlerButton :currentFilter="filter" filter="Concluidas" @setFilters="setFilter" />
    </div>
    <TaskList :tasks="filteredTasks" @toggle-done="toggleDone" @removeTask="removeTask" />
  </main>
</template>

<style scoped>
main {
  max-width: 800px;
  margin: 1rem auto;
}

.button-container {
  display: flex;
  justify-content: end;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  main {
    padding: 0.5rem;
    max-width: 95%;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
@media (max-width: 480px) {
  h1 {
    font-size: 1.3rem;
  }
  
  h3 {
    font-size: 0.9rem;
  }
  
  .button-container {
    align-items: center;
    gap: 0.3rem;
  }
}

</style>
