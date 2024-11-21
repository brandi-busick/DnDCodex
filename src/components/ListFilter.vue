<script setup>
import {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    ComboboxButton
} from '@headlessui/vue'
import {  ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/16/solid'
</script>
<script>
export default {
    props: {
        label: String,
        selected: [],
        types: [],
    },
    emits: ['update:selected'],
    computed: {
        value: {
            get() {
                return this.selected
            },
            set(value) {
                this.$emit('update:selected', value)
            }
        }
    }
}
</script>
<template>
    <div>{{ label }}</div>
    <Combobox v-model="value" multiple @change="$emit('update:label', $event.target.value)">
        <div class="relative">
            <ul class="form-input p-0 list-none relative">
                <li v-for="item in value" v-bind:key="item"
                    class=" border-neutral-500 rounded-sm text-sm border inline-flex m-1 px-1"> {{ item }}</li>

                <div class="relative w-full cursor-default overflow-hidden text-left">
                    <ComboboxInput class="w-full  border-0" />
                    <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon class="h-5 w-5" aria-hidden="true" />
                    </ComboboxButton>
                </div>
            </ul>
            <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0"
                @after-leave="query = ''">
                <ComboboxOptions
                    class="absolute max-h-60 w-full overflow-auto rounded-md bg-neutral-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div v-if="types.length === 0 && query !== ''"
                        class="relative cursor-default select-none px-4 py-2 text-gray-700">
                        Nothing found.
                    </div>

                    <ComboboxOption v-for="item in types" as="template" :key="item" :value="item"
                        v-slot="{ selected, active }">
                        <li class="relative cursor-default select-none py-2 pl-10 pr-4" :class="{
                            'bg-purple-600 ': active
                        }">
                            <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                                {{ item }}
                            </span>
                            <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3"
                                :class="{ 'text-white': active, 'text-purple-600': !active }">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ComboboxOption>
                </ComboboxOptions>
            </TransitionRoot>
        </div>
    </Combobox>
</template>