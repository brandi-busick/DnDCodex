<script>
export default {
    data() {
        return {
            loading: false,
            item: null,
            error: false,
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
            fetch("/db/items/id/" + id)
                .then((r) => r.json())
                .then((r) => {
                    this.item = r;
                })
                .then(() => this.loading = false)
                .catch(error => this.error = error.toString());

        },
    },
}
</script>
<script setup>
import ItemDisplay from '../components/items/ItemDisplay.vue';
import DisplayTemplate from './DisplayTemplate.vue';

</script>
<template>
    <DisplayTemplate :loading="loading" :error="error">
        <template #name>{{ item.name }}</template>
        <template #display>
            <ItemDisplay :item="item">
            </ItemDisplay>
        </template>
        <template #image>
            <img v-fallback="'/src/assets/item_templates/dndcodex_' + item.data.type.replace(' ', '-') + '.jpg'"
                :src="'/src/assets/item_images/' + item.id + '.png'"
                class="bg-zinc-50 rounded-xl p-2 data-[fallback]:bg-transparent data-[fallback]:m-0">
        </template>
    </DisplayTemplate>
</template>