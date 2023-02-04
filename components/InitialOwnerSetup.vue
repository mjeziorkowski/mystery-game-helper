<template>
  <section>
    <h3>{{ title }}</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>My</th>
          <th>Game</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="element in elements" :key="element.name">
          <td>{{ element.name }}</td>
          <td>
            <button @click="setOwner(element.name, myName)">
              {{ element.owner === myName ? "✔" : "" }}
            </button>
          </td>
          <td>
            <button @click="setOwner(element.name, RootPlayers.GAME)">
              {{ element.owner === RootPlayers.GAME ? "✔" : "" }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { RootPlayers, IElement } from "~~/stores/gameData";
import { useGameDataStore } from "~~/stores/gameData";

const gameDataStore = useGameDataStore();

const props = defineProps<{
  title: string;
  elements: IElement[];
}>();

const myName = gameDataStore.getMyName();

function setOwner(name: string, owner: string, element = props.title) {
  gameDataStore.setElementOwner(element, name, owner);
}
</script>

<style lang="scss" scoped>
button {
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 1rem;
}
</style>
