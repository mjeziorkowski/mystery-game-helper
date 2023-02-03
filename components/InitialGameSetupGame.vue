<template>
  <section>
    <h1>Tag game suspects</h1>
    <div v-for="suspect in currentGameStore.suspects">
      <span>{{ suspect.name }}</span>
      <!-- prettier-ignore -->
      <button @click="currentGameStore.setSuspectsOwner(suspect.name, suspect.owner === 'Game' ? '' : 'Game')"
      :disabled="suspect.owner === currentGameStore.currentPlayer">
        {{ suspect.owner === currentGameStore.currentPlayer ? "Your Card" : suspect.owner === 'Game' ? "UNCHECK" : "CHECK" }}
      </button>
    </div>
  </section>

  <section>
    <h1>Tag game tools</h1>
    <div v-for="tool in currentGameStore.tools">
      <span>{{ tool.name }}</span>
      <!-- prettier-ignore -->
      <button @click="currentGameStore.setToolsOwner(tool.name, tool.owner === 'Game' ? '' : 'Game')" :disabled="tool.owner === currentGameStore.currentPlayer">
        {{ tool.owner === currentGameStore.currentPlayer ? "Your Card" : tool.owner === 'Game' ? "UNCHECK" : "CHECK" }}
      </button>
    </div>
  </section>

  <section>
    <h1>Tag game rooms</h1>
    <div v-for="room in currentGameStore.rooms">
      <span>{{ room.name }}</span>
      <!-- prettier-ignore -->
      <button @click="currentGameStore.setRoomsOwner(room.name, room.owner === 'Game' ? '' : 'Game')" :disabled="room.owner === currentGameStore.currentPlayer">
        {{ room.owner === currentGameStore.currentPlayer ? "Your Card" : room.owner === 'Game' ? "UNCHECK" : "CHECK" }}
      </button>
    </div>
  </section>
  <br /><br /><br />
  <button @click="finished()">Submit</button>
</template>

<script lang="ts" setup>
import { useCurrentGameStore } from "~~/stores/currentGame";
import { useGameDataStore } from "~~/stores/gameData";

const currentGameStore = useCurrentGameStore();

const emit = defineEmits(["submit"]);
function finished() {
  emit("submit");
}
</script>
