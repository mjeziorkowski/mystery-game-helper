<template>
  <section>
    <section><GameCreator /></section>
    <!-- <section>{{ players }}</section> -->
  </section>
</template>

<script>
import { useGameDataStore } from "~~/stores/gameData";

const gameDataStore = useGameDataStore();
</script>
