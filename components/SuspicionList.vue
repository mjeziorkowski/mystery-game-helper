<template>
  <table>
    <thead>
      <tr>
        <th colspan="2"></th>
        <th v-for="player in suspicionList.players" :key="player">
          {{ player }}
        </th>
      </tr>
    </thead>
    <tbody v-for="key in suspicionList.elements">
      <tr v-for="(value, valueIndex) in key.value" :key="value.name">
        <td v-if="valueIndex === 0" :rowspan="key.value.length + 1">
          {{ key.name }}
        </td>
        <td>
          {{ value.name }}
        </td>
        <td
          v-for="player in suspicionList.players"
          :key="player"
          :class="
            value.owner === player
              ? 'HAVE'
              : value.possibleOwners.includes(player)
              ? 'POSSIBLE'
              : value.impossibleOwners.includes(player)
              ? 'IMPOSSIBLE'
              : ''
          "
        ></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { RootPlayers, useGameDataStore } from "~~/stores/gameData";

const gameDataStore = useGameDataStore();

//TODO: Add UI for setElementOwner
const suspicionList = computed(() => {
  const players = gameDataStore.players;
  const playersWithoutMe = players.map((player) => player.name);
  playersWithoutMe.unshift("Solution");

  const elements = { ...gameDataStore.elements };
  const elementsWithoutOwner = Object.entries(elements).map(([key, value]) => {
    return {
      name: key,
      value: value
        .map((element) => {
          return {
            name: element.name,
            owner: element.owner,
            possibleOwners: element.possibleOwners,
            impossibleOwners: element.impossibleOwners,
          };
        })
        .filter((element) => element.owner !== RootPlayers.GAME),
    };
  });

  return {
    players: playersWithoutMe,
    elements: elementsWithoutOwner,
  };
});
</script>

<style lang="scss" scoped>
table,
th,
td {
  border: 1px solid black;
  padding: 0.25rem;
}

.white {
  //may have
  background: white;
}
.HAVE {
  //have for sure
  background: green;
}
.IMPOSSIBLE {
  //don't have for sure
  background: rgb(201, 201, 201);
}
.POSSIBLE {
  //probably have
  background: yellow;
}
</style>
