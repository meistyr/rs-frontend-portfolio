import { defineNuxtPlugin } from '#imports';

export default defineNuxtPlugin(() => {
    const blockImageActions = (e: Event) => {
        const target = e.target as HTMLElement

        if (target?.closest('.protect-img')) {
            e.preventDefault()
        }
    }

    document.addEventListener('contextmenu', blockImageActions)
    document.addEventListener('dragstart', blockImageActions)
})