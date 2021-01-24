<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader :loading="isLoading" :color="'#68d391'" :size="100" />
    </div>
    <template v-if="!isLoading">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img :src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`" :alt="asset.name" class="w-20 h-20 mr-5" /> 
          <h1 class="text-5xl">
            {{ asset.name }}
            <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>{{ asset.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Actual Price</b>
              <span>{{ asset.priceUsd | dollar}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Lower Price</b>
              <span>{{ min |dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Higher Price</b>
              <span>{{ max |dollar}}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Median Price</b>
              <span>{{ avg |dollar }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">24H Variation</b>
              <span>{{ asset.changePercent24Hr | percent }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Change
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                id="convertValue"
                type="number"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              />
            </label>
          </div>

          <span class="text-xl"></span>
        </div>
      </div>
      <line-chart class="my-10" :colors="['orange']" :min="min" :max="max" :data="history.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)])" />
        <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr v-for="m in market" :key="`{${m.exchangeId}-${m.priceUsd}}`" class="border-b">
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>{{ m.priceUsd | dollar }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <td>
            <Button :is-loading="m.isLoading || false" v-if="!m.url" @coin-click="getWebsite(m)">
              <slot>Get the link</slot>
              </Button>
            <a v-else class="hover:underline text-green-600" target="_blank">{{ m.url }}</a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import Button from "@/components/Button"
import api from "@/api"
import { dollarFilter, percentFilter } from '@/filters'

export default {
  name: 'CoinDetail',
  components: {
    Button
  },
  data(){
    return{
      isLoading: false,
      asset: [],
      history: [], 
      market: []
    }
  }, 
  setup() {
      return {
          dollarFilter,
          percentFilter
      }
  },
  computed: {
    min(){
      return Math.min(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },
    max(){
       return Math.max(
        ...this.history.map(h => parseFloat(h.priceUsd).toFixed(2))
      )
    },
   avg() {
    return this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) / this.history.length
    }
  },
  created() {
    this.getCoin()
  }, 
  methods: {
    getWebsite(exchange) {
       this.$set(exchange, 'isLoading', true)
       return api.getExchange(exchange.exchangeId)
       .then(res => {
         this.$set(exchange, 'url', res.exchangeUrl)
       })
       .finally(() => { this.$set(exchange, 'isLoading', false) })
    },
    getCoin() {
      const id = this.$route.params.id
      this.isLoading = true
      
      Promise.all([
        api.getAsset(id),
        api.getHistory(id),
        api.getMarkets(id)
      ])
      .then(([asset, history, market]) => {
        this.asset = asset
        this.history = history
        this.market = market
      })
      .finally(() => (this.isLoading =false))
    }
  }
}
</script>