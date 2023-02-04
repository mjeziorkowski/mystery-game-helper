import { IElements, IPlayer } from "~~/stores/gameData";

export function validateFirstInitStep(players: IPlayer[], elements: IElements) {
  const valid = ref(true);

  // TODO: check if all players have at least one element
  if (players.length < 2) {
    valid.value = false;
    console.error("Not enough players");
  }
  // TODO: at least there is one element of each type
  if (Object.keys(elements).length === 0) {
    valid.value = false;
    console.error("Elements are empty");
  }
  return valid.value;
}
