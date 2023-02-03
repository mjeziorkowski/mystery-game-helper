<template>
  <InitialGameSetup @submit="" />
</template>

<script setup lang="ts">
import { useGameDataStore } from "~~/stores/gameData";
import { useRouter } from "vue-router";

const router = useRouter();

const gameDataStore = useGameDataStore();

// DEBUG: remove this piece of crap
if (
  gameDataStore.rooms.length > 0 &&
  gameDataStore.tools.length > 0 &&
  gameDataStore.suspects.length > 0 &&
  gameDataStore.players.length > 1
) {
  //do nothing
} else {
  router.push("/");
}
</script>
