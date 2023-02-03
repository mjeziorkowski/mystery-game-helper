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
    <button @click="startGame()">Start game</button>
  </section>
</template>

<script setup lang="ts">
import { useGameDataStore } from "~~/stores/gameData";
const mockData = await import("~~/mocks/cluedoTest.json");

const router = useRouter();

const gameDataStore = useGameDataStore();

function setPlayers(num: number) {
  console.log(num);
  const playersList = [];
  for (let i = 0; i < num; i++) {
    playersList.push(`Player ${i + 1}`);
  }
  gameDataStore.setPlayers(playersList);
}

function importPreset() {
  gameDataStore.setRooms(mockData.rooms);
  gameDataStore.setTools(mockData.tools);
  gameDataStore.setSuspects(mockData.suspects);
}

// onMounted(() => {
//   setPlayers(4);
//   importPreset();
//   startGame();
// });

function startGame() {
  if (
    gameDataStore.rooms.length > 0 &&
    gameDataStore.tools.length > 0 &&
    gameDataStore.suspects.length > 0 &&
    gameDataStore.players.length > 1
  ) {
    console.log("Start game");
    //redirect to /game
    router.push("/game");
  } else {
    console.log("Not enough data");
  }
}
</script>
