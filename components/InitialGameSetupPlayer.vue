<template>
  <section>
    <h1>Tag your suspects</h1>
    <div v-for="suspect in currentGameStore.suspects">
      <span>{{ suspect.name }}</span>
      <!-- prettier-ignore -->
      <button @click="currentGameStore.setSuspectsOwner(suspect.name, suspect.owner === currentGameStore.currentPlayer ? '' : currentGameStore.currentPlayer)">
        {{ suspect.owner === currentGameStore.currentPlayer ? "UNCHECK" : "CHECK" }}
      </button>
    </div>
  </section>

  <section>
    <h1>Tag your tools</h1>
    <div v-for="tool in currentGameStore.tools">
      <span>{{ tool.name }}</span>
      <!-- prettier-ignore -->
      <button @click="currentGameStore.setToolsOwner(tool.name, tool.owner === currentGameStore.currentPlayer ? '' : currentGameStore.currentPlayer)">
        {{ tool.owner === currentGameStore.currentPlayer ? "UNCHECK" : "CHECK" }}
      </button>
    </div>
  </section>

  <section>
    <h1>Tag your rooms</h1>
    <div v-for="room in currentGameStore.rooms">
      <span>{{ room.name }}</span>
      <!-- prettier-ignore -->
      <button @click="currentGameStore.setRoomsOwner(room.name, room.owner === currentGameStore.currentPlayer ? '' : currentGameStore.currentPlayer)">
        {{ room.owner === currentGameStore.currentPlayer ? "UNCHECK" : "CHECK" }}
      </button>
    </div>
  </section>
  <br /><br /><br />
  <button @click="finished()">Submit</button>
</template>

<script lang="ts" setup>
import { useCurrentGameStore } from "~~/stores/currentGame";
import { useGameDataStore } from "~~/stores/gameData";

const gameDataStore = useGameDataStore();
const currentGameStore = useCurrentGameStore();

currentGameStore.setInitialData(
  "Player 1",
  gameDataStore.suspects,
  gameDataStore.tools,
  gameDataStore.rooms
);

const emit = defineEmits(["submit"]);
function finished() {
  emit("submit");
}
</script>
