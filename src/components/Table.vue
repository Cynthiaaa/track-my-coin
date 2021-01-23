<template>
  <table>
    <thead>
      <tr class="bg-purple-200 border-b-2 border-gray-400">
        <th></th>
        <th>Ranking</th>
        <th>Name</th>
        <th>Price</th>
        <th>Market Cap</th>
        <th>Past 24h History</th>
        <td class="hidden sm:block"></td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="a in assets" :key ="a.id" class="border border-gray-200 hover:bg-gray-100 hover:bg-orange-100">
        <td><img class="w-6 h-6" :src="`https://static.coincap.io/assets/icons/${a.symbol.toLowerCase()}@2x.png`" :alt="a.name"></td>
        <td>#{{ a.rank}}</td>
        <td class="capitalize">{{ a.id }}</td>
        <td>{{ a.priceUsd | dollar }}</td>
        <td>{{ a.marketCapUsd | dollar }}</td>
        <td :class="a.changePercent24Hr.includes(' - ') ? 'text-red-600' : 'text-green-600' ">{{ a.changePercent24Hr | percent }}</td>
        <td class="hidden sm:block"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { dollarFilter, percentFiler } from "@/filters"

export default {
  name: "Table",

  props: {
    assets: {
      type: Array,
      default: () => []
    }
  }, 
  setup() {
    return {
      dollarFilter, 
      percentFilter
    }
  }
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
