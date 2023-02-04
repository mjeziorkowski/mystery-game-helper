<template>
  <section>
    <h1>How many players?</h1>
    <button @click="setPlayers(2)">2</button>
    <button @click="setPlayers(3)">3</button>
    <button @click="setPlayers(4)">4</button>
    <button @click="setPlayers(5)">5</button>
    <button @click="setPlayers(6)">6</button>

    <h1>Import game preset</h1>
    <button @click="importPreset()">Preset 1</button>
    <br /><br /><br /><br />
    <button @click="finished()">Start Game</button>
  </section>
</template>

<script setup lang="ts">
import { useGameDataStore } from "~~/stores/gameData";

const mockData = {
  rooms: [
    "room1",
    "room2",
    "room3",
    "room4",
    "room5",
    "room6",
    "room7",
    "room8",
    "room9",
  ],
  suspects: [
    "suspect1",
    "suspect2",
    "suspect3",
    "suspect4",
    "suspect5",
    "suspect6",
    "suspect7",
  ],
  tools: ["tool1", "tool2", "tool3", "tool4", "tool5", "tool6", "tool7"],
};

const gameDataStore = useGameDataStore();

function setPlayers(num: number) {
  for (let i = 0; i < num; i++) {
    gameDataStore.addPlayer(`Player ${i + 1}`, i === 0);
  }
}

function importPreset() {
  Object.entries(mockData).forEach(([key, value]) => {
    value.forEach((element) => {
      gameDataStore.addElement(key, element);
    });
  });
}

const emit = defineEmits(["submit"]);
function finished() {
  emit("submit");
}
</script>
