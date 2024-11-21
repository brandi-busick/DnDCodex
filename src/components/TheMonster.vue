<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'
import { ChevronRightIcon } from '@heroicons/vue/16/solid'
</script>
<script>
export default {
  data() {
    return {
      serverHello: [],
      monsters: []
    }
  },
  methods: {
    fetchHello() {
      fetch("/db/monsters")
        .then((r) => r.json())
        .then((r) => {
          //console.log(r);
          this.monsters = r;
        });
    }
  },
  mounted() {
    this.fetchHello();
  }
}
</script>

<template>
  <div class="grid grid-flow-col items-center text-start mx-3 mt-2 border-zinc-400 max-w-5xl">
    <span class="w-9">CR</span>
    <span class="w-64 px-3">Name</span>
    <span class="w-36 px-3">Type</span>
    <span class="w-36 px-3">Size</span>
    <span class="w-36 px-3">Alignment</span>
    <span class="w-8 px-3"></span>
  </div>
  <ul class="flex flex-col mx-2 max-w-5xl">
    <Disclosure v-for="item in monsters" :key="item._id">
      <DisclosureButton
        class="grid grid-flow-col items-center text-start mt-4 p-2 bg-zinc-600 rounded border-2 border-zinc-400 ui-open:bg-zinc-500 ui-open:rounded-b-none hover:bg-zinc-400">
        <span class="w-9">{{ item.cr }}</span>
        <span class=" w-64 px-3">{{ item.name }}</span>
        <span class="w-36 px-3">{{ item.type }}</span>
        <span class="w-36 px-3">{{ item.size }}</span>
        <span class="w-36 px-3">{{ item.alignment }}</span>
        <div class="justify-end">
          <ChevronRightIcon class=" float-right w-8 h-8 ui-open:rotate-90 ui-open:transform" />
        </div>
      </DisclosureButton>
      <DisclosurePanel class="bg-zinc-700 columns-2 text-sm border-x-2 border-b-2 p-2 rounded-b">
        <div class="text-xl text-green-600">
          <span>{{ item.name }}</span>
        </div>
        <div class=" italic">
          <span>{{ item.metadata }}</span>
        </div>
        <hr class="border-green-600">
        <div class="text-green-600 mt-2">
          <strong>Armor Class</strong> {{ item.ac }} {{ item.armorType }}
        </div>
        <div class="text-green-600">
          <strong>Hit Points</strong> {{ item.hp }} ({{ item.hitDice }})
        </div>
        <div class="text-green-600">
          <strong>Speed</strong> {{ item.speed }}
        </div>
        <div class="text-green-600 mb-2">
          <strong>CR</strong> {{ item.cr }} ({{ item.xp }})
        </div>
        <hr class="border-green-600">
        <table class="table-auto border-collapse text-green-600 w-96">
          <thead>
            <tr>
              <th>STR</th>
              <th>DEX</th>
              <th>CON</th>
              <th>INT</th>
              <th>WIS</th>
              <th>CHA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ item.str.modifier }} ({{ item.str.score }})</td>
              <td>{{ item.dex.modifier }} ({{ item.dex.score }})</td>
              <td>{{ item.con.modifier }} ({{ item.con.score }})</td>
              <td>{{ item.int.modifier }} ({{ item.int.score }})</td>
              <td>{{ item.wis.modifier }} ({{ item.wis.score }})</td>
              <td>{{ item.cha.modifier }} ({{ item.cha.score }})</td>
            </tr>
          </tbody>
        </table>
        <hr class="border-green-600">
        <div class="text-green-600 mt-2" v-if="item.saves">
          <strong>Saves</strong> {{ item.saves }}
        </div>
        <div class="text-green-600" v-if="item.skills">
          <strong>Skills</strong> {{ item.skills }}
        </div>
        <div v-if="item.abilities">
          <h2 class=" text-lg mt-1 text-green-600">
            Abilities
          </h2>
          <hr class="border-green-600">
          <div v-for="ability in item.abilities" :key="ability" class="mt-2">
            <strong>{{ ability.match(/(?<name>^(.*?)\.)(?<subject>.*?$)/).groups.name }}</strong>
            <span>{{ ability.match(/(?<name>^(.*?)\.)(?<subject>.*?$)/).groups.subject }}</span>
          </div>
        </div>
        <div v-if="item.actions">
          <h2 class="text-lg mt-1 text-green-600">
            Actions
          </h2>
          <hr class="border-green-600">
          <div v-for="action in item.actions" :key="action" class="mt-2">
            <strong>{{ action.match(/(?<name>^(.*?)\.)(?<subject>.*?$)/).groups.name }}</strong>
            <span>{{ action.match(/(?<name>^(.*?)\.)(?<subject>.*?$)/).groups.subject }}</span>
          </div>
        </div>
        <div v-if="item.legendActions">
          <h2 class="text-lg mt-1 text-green-600">
            Legendary Actions
          </h2>
          <hr class="border-green-600">
          <div v-for="lAction in item.legendActions" :key="lAction" class="mt-2">
            <span>{{ lAction }}</span>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </ul>

</template>

<style scoped>
tr {
  text-align: center;
}

i {
  display: flex;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}
</style>