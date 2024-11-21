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
import MonsterStatBlock from './MonsterStatBlock.vue';
</script>
<script>
import { ref, h, withDirectives, resolveDirective, } from 'vue';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/vue/16/solid'
import { XMarkIcon } from '@heroicons/vue/16/solid'
import ListFilter from './ListFilter.vue';
export default {
    data() {
        const INITIAL_PAGE_INDEX = 0;
        const monsters = ref([{ name: "Placeholder" }]);

        const columnHelper = createColumnHelper();
        const pageSizes = [10, 20, 30, 40, 50]
        const sorting = ref([])
        const expanded = ref({})
        const vfallback = resolveDirective('fallback')
        const columns = [
            columnHelper.accessor('id', {
                header: '',
                cell: (props) => (
                    withDirectives(
                        h('img', {
                            src: '/src/assets/monster_images/' + props.getValue() + '.png',
                            class: 'rounded h-8 bg-zinc-50 p-1 data-[fallback]:bg-transparent data-[fallback]:p-0'
                        }),
                        [[vfallback, '/src/assets/monster_templates/dndcodex_'+props.row.original.type+'.jpg']]
                    )

                ),
            }),
            columnHelper.accessor('cr', {
                header: () => 'CR',
                sortingFn: 'alphanumericCaseSensitive'
            }),
            columnHelper.accessor('name', {
                header: 'Name',
                cell: (props) => (
                    h('a', { href: '/monsters/' + props.row.original.id, class: ' not-italic' }, props.getValue())
                ),
            }),
            columnHelper.accessor('type', {
                header: () => 'Type',
            }),
            columnHelper.accessor('size', {
                header: () => 'Size',
            }),
            columnHelper.accessor('alignment', {
                header: 'Alignment',
            }),
            columnHelper.display({
                id: 'expander',
                header: () => null,
                cell: ({ row }) => this.renderExpanded(row),
            }),
        ];
        const table = useVueTable({
            get data() {
                return monsters
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
            monsters,
            table,
            INITIAL_PAGE_INDEX,
            pageSizes,
            searchName: "",
            query: "",
            typeLabel: "Type",
            sizeLabel: "Size",
            alignLabel: "Alignment",
            selectedTypes: [],
            selectedSizes: [],
            selectedAlign: [],
            sizes: [
                'Tiny',
                'Small',
                'Medium',
                'Large',
                'Huge',
                'Gargantuan'],
            types: [], //from db
            alignments: [], //from db
        };
    },
    methods: {
        fetchMonsters() {
            let body = {
                name: this.searchName,
                type: this.selectedTypes,
                size: this.selectedSizes,
                alignment: this.selectedAlign
            };
            fetch("/db/monsters/query", {
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
                    this.monsters = r;
                });
        },
        fetchTypes() {
            fetch("/db/monsters/types")
                .then((r) => r.json())
                .then((r) => {
                    this.types = r;
                });
            fetch("/db/monsters/alignments")
                .then((r) => r.json())
                .then((r) => {
                    this.alignments = r;
                });
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
        this.fetchTypes();
        this.fetchMonsters();
    }
}
</script>
<template>
    <div class="m-3 flex flex-col items-center">
        <div class="max-w-5xl">
            <div class="grid w-full grid-cols-5 gap-4">
                <div>
                    <div>Name</div>
                    <input v-model.lazy="searchName" class="w-full">
                </div>

                <div>
                    <ListFilter v-model:label="typeLabel" v-model:selected="selectedTypes" v-model:types="types">
                    </ListFilter>
                </div>

                <div>
                    <ListFilter v-model:label="sizeLabel" v-model:selected="selectedSizes" v-model:types="sizes">
                    </ListFilter>
                </div>

                <div>
                    <ListFilter v-model:label="alignLabel" v-model:selected="selectedAlign" v-model:types="alignments">
                    </ListFilter>
                </div>

                <div class="flex items-start justify-center">
                    <button v-on:click="fetchMonsters()" class="rounded px-4 py-1 bg-purple-800">
                        Filter Monsters </button>
                </div>
            </div>
            <table class="w-screen border-0 max-w-5xl mt-8">
                <thead class="text-left">
                    <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id"
                        class="grid w-full grid-cols-8">
                        <th v-for="header in headerGroup.headers" :key="header.id" :colSpan="header.colSpan"
                            class="border-0 px-2 [&:nth-child(3)]:col-span-2 content-end" :class="header.column.getCanSort() ? 'cursor-pointer select-none' : ''
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
                            class="grid bg-zinc-800 border-zinc-800 hover:bg-zinc-700 w-full grid-cols-8 mt-3">
                            <td v-for="cell in row.getVisibleCells()" :key="cell.id"
                                class="p-2 [&:nth-child(3)]:col-span-2 last:justify-self-end content-center">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </td>
                        </tr>
                        <tr v-if="row.getIsExpanded()">
                            <td :colspan="row.getAllCells().length">
                                <MonsterStatBlock :monster="row.original"></MonsterStatBlock>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>

            <div class="flex items-center justify-center gap-2 m-2">
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
            </div>

        </div>
    </div>
</template>

<style>
svg {
    display: flex;
    align-self: center;
    width: 32px;
    height: 32px;
    color: var(--color-text);
}
</style>
