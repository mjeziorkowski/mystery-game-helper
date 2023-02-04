<template>
  <section>
    <h1>What's {{ gameDataStore.currentPlayerName }} move?</h1>
    <select
      v-for="key in keysToSelect"
      :key="key.name"
      @input="newInput(key.name, $event?.target?.value)"
    >
      <option disabled selected value>-- select an option --</option>
      <option v-for="value in key.value" :key="value.name">
        {{ value.name }}
      </option>
    </select>
    &nbsp;
    <select @input="whoDissagreed = $event?.target?.value">
      <option disabled selected value>-- select an option --</option>
      <option :value="RootPlayers.NONE">{{ RootPlayers.NONE }}</option>
      <option v-for="player in gameDataStore.players">
        {{ player.name }}
      </option>
    </select>
    <button @click="endMove()">Add Move</button>
    <button @click="skipGuess()">Skip guess</button>
  </section>
  <section v-if="dissagreedModal" id="disagreeModal">
    <div id="inner">
      <h1>{{ whoDissagreed }} dissagreed with you!</h1>
      <h3>Wich card they showed to you?</h3>
      <section>
        <button
          v-for="(element, key) in elements"
          :key="key"
          @click="
            gameDataStore.setElementOwner(
              key as string,
              element,
              whoDissagreed
            );
            dissagreedModal = false;
          "
        >
          {{ element }}
        </button>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RootPlayers, useGameDataStore } from "~~/stores/gameData";

const gameDataStore = useGameDataStore();
const keysToSelect = Object.entries(gameDataStore.elements).map(
  ([key, value]) => {
    return {
      name: key,
      value: value,
    };
  }
);

const elements = ref<{ [key: string]: string }>({});
keysToSelect.forEach((key) => {
  elements.value[key.name] = "";
});
const whoDissagreed = ref<string>("");

function newInput(key: string, e: string) {
  elements.value[key] = e;
}

const dissagreedModal = ref<boolean>(false);

function endMove() {
  //TODO: Handle who dissagreed in modal
  for (const key in elements.value) {
    if (elements.value[key] === "") {
      alert("Please fill all the fields");
      return;
    }
  }
  if (whoDissagreed.value === "") {
    alert("Please fill who dissagreed");
    return;
  } else {
    //TODO: Block dissagree by the same player
    if (whoDissagreed.value !== RootPlayers.NONE) {
      if (gameDataStore.currentPlayerName === gameDataStore.getMyName()) {
        dissagreedModal.value = true;
      } else {
        Object.entries(elements.value).forEach(([key, value]) => {
          gameDataStore.addElementPossibleOwner(
            key,
            value,
            whoDissagreed.value
          );
        });
      }
    }
    let i = gameDataStore.currentPlayerTurn;
    while (i !== gameDataStore.getPlayerId(whoDissagreed.value) - 1) {
      if (i === gameDataStore.players.length - 1) {
        i = 0;
      } else {
        i++;
      }
      Object.entries(elements.value).forEach(([key, value]) => {
        console.log(key, value, gameDataStore.players[i].name);
        gameDataStore.addElementImpossibleOwner(
          key,
          value,
          gameDataStore.players[i].name
        );
      });
    }
  }
  gameDataStore.endMove({ ...elements.value }, whoDissagreed.value);
}

function skipGuess() {
  gameDataStore.endMove({}, RootPlayers.NONE);
}
</script>

<style lang="scss" scoped>
#disagreeModal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  & > div {
    position: absolute;
    padding: 5rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid black;
  }
}
</style>
