export enum RootPlayers {
  NONE = "None",
  GAME = "Game",
  SOLUTION = "Solution",
}

export interface IPlayer {
  name: string;
  isMe: boolean;
}

export interface IElement {
  name: string;
  owner: string;
  possibleOwners: string[];
  impossibleOwners: string[];
}

export interface IElements {
  [key: string]: IElement[];
}

export interface ILog {
  player: string;
  elements: { [key: string]: string };
  whoDissagreed: string;
}

export interface ILogs {
  turn: number;
  logs: ILog[];
}

export const useGameDataStore = defineStore("gameData", () => {
  const players = ref<IPlayer[]>([]);

  function getMyName() {
    const myPlayer = players.value.find((p) => p.isMe);
    if (!myPlayer) {
      throw new Error("My player not found");
    }
    return myPlayer.name;
  }

  function getPlayerId(username: string) {
    const playerIndex = players.value.findIndex((p) => p.name === username);
    if (playerIndex === -1) {
      throw new Error("Player not found");
    }
    return playerIndex;
  }

  // function getPlayersBetween(username1: string, username2: string): IPlayer[] {
  //   const playerIndex1 = getPlayerId(username1);
  //   const playerIndex2 = getPlayerId(username2);
  //   const getPlayersBetween = ref<string[]>([]);
  //   if (playerIndex1 > playerIndex2) {
  //     const playersToMove = players.value.slice(playerIndex2);

  //     getPlayersBetween.value = [
  //       ...playersToMove,
  //       ...players.value.splice(playerIndex2, playersToMove.length),
  //     ].map((p) => p.name);
  //   }
  //   return players.value.slice(playerIndex1, playerIndex2);
  // }

  function addPlayer(username: string, isMe: boolean) {
    players.value.push({ name: username, isMe });
  }

  const elements = ref<IElements>({});

  function addElement(element: string, name: string) {
    if (!elements.value[element]) {
      elements.value[element] = [];
    }
    elements.value[element].push({
      name,
      owner: RootPlayers.NONE,
      possibleOwners: [],
      impossibleOwners: [],
    });
  }

  function setElementOwner(element: string, name: string, owner: string) {
    const nameIndex = elements.value[element].findIndex((e) => e.name === name);
    if (nameIndex === -1) {
      throw new Error(`Element ${element} with name ${name} not found`);
    }

    elements.value[element][nameIndex].owner = owner;
    elements.value[element][nameIndex].possibleOwners = [];

    const impossibleOwnersTemp = ref<string[]>([]);
    impossibleOwnersTemp.value.push("Solution");
    players.value.forEach((p) => {
      if (p.name !== owner) {
        impossibleOwnersTemp.value.push(p.name);
      } else {
        const impossibleOwnerIndex = impossibleOwnersTemp.value.findIndex(
          (o) => o === owner
        );
        if (impossibleOwnerIndex !== -1) {
          impossibleOwnersTemp.value.splice(impossibleOwnerIndex, 1);
        }
      }
    });

    elements.value[element][nameIndex].impossibleOwners = [
      ...new Set(impossibleOwnersTemp.value),
    ];
  }

  function addElementPossibleOwner(
    element: string,
    name: string,
    owner: string
  ) {
    const nameIndex = elements.value[element].findIndex((e) => e.name === name);
    if (nameIndex === -1) {
      throw new Error(`Element ${element} with name ${name} not found`);
    }
    if (elements.value[element][nameIndex].owner !== RootPlayers.NONE) {
      return;
    }
    elements.value[element][nameIndex].possibleOwners.push(owner);
  }
  function removeElementPossibleOwner(
    element: string,
    name: string,
    owner: string
  ) {
    const nameIndex = elements.value[element].findIndex((e) => e.name === name);
    if (nameIndex === -1) {
      throw new Error(`Element ${element} with name ${name} not found`);
    }
    const ownerIndex = elements.value[element][
      nameIndex
    ].possibleOwners.findIndex((o) => o === owner);
    if (ownerIndex === -1) {
      throw new Error(`Owner ${owner} not found`);
    }
    elements.value[element][nameIndex].possibleOwners.splice(ownerIndex, 1);
  }

  function addElementImpossibleOwner(
    element: string,
    name: string,
    owner: string
  ) {
    const nameIndex = elements.value[element].findIndex((e) => e.name === name);
    if (nameIndex === -1) {
      throw new Error(`Element ${element} with name ${name} not found`);
    }
    if (elements.value[element][nameIndex].owner !== RootPlayers.NONE) {
      return;
    }
    elements.value[element][nameIndex].impossibleOwners.push(owner);
  }

  const turnLogs = ref<ILogs[]>([]);
  const currentTurn = ref(0);
  const currentPlayerTurn = ref(0);
  const currentPlayerName = computed(
    () => players.value[currentPlayerTurn.value]?.name || "ERROR"
  );

  function startNewTurn() {
    console.debug("Starting new turn");
    currentTurn.value++;
    turnLogs.value.push({ turn: currentTurn.value, logs: [] });
  }

  function startNewMove() {
    console.debug("Starting new move");
    if (currentPlayerTurn.value >= players.value.length) {
      currentPlayerTurn.value = 0;
    }
    if (currentPlayerTurn.value === 0) {
      startNewTurn();
    }
  }

  function endMove(elements: { [key: string]: string }, whoDissagreed: string) {
    console.debug("Ending move");
    turnLogs.value[currentTurn.value - 1].logs.push({
      player: players.value[currentPlayerTurn.value].name,
      elements,
      whoDissagreed,
    });
    currentPlayerTurn.value++;
    startNewMove();
  }

  return {
    players,
    addPlayer,
    getMyName,
    getPlayerId,

    elements,

    addElement,
    setElementOwner,

    addElementPossibleOwner,
    removeElementPossibleOwner,

    addElementImpossibleOwner,

    turnLogs,
    currentTurn,
    currentPlayerTurn,
    currentPlayerName,
    startNewTurn,
    startNewMove,
    endMove,
  };
});
