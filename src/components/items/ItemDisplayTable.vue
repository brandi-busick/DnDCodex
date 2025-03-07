<script setup>
import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useVueTable,
    createColumnHelper,
    getSortedRowModel,
    getExpandedRowModel,
} from '@tanstack/vue-table';
</script>
<script>
import { ref, h, } from 'vue';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/16/solid'
import { XMarkIcon } from '@heroicons/vue/16/solid'
import ListFilter from '../ListFilter.vue';
import ItemDisplay from './ItemDisplay.vue';
import TableTemplate from '../TableTemplate.vue';
export default {
    data() {
        const INITIAL_PAGE_INDEX = 0;
        const Items = ref([{ name: "Placeholder" }]);

        const columnHelper = createColumnHelper();
        const pageSizes = [10, 20, 30, 40, 50]
        const sorting = ref([])
        const expanded = ref({})
        let columns = [
            columnHelper.accessor('data.type', {
                header: '',
                cell: (props) => (
                    h('img', { src: '/src/assets/item_templates/dndcodex_' + this.replace(props.getValue()) + '.jpg', class: 'rounded h-8' })
                ),
            }),
            columnHelper.accessor('name', {
                header: 'Name',
                cell: (props) => (
                    h('a', { href: '/items/' + props.row.original.id, class: ' not-italic' }, props.getValue())
                ),
            }),
            columnHelper.accessor('data.type', {
                header: 'Type',
            }),
            columnHelper.accessor('data.rarity', {
                header: 'Rarity',
            }),
            columnHelper.accessor('data.attunement', {
                header: 'Atunement',
            }),
            columnHelper.display({
                id: 'expander',
                header: () => null,
                cell: ({ row }) => this.renderExpanded(row),
            }),
        ];
        const table = useVueTable({
            get data() {
                return Items
            },
            columns,
            state: {
                get sorting() {
                    return sorting.value
                },
                get expanded() {
                    return expanded.value
                },
            },
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            onSortingChange: updaterOrValue => {
                sorting.value =
                    typeof updaterOrValue === 'function'
                        ? updaterOrValue(sorting.value)
                        : updaterOrValue
            },
            getSortedRowModel: getSortedRowModel(),
            getRowCanExpand: () => true,
            getExpandedRowModel: getExpandedRowModel(),
            onExpandedChange: updaterOrValue => {
                expanded.value =
                    typeof updaterOrValue === 'function'
                        ? updaterOrValue(expanded.value)
                        : updaterOrValue
            },
        });
        return {
            Items,
            table,
            INITIAL_PAGE_INDEX,
            pageSizes,
            searchName: "",
            query: "",
            typeLabel: "Type",
            attuneLabel: "Attunement",
            rarityLabel: "Rarity",
            selectedTypes: [],
            selectedAttunements: [],
            selectedRarity: [],
            types: Array, //from db
            rarities: Array, //from db
            attunements: [true, false],
        };
    },
    methods: {
        fetchItems() {
            let body = {
                name: this.searchName,
                type: this.selectedTypes,
                attunement: this.selectedAttunements,
                rarity: this.selectedRarity
            };
            fetch("/db/items/query", {
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
                    this.Items = r;
                })
                .catch((e) => console.log(e));
        },
        fetchTypes() {
            fetch("/db/items/types")
                .then((r) => r.json())
                .then((r) => {
                    this.types = r;
                })
                .catch((e) => console.log(e));
            fetch("/db/items/rarities")
                .then((r) => r.json())
                .then((r) => {
                    this.rarities = r;
                })
                .catch((e) => console.log(e));
        },
        handlePageSizeChange(e) {
            this.table.setPageSize(e.target.value)
        },
        renderExpanded(row) {
            if (!row.getCanExpand()) {
                return h(XMarkIcon)
            }
            return h(
                'i', { class: 'justify-self-end' },
                row.getIsExpanded() ? h(ChevronDownIcon) : h(ChevronRightIcon)
            )
        },
        expandRow(row) {
            row.getToggleExpandedHandler()
        },
        replace(str) {
            if (str) {
                return str.replace(' ', '-');
            } else {
                return "";
            }
        }
    },
    computed: {
        filteredList() {
            return this.query === ''
                ? this.types
                : this.types.filter((type) => {
                    return type.toLowerCase().includes(this.query.toLowerCase());
                });
        }
    },
    mounted() {
        this.fetchItems();
        this.fetchTypes();
    }
}
</script>
<template>
    <TableTemplate>
        <template #filters>
                <div>
                    <div>Name</div>
                    <input v-model.lazy="searchName" class="w-full">
                </div>

                <div>
                    <ListFilter v-model:label="typeLabel" v-model:selected="selectedTypes" v-model:types="types">
                    </ListFilter>
                </div>

                <div>
                    <ListFilter v-model:label="rarityLabel" v-model:selected="selectedRarity" v-model:types="rarities">
                    </ListFilter>
                </div>

                <div>
                    <ListFilter v-model:label="attuneLabel" v-model:selected="selectedAttunements"
                        v-model:types="attunements">
                    </ListFilter>
                </div>

                <div>
                    <button v-on:click="fetchItems()" class="rounded py-2 bg-purple-800 w-full">
                        Filter Items </button>
                </div>
        </template>
        <template #table>
            <thead class="text-left">
                <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id"
                    class="grid w-full grid-cols-7">
                    <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan"
                        class="border-0 p-2 [&:nth-child(2)]:col-span-2 content-end" :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                            " @click="header.column.getToggleSortingHandler()?.($event)">
                        <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                            :props="header.getContext()" />
                        {{
                            { asc: ' ↑', desc: ' ↓' }[
                            header.column.getIsSorted()
                            ]
                        }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="row in table.getRowModel().rows" :key="row.id">
                    <tr @click="row.toggleExpanded()"
                        class="grid bg-zinc-800 border-zinc-800 border hover:bg-zinc-700 w-full grid-cols-7 mt-3">
                        <td v-for="cell in row.getVisibleCells()" :key="cell.id"
                            class="p-2 [&:nth-child(2)]:col-span-2 last:justify-self-end first:p-1 content-center">
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                        </td>
                    </tr>
                    <tr v-if="row.getIsExpanded()">
                        <td :colspan="row.getAllCells().length" class="border-zinc-800 border">
                            <ItemDisplay :item="row.original"></ItemDisplay>
                        </td>
                    </tr>
                </template>
            </tbody>

        </template>
        <template #pagination>
            <button class="border rounded px-2 pb-1" @click="() => table.setPageIndex(0)"
                :disabled="!table.getCanPreviousPage()">
                «
            </button>
            <button class="border rounded px-2 pb-1" @click="() => table.previousPage()"
                :disabled="!table.getCanPreviousPage()">
                ‹
            </button>
            <button class="border rounded px-2 pb-1" @click="() => table.nextPage()"
                :disabled="!table.getCanNextPage()">
                ›
            </button>
            <button class="border rounded px-2 pb-1" @click="() => table.setPageIndex(table.getPageCount() - 1)"
                :disabled="!table.getCanNextPage()">
                »
            </button>
            <span class="flex items-center gap-1">
                <div>Page</div>
                <strong>
                    {{ table.getState().pagination.pageIndex + 1 }} of
                    {{ table.getPageCount() }}
                </strong>
            </span>
            <select :value="table.getState().pagination.pageSize" @change="handlePageSizeChange">
                <option :key="pageSize" :value="pageSize" v-for="pageSize in pageSizes">
                    Show {{ pageSize }}
                </option>
            </select>

        </template>
    </TableTemplate>

</template>
