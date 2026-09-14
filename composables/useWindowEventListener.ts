export default function (event: string, listener: any) {
    onBeforeMount(() => {
        document.addEventListener(event, listener);
    });

    onMounted(() => {
        listener();
    });

    onBeforeUnmount(() => {
        document.removeEventListener(event, listener);
    });
}