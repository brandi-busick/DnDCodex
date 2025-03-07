<script setup>
import rawhtml from '../assets/adventures/ddb-callOfTheNetherdeep.html?raw'
</script>
<script>
export default {
    props: {
        fileName: String,
    }
}
</script>
<template>
    <div>
        <span v-html="rawhtml"></span>
    </div>
</template>