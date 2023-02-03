<template>
  <InitialGameSetupPlayer
    v-if="!userSettingsReady"
    @submit="userSettingsReady = true"
  />
  <InitialGameSetupGame
    v-if="userSettingsReady && !gameSettingsReady"
    @submit="gameSettingsReady = true"
  />
  <button v-if="userSettingsReady && gameSettingsReady" @clik="finished()">
    Start the game
  </button>
</template>

<script lang="ts" setup>
const userSettingsReady = ref(false);
const gameSettingsReady = ref(false);

const emit = defineEmits(["submit"]);
function finished() {
  emit("submit");
}
</script>
