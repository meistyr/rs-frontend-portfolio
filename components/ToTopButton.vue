<template>
    <button @click="toTopFunction" id="royalty-top-btn" class="royalty-top-btn rounded py-3 px-4 bg-neutral-800" title="Go to top">
        <Icon name="fa6-solid:arrow-up" />
    </button>
</template>

<script lang="ts" setup>
    let toTopFunction: any = () => {};
    let scrollFunction: any = () => {};
    let topButton: any;

    onBeforeMount(() => { 
        scrollFunction = () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                topButton.style.display = "block";
            } else {
                topButton.style.display = "none";
            }
        }

        toTopFunction = () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }

        window.onscroll = function() {scrollFunction()};
    });

    onMounted(() => {
        topButton = document.getElementById("royalty-top-btn");
    })
</script>
