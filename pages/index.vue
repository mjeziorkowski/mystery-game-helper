<template>
  <section><GameCreator @submit="startGame()" /></section>
</template>

<script lang="ts" setup>
import { useGameDataStore } from "~~/stores/gameData";

const gameDataStore = useGameDataStore();
const router = useRouter();

function startGame() {
  if (validateFirstInitStep(gameDataStore.players, gameDataStore.elements)) {
    router.push("/game");
  } else {
    //TODO: show error message
  }
}
</script>
