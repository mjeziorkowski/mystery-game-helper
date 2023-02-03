<template>
  <table>
    <thead>
      <tr>
        <th colspan="2"></th>
        <th>Suspect 1</th>
        <th>Suspect 2</th>
        <th>Suspect 3</th>
        <th>Suspect 4</th>
        <th>Suspect 5</th>
        <th>Suspect 6</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th colspan="2">Owner</th>
        <th>
          <PlayersDropdown />
        </th>
        <th>
          <PlayersDropdown />
        </th>
        <th>
          <PlayersDropdown />
        </th>
        <th>
          <PlayersDropdown />
        </th>
        <th>
          <PlayersDropdown />
        </th>
        <th>
          <PlayersDropdown />
        </th>
      </tr>
      <TurnLogger :turn-number="1" />
      <TurnLogger :turn-number="2" />
      <TurnLogger :turn-number="3" />
    </tbody>
  </table>
</template>

<style>
table,
tr,
th,
td {
  border: 1px solid #ccc;
}
</style>
