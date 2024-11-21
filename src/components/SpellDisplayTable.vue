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
import ListFilter from './ListFilter.vue';
import SpellDisplay from './SpellDisplay.vue';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
export default {
    data() {
        const INITIAL_PAGE_INDEX = 0;
        const Spells = ref([{ name: "Placeholder" }]);

        const columnHelper = createColumnHelper();
        const pageSizes = [10, 20, 30, 40, 50]
        const sorting = ref([])
        const expanded = ref({})
        const columns = [
            columnHelper.accessor('data.school', {
                header: 'School',
                cell: (props) => (
                    h('img', { src: '/src/assets/spell_templates/dndcodex_' + this.replace(props.getValue()) + '.jpg', title:props.getValue(), class: 'rounded h-8' })
                )
            }),
            columnHelper.accessor('data.level', {
                header: 'Level',
            }),
            columnHelper.accessor('name', {
                header: 'Name',
                cell: (props) => (
                    h('a', { href: '/spells/' + props.row.original.id, class:' not-italic' }, props.getValue())
                ),
            }),
            columnHelper.accessor('data.duration', {
                header: 'Duration',
            }),
            columnHelper.accessor('data.range', {
                header: 'Range',
            }),
            columnHelper.accessor('data.concentration', {
                header: 'Concentration',
            }),
            columnHelper.display({
                id: 'expander',
                header: () => null,
                cell: ({ row }) => this.renderExpanded(row),
            }),
        ];
        const table = useVueTable({
            get data() {
                return Spells
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
            Spells,
            table,
            INITIAL_PAGE_INDEX,
            pageSizes,
            searchName: "",
            query: "",
            levelLabel: "Level",
            concentrationLabel: "Concentration",
            schoolLabel: "School",
            selectedLevels: [],
            selectedConcentrations: [],
            selectedSchool: [],
            selectedComp: [],
            selectedSource: [],
            selectedRitual: [],
            levels: [], //from db
            schools: [], //from db
            concentrations: [true, false],
            components: ['V', 'S', 'M'],
            sources: [], //from db
            ritual: [true, false],
        };
    },
    methods: {
        fetchSpells() {
            let body = {
                name: this.searchName,
                level: this.selectedLevels,
                concentration: this.selectedConcentrations,
                school: this.selectedSchool,
                components: this.selectedComp,
                ritual: this.selectedRitual,
                source: this.selectedSource
            };
            fetch("/db/spells/query", {
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
                    this.Spells = r;
                });
        },
        fetchTypes() {
            fetch("/db/spells/levels")
                .then((r) => r.json())
                .then((r) => {
                    this.levels = r;
                });
            fetch("/db/spells/schools")
                .then((r) => r.json())
                .then((r) => {
                    this.schools = r;
                });
            fetch("/db/spells/sources")
                .then((r) => r.json())
                .then((r) => {
                    this.sources = r;
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
        this.fetchTypes();
        this.fetchSpells();
    }
}
</script>
<template>
    <div class="m-3 flex flex-col items-center">
        <div class="max-w-5xl">
            <div class="text-sm bg-zinc-800 p-4 pb-0 mb-4 border-t-4 border-purple-500">
                <div class="grid w-full grid-cols-5 gap-4">
                    <div>
                        <div>Name</div>
                        <input v-model.lazy="searchName" class="w-full">
                    </div>

                    <div>
                        <ListFilter v-model:label="levelLabel" v-model:selected="selectedLevels" v-model:types="levels">
                        </ListFilter>
                    </div>

                    <div>
                        <ListFilter v-model:label="schoolLabel" v-model:selected="selectedSchool"
                            v-model:types="schools">
                        </ListFilter>
                    </div>

                    <div>
                        <ListFilter v-model:label="concentrationLabel" v-model:selected="selectedConcentrations"
                            v-model:types="concentrations">
                        </ListFilter>
                    </div>

                    <div>
                        <div class="h-5"></div>
                        <div>
                            <button v-on:click="fetchSpells()" class="rounded py-2 bg-purple-800 w-full">
                            Filter Spells </button>
                        </div>
                    </div>
                </div>
                <Disclosure v-slot="{ open }">
                    <DisclosurePanel class="grid w-full grid-cols-5 gap-4 mt-4">
                        <div>
                            <ListFilter :label="'Components'" v-model:selected="selectedComp"
                                v-model:types="components">
                            </ListFilter>
                        </div>
                        <div>
                            <ListFilter :label="'Ritual'" v-model:selected="selectedRitual" v-model:types="ritual">
                            </ListFilter>
                        </div>
                        <div>
                            <ListFilter :label="'Sources'" v-model:selected="selectedSource" v-model:types="sources">
                            </ListFilter>
                        </div>
                    </DisclosurePanel>
                    <DisclosureButton class="w-full py-2 text-purple-500 text-center">
                        <span v-text="open ? 'Hide' : 'Show'"></span> Advanced Filters
                    </DisclosureButton>
                </Disclosure>
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
                                class="p-2 [&:nth-child(3)]:col-span-2 last:justify-self-end first:p-1 content-center">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </td>
                        </tr>
                        <tr v-if="row.getIsExpanded()">
                            <td :colspan="row.getAllCells().length">
                                <SpellDisplay :spell="row.original"></SpellDisplay>
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
