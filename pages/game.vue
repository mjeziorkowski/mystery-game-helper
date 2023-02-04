<template>
  <InitialGameSetup v-if="!gameIsReady" @setup-finished="gameIsReady = true" />
  <GameView v-else />
</template>

<script setup lang="ts">
import { useGameDataStore } from "~~/stores/gameData";
import { useRouter } from "vue-router";

const router = useRouter();
const gameDataStore = useGameDataStore();
if (!validateFirstInitStep(gameDataStore.players, gameDataStore.elements)) {
  // TODO: show error message
  router.push("/");
}
const gameIsReady = ref(false);
gameDataStore.startNewTurn();
</script>
