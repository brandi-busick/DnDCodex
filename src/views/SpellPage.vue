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
import SpellDisplay from '../components/spells/SpellDisplay.vue';
import DisplayTemplate from './DisplayTemplate.vue';
</script>
<template>
    <DisplayTemplate :loading="loading" :error="error">
        <template #name>{{ spell.name }}</template>
        <template #display>
            <SpellDisplay :spell="spell"></SpellDisplay>
        </template>
        <template #image>
            <img :src="'/src/assets/spell_templates/dndcodex_' + spell.data.school.toLowerCase() + '.jpg'"
                        class="rounded-xl p-2">
        </template>
    </DisplayTemplate>
</template>