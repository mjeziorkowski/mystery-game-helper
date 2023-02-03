export const useGameDataStore = defineStore("gameData", () => {
  const players = ref<string[]>([]);
  const suspects = ref<string[]>([]);
  const tools = ref<string[]>([]);
  const rooms = ref<string[]>([]);

  function setPlayers(playersToAdd: string[]) {
    players.value = [];
    playersToAdd.forEach((player) => {
      players.value.push(player);
    });
  }
  function setSuspects(suspectsToAdd: string[]) {
    suspects.value = [];
    suspectsToAdd.forEach((suspect) => {
      suspects.value.push(suspect);
    });
  }
  function setTools(toolsToAdd: string[]) {
    tools.value = [];
    toolsToAdd.forEach((tool) => {
      tools.value.push(tool);
    });
  }
  function setRooms(roomsToAdd: string[]) {
    rooms.value = [];
    roomsToAdd.forEach((room) => {
      rooms.value.push(room);
    });
  }

  return {
    players,
    suspects,
    tools,
    rooms,

    setPlayers,
    setSuspects,
    setTools,
    setRooms,
  };
});
