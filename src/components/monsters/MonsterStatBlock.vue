<script>
export default {
    props: {
        monster: {}
    },
}
</script>
<template>
    <div class="bg-zinc-800 text-sm p-2">
        <div class="lg:columns-2 sm:columns-1">
            <div class="break-inside-avoid-column">
                <span class="text-2xl font-serif font-medium text-purple-400">{{ monster.name }}</span>
                <div class="text-sm italic">
                    <span>{{ monster.metadata }}</span>
                </div>
                <hr class="border-purple-400">
            </div>
            <div class="mt-3">
                <strong class="text-purple-400">Armor Class</strong> {{ monster.ac }} {{ monster.armorType }}
            </div>
            <div>
                <strong class="text-purple-400">Hit Points</strong> {{ monster.hp }} ({{ monster.hitDice }})
            </div>
            <div>
                <strong class="text-purple-400">Speed</strong> {{ monster.speed }}
            </div>
            <div class="mb-3">
                <strong class="text-purple-400">CR</strong> {{ monster.cr }} ({{ monster.xp }})
            </div>
            <div class="break-inside-avoid">
                <hr class="border-purple-400">
                <table class="table-auto border-collapse text-purple-400 w-full">
                    <thead>
                        <tr>
                            <th>STR</th>
                            <th>DEX</th>
                            <th>CON</th>
                            <th>INT</th>
                            <th>WIS</th>
                            <th>CHA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-white">
                            <td>{{ monster.str.modifier }} ({{ monster.str.score }})</td>
                            <td>{{ monster.dex.modifier }} ({{ monster.dex.score }})</td>
                            <td>{{ monster.con.modifier }} ({{ monster.con.score }})</td>
                            <td>{{ monster.int.modifier }} ({{ monster.int.score }})</td>
                            <td>{{ monster.wis.modifier }} ({{ monster.wis.score }})</td>
                            <td>{{ monster.cha.modifier }} ({{ monster.cha.score }})</td>
                        </tr>
                    </tbody>
                </table>
                <hr class="border-purple-400 mb-3">

            </div>
            <div v-if="monster.senses">
                <strong class="text-purple-400">Senses:</strong> {{ monster.senses }}
            </div>
            <div v-if="monster.saves">
                <strong class="text-purple-400">Saves:</strong> {{ monster.saves }}
            </div>
            <div v-if="monster.skills">
                <strong class="text-purple-400">Skills:</strong> {{ monster.skills }}
            </div>
            <div v-if="monster.dmgResistance">
                <strong class="text-purple-400">Damage Resistances:</strong> {{ monster.dmgResistance }}
            </div>
            <div v-if="monster.dmgImmunity">
                <strong class="text-purple-400">Damage Immunities:</strong> {{ monster.dmgImmunity }}
            </div>
            <div v-if="monster.conditionImmunity">
                <strong class="text-purple-400">Condition Immunities:</strong> {{ monster.conditionImmunity }}
            </div>
            <div v-if="monster.languages">
                <strong class="text-purple-400">Languages:</strong> {{ monster.languages }}
            </div>
            <div v-if="monster.abilities">
                <h2 class="text-lg mt-3 text-purple-400 break-after-avoid">
                    Abilities
                </h2>
                <hr class="border-purple-400 break break-after-avoid">
                <div v-for="ability in monster.abilities" :key="ability" class="mt-2 break-inside-avoid">
                    <strong>{{ ability.name }}</strong>
                    <span v-html="ability.subject"></span>
                </div>
            </div>
            <div v-if="monster.actions">
                <h2 class="text-lg mt-3 text-purple-400 break-after-avoid">
                    Actions
                </h2>
                <hr class="border-purple-400 break-after-avoid">
                <div v-for="action in monster.actions" :key="action" class="mt-2 break-inside-avoid">
                    <div v-if="action != ``">
                        <strong>{{ action.name }}</strong>
                        <span v-html="action.subject"></span>
                    </div>
                </div>
            </div>
            <div v-if="monster.legendActions">
                <h2 class="text-lg mt-3 text-purple-400 break-after-avoid">
                    Legendary Actions
                </h2>
                <hr class="border-purple-400 break-after-avoid">
                <div v-for="lAction in monster.legendActions" :key="lAction" class="mt-2 break-inside-avoid">
                    <span>{{ lAction.name }}</span>
                    <span v-html="lAction.subject"></span>
                </div>
            </div>
        </div>
        <div class="italic text-end mt-3">
            <span>{{ monster.source }}</span>
        </div>
    </div>

</template>

<style scoped>
tr {
    text-align: center;
}

i {
    display: flex;
    width: 32px;
    height: 32px;
    color: var(--color-text);
}
</style>