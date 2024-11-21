<script>
export default {
    data() {
        return {
            loading: false,
            spell: null,
            error: null,
        }
    },
    created() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.params.id,
            this.fetchData,
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },
    methods: {
        async fetchData(id) {
            this.error = this.post = null
            this.loading = true
            // replace `getPost` with your data fetching util / API wrapper
            fetch("/db/spells/id/" + id)
                .then((r) => r.json())
                .then((r) => {
                    this.spell = r;
                })
                .then(() => this.loading = false)
                .catch(error => this.error = error.toString());

        },
    },
}
</script>
<script setup>
import SpellDisplay from '../components/SpellDisplay.vue';
</script>
<template>
    <div v-if="loading">Loading</div>
    <div v-if="error">We're sorry about that</div>
    <div v-if="spell" class="m-3 flex flex-col items-center">
        <div class="max-w-5xl">
            <h1 class="text-3xl my-3">{{ spell.name }}</h1>
            <div
                class="grid w-full px-3 py-6 border border-zinc-600 border-t-4 border-t-purple-600 lg:grid-cols-3 sm:grid-cols-1">
                <SpellDisplay class=" border border-zinc-600 border-t-4 col-span-2" :spell="spell"></SpellDisplay>
                <div class="flex flex-col items-center">
                    <img :src="'/src/assets/spell_templates/dndcodex_' + spell.data.school.toLowerCase() + '.jpg'"
                        class="rounded-xl p-2">
                </div>
            </div>
        </div>
    </div>
</template>