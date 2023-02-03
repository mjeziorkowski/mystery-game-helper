<template>
  <tr>
    <th rowspan="2">{{ props.turnNumber }}</th>
    <th>Guess</th>
    <td>
      <PlayersDropdown />
    </td>
    <td>
      <PlayersDropdown />
    </td>
    <td>
      <PlayersDropdown />
    </td>
    <td>
      <PlayersDropdown />
    </td>
    <td>
      <PlayersDropdown />
    </td>
    <td>
      <PlayersDropdown />
    </td>
  </tr>
  <tr>
    <th>Answer</th>
    <td>
      <PlayersDropdown />
    </td>
    <td>
      <PlayersDropdown />
    </td>
    <td>
      <PlayersDropdown />
    </td>
    <td>
      <PlayersDropdown />
    </td>
    <td>
      <PlayersDropdown />
    </td>
    <td>
      <PlayersDropdown />
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  turnNumber: Number,
});
</script>
