export const useCurrentGameStore = defineStore("currentGame", () => {
  const currentPlayer = ref("");
  const turnNumber = ref(0);
  const turnLogs = 0;

  const suspects = ref<{ [key: string]: { name: string; owner: string } }>({});
  const tools = ref<{ [key: string]: { name: string; owner: string } }>({});
  const rooms = ref<{ [key: string]: { name: string; owner: string } }>({});

  function setInitialData(
    currentPlayerToInit: string,
    suspectsToInit: string[],
    toolsToInit: string[],
    roomsToInit: string[]
  ) {
    currentPlayer.value = currentPlayerToInit;
    suspectsToInit.forEach((suspect) => {
      suspects.value[suspect] = {
        name: suspect,
        owner: "",
      };
    });
    toolsToInit.forEach((tool) => {
      tools.value[tool] = {
        name: tool,
        owner: "",
      };
    });
    roomsToInit.forEach((room) => {
      rooms.value[room] = {
        name: room,
        owner: "",
      };
    });
  }

  function setSuspectsOwner(suspect: string, owner: string) {
    suspects.value[suspect].owner = owner;
  }
  function setToolsOwner(tool: string, owner: string) {
    tools.value[tool].owner = owner;
  }
  function setRoomsOwner(room: string, owner: string) {
    rooms.value[room].owner = owner;
  }

  return {
    currentPlayer,
    turnNumber,
    turnLogs,

    suspects,
    tools,
    rooms,

    setInitialData,

    setSuspectsOwner,
    setToolsOwner,
    setRoomsOwner,
  };
});
