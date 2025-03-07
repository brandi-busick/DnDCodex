<script>
export default {
    props: {
        loading: Boolean,
        error: Boolean
    }
  }
</script>
<template>
    <div v-if="loading">Loading...</div>
    <div v-if="error">We're sorry about that</div>
    <div v-if="!loading && !error" class="m-3 flex flex-col items-center">
        <div class="max-w-5xl">
            <h1 class="text-3xl my-3 font-serif">
                <slot name="name"></slot>
            </h1>
            <div class="grid w-full px-3 py-3 border bg-zinc-800 border-zinc-600 border-t-4 border-b-2 border-t-purple-600 lg:grid-cols-3 sm:grid-cols-1">
                <div class="col-span-2">
                    <slot name="display"></slot>
                </div>
                <div class="flex flex-col items-center m-2">
                    <slot name="image"></slot>
                </div>
            </div>
        </div>
    </div>
</template>