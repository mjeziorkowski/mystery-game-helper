<template>
  <InitialOwnerSetup
    v-for="element in componentsToRender"
    :title="element.name"
    :elements="element.value"
  />
  <button @click="emit('setupFinished')">Setup finished</button>
</template>

<script setup lang="ts">
import { useGameDataStore } from "~~/stores/gameData";

const gameDataStore = useGameDataStore();

const componentsToRender = Object.entries(gameDataStore.elements).map(
  ([key, value]) => {
    return {
      name: key,
      value: value,
    };
  }
);

const emit = defineEmits(["setupFinished"]);
</script>
