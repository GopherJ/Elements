<template>
   <iframe :src="src" allowtransparency="true" scrolling="0" width="160px" height="30px" frameborder="0"></iframe>
</template>

<script>
    export default {
        name: 'github-badge',
        prop: {
            user: {
                type: String,
                required: true
            },
            repo: {
                type: String,
                required: true
            },
            type: {
                type: String,
                default: 'star'
            },
            count: {
                type: Boolean,
                default: true
            },
            size: {
                type: String,
                default: 'large'
            }
        },
        computed: {
            src() {
                return `https://ghbtns.com/github-btn.html?user=${this.user}&amp;repo=${this.repo}&amp;type=${this.type}&amp;count=${this.count}&amp;size=${this.size}`
            }
        }
    }
</script>
