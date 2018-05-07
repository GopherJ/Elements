<template>
    <div ref="returnTopBtn" class="return-top" @click.stop="returnTop">
        <i class="arrow up"></i>
    </div>
</template>

<script>
    export default {
        name: 'return-top',
        props: {
            threshold: {
                type: Number,
                default: 1 / 3
            },
            duration: {
                type: Number,
                default: 100
            }
        },
        methods: {
            returnTop() {
                const returnTopBtn = this.$refs.returnTopBtn,
                    docElem = document.documentElement,
                    // standard 60 fps
                    renderInterval = 1000 / 60;

                if (docElem.scrollTop === 0) {
                    return;
                }

                const step = docElem.scrollTop / this.duration * renderInterval;

                const callback = function () {
                    docElem.scrollTop -= step;

                    if (docElem.scrollTop !== 0) {
                        window.requestAnimationFrame(callback);
                    }
                };

                window.requestAnimationFrame(callback);
            }
        },
        mounted() {
            const returnTopBtn = this.$refs.returnTopBtn,
                docElem = document.documentElement || document.body,
                self = this;

            this.listener = function () {
                // percentage
                if (docElem.scrollTop / (docElem.scrollHeight - docElem.clientHeight) > self.threshold) {
                    if (!returnTopBtn.classList.contains('show')) {
                        returnTopBtn.classList.add('show');
                    }
                }

                else {
                    if (returnTopBtn.classList.contains('show')) {
                        returnTopBtn.classList.remove('show');
                    }
                }
            };

            window.addEventListener('scroll', this.listener);
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.listener);
        }
    }
</script>

<style scoped>
    .return-top {
        position: fixed;
        right: -50px;
        bottom: 100px;

        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;

        width: 50px;
        height: 100px;

        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;

        transition: all 0.3s ease;

        background-color: rgb(0, 0, 0);
        opacity: .075;
    }

    .return-top.show {
        right: 0px;
    }

    .return-top:hover {
        cursor: pointer;
        opacity: .5;
    }

    .arrow {
        border: solid rgb(255, 255, 255);
        border-width: 0 6px 6px 0;
        display: inline-block;
        padding: 6px;
    }

    .arrow.up {
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
    }
</style>
