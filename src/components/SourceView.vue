<script setup>
import { nextTick } from 'vue';
</script>
<script>
export default {
    data() {
        return {
            html: '',
            loading: false,
            loadingHeaders: true,
            // toc: ref( { headers: [], headerSelector: "" }),
            // currentSection: ref(""),
            toc: { headers: [], headerSelector: "" },
            currentSection: "",
            selector: "article[data-toc-content]",
            tocOptions: {
                headinglevels: "h1, h2, h3",
                appendAnchor: true,
                anchorClass: "toc-anchor",
                headerClass: "toc-header",
            },
        }
    },
    created() {
        // watch the params of the route to fetch the data again
        this.$watch(
            () => this.$route.params.id,
            this.importHtml,
            // fetch the data when the view is created and the data is
            // already being observed
            { immediate: true }
        )
    },
    methods: {
        async importHtml() {
            const foo = await import(`../assets/sources/${this.$route.params.type}/${this.$route.params.id}.html?raw`);
            this.html = foo.default;
            this.loading = true;
            await nextTick();
            this.loading = false;
            console.log("this.html");
            this.tocHighlight();
        },
        tocHighlight() {
            this.getToc(this.selector, this.tocOptions);
            console.log(this.toc);
            if (this.toc === undefined) return;
            this.loadingHeaders = false;

            const nodes = document.querySelectorAll(this.toc.headerSelector);
            if (nodes === undefined) return;

            // Creating the intersection observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting)
                        //update current state if the target element intersects 
                        //with the intersection observer's root or root margin
                        this.currentSection = entry.target.getAttribute("id");
                });
            }, {});

            nodes.forEach((target) => {
                observer.observe(target);
            });
        },
        getToc() {
            const contentNode = document.querySelector(this.selector);
            if (!contentNode) return;

            /**
             * Generate ID using heading text
             * @param  {node} el The heading element
             */
            const GenerateID = (el) => {
                return el.innerText.toLowerCase().replace(/[^A-Za-z0-9]/g, "-");
            };

            // Set toc header selector
            this.toc.headerSelector = `${this.selector} .${this.tocOptions.headerClass}`;

            contentNode.querySelectorAll(this.tocOptions.headinglevels).forEach((el) => {
                let id = el.getAttribute("id") || GenerateID(el);

                // Set ID
                el.setAttribute("id", id);

                // Set header class
                el.classList.add(this.tocOptions.headerClass);

                // Append extracted heading to toc
                // h2 -> indent 1, h3 -> indent 2 etc.
                this.toc.headers.push({
                    id: id,
                    text: el.innerText,
                    indent: parseInt(el.tagName.slice(1)) - 1,
                });

                // Create anchor tag
                if (this.tocOptions.appendAnchor) {
                    const anchor = document.createElement("a");
                    anchor.classList.add(this.tocOptions.anchorClass);
                    anchor.href = `#${id}`;
                    //anchor.innerText = "#";
                    el.prepend(anchor);
                }
            });

        },
    }
}
</script>
<template>
    <div class="flex justify-center m-4">
        <div>
            <div class="section-nav border border-zinc-600 text-sm overflow-scroll h-[800px] sticky top-16 mx-2">
                <nav v-if="!loadingHeaders">
                    <ul>
                        <li :class="{ active: header.id == currentSection }" v-for="header in toc.headers"
                            :key="header.id">
                            <a :href="`#${header.id}`" :style="{
                                paddingLeft: Math.pow(2, header.indent) * 0.25 + 'rem',
                            }">
                                {{ header.text }}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
        <div class="p-4 max-w-3xl bg-zinc-800 source">
            <article v-html="html" data-toc-content></article>
        </div>
    </div>

</template>

<style>
.section-nav li {
    @apply border-l-4 border-transparent w-full
}

.section-nav li.active {
    @apply border-purple-700 bg-zinc-800
}

.section-nav {
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
}

.source {

    aside {
        @apply bg-zinc-800 p-4 border border-y-4 border-purple-600 m-8
    }

    /* Typography */

    .toc-anchor:before {
        @apply absolute -ml-4 opacity-0 transition-opacity duration-500;
        content: "#";
    }

    h1 {
        @apply text-2xl;
    }

    h2 {
        @apply text-xl;
    }

    h3 {
        @apply text-lg;
    }

    h1,
    h2,
    h3 {
        @apply mb-2 mt-4 border-b-2 border-purple-700;

        &:hover>.toc-anchor:before {
            @apply opacity-100;
        }
    }

    h4,
    h5,
    h6 {
        @apply text-base font-bold my-2;
    }

    p {
        @apply text-sm/6 mb-2;
    }

    /* Images */
    .compendium-image {
        margin: 10px 0;
    }

    .compendium-image-right {
        float: right;
        padding-left: 10px;
    }

    .compendium-image-left {
        float: left;
        padding-right: 10px;
    }

    .compendium-image>figcaption {
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        font-style: italic;
        text-transform: uppercase;
        margin: 10px 0;
    }

    /* Random */

    :is(.text--rules-sidebar, .table-compendium) a:not(.tooltip-hover, .ddb-lightbox-outer) {
        color: #00508f
    }

    .action-tooltip:not(.Basic-Text-Frame .tooltip-hover),
    .condition-tooltip:not(.Basic-Text-Frame .tooltip-hover),
    .sense-tooltip:not(.Basic-Text-Frame .tooltip-hover),
    .skill-tooltip:not(.Basic-Text-Frame .tooltip-hover),
    .weapon-properties-tooltip:not(.Basic-Text-Frame .tooltip-hover) {
        color: #11884c !important
    }

    .table-compendium :is(.tooltip-hover.condition-tooltip, .tooltip-hover.sense-tooltip, .tooltip-hover.skill-tooltip, .tooltip-hover.action-tooltip, .tooltip-hover.weapon-properties-tooltip) {
        color: #005d2e !important
    }

    aside.text--rules-sidebar :is(.tooltip-hover.condition-tooltip, .tooltip-hover.sense-tooltip, .tooltip-hover.skill-tooltip, .tooltip-hover.action-tooltip, .tooltip-hover.weapon-properties-tooltip) {
        color: #005d2e !important
    }

    .tooltip-hover.rule-tooltip {
        color: #9b740b !important
    }

    :is(.text--rules-sidebar, .table-compendium) .tooltip-hover.rule-tooltip {
        color: #6f5306 !important
    }

    .tooltip-hover.item-tooltip {
        color: #774521 !important
    }

    p.hangingIndent {
        padding-left: 1.5em
    }


    /* Table */

    tr th,
    td {
        padding: 5px 20px !important
    }


    table.table--features td:nth-child(3),
    table.table--features th:nth-child(3) {
        padding-left: 10px !important;
        text-align: left !important
    }

    table.table--features td:first-child,
    table.table--features td:nth-child(2),
    table.table--features td:nth-child(n+4),
    table.table--features th:first-child,
    table.table--features th:nth-child(2),
    table.table--features th:nth-child(n+4),
    table.table--multiclass td,
    table.table--multiclass th {
        padding-left: 0 !important;
        padding-right: 0 !important;
        min-width: 0 !important
    }


    table.sorcerer tbody td {
        border: 1px solid #edeae8;
        font-size: 14px;
        text-align: center;
        padding: 10px !important
    }

    table.sorcerer th:nth-child(4) {
        text-align: left !important;
        padding: 20px !important
    }

    table.sorcerer td:nth-child(4) {
        text-align: left !important;
        padding-left: 0 !important
    }

    table.sorcerer td:first-child,
    table.sorcerer td:nth-child(2),
    table.sorcerer td:nth-child(3),
    table.sorcerer td:nth-child(n+5),
    table.sorcerer th:first-child,
    table.sorcerer th:nth-child(2),
    table.sorcerer th:nth-child(3),
    table.sorcerer th:nth-child(n+5) {
        padding: 0 !important;
        min-width: 0 !important
    }

    /* StatBlocks */
    .Basic-Text-Frame {
        @apply columns-2 bg-zinc-700 text-xs p-2 border border-y-4 border-purple-700;

        p {
            @apply text-xs;
        }

        .Stat-Block-Styles_Stat-Block-Heading,
        .Stat-Block-Styles_Stat-Block-Title {
            @apply text-base border-b-2 border-purple-700 break-after-avoid;
        }
    }

    .stat-block-ability-scores {
        @apply flex border-y-2 border-purple-700 my-2 py-2 justify-center;

        .stat-block-ability-scores-stat {
            @apply mx-2 text-center;
        }
    }
}
</style>