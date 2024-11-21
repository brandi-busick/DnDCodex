<script>
import Monster from '../../server/classes/Monster';

export default {
    data() {
        return {
            id: '',
            source: '',
            monster: new Monster(),
        }
    },
    methods: {
        insertData () {
            let body = {
                id: this.id,
                source: this.source,
                monster: this.text,
            };
            fetch("/db/monsters/new", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    body
                )
            })
                .then((r) => r.json())
                .then((r) => {
                    console.log(r)
                })
                .catch((e) => console.log(e));
        }
    }
}
</script>

<template>
  <main class="m-3 flex flex-col items-center">
    <div class="flex flex-col">
        <!-- <label>ID</label>
        <input type="text" name="ID" id="" v-model.lazy="monster.id">
        <label>Source</label>
        <input type="text" name="Source" id="" v-model.lazy="monster.source"> -->
        <div v-for="(value, key) in monster" :key="key">
            <label>{{ key }}</label>
            <input type="text" name="Source" id="" v-model.lazy="monster[key]">
        </div>
        <button v-on:click="insertData()">Submit</button>
    </div>
  </main>
</template>
