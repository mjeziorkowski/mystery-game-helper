<template>
  <table>
    <thead>
      <tr>
        <th>Turn</th>
        <th v-for="player in gameDataStore.players" :key="player.name">
          {{ player.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(turn, turnIndex) in gameDataStore.turnLogs" :key="turnIndex">
        <td>
          {{ turn.turn }}
        </td>
        <td v-for="(log, logIndex) in turn.logs" :key="logIndex">
          <div
            v-for="(element, elementIndex) in log.elements"
            :key="elementIndex"
          >
            {{ element }}
          </div>
          <div>{{ log.whoDissagreed }} dissagreed</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { RootPlayers, useGameDataStore } from "~~/stores/gameData";

const gameDataStore = useGameDataStore();
</script>

<style lang="scss" scoped>
table,
th,
td {
  border: 1px solid black;
  padding: 0.25rem;
}
</style>
