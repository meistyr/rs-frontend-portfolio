<template>
    <div class="protect-img">
        <nav class="fixed top-0 left-0 w-full z-50 bg-slate-200 dark:bg-neutral-900 text-neutral-800 dark:text-gray-100 flex justify-between items-center py-4 px-6 shadow-md royalty-border">
            <div class="text-2xl font-bold">
                <nuxt-link to="/">
                    <img src="@/assets/img/royalty_verticle.png" alt="Royalty Series Logo" class="h-14"/>
                </nuxt-link>
            </div>
            <div class="hidden lg:flex space-x-6">
                <template v-for="item in navbarItems" :key="item.name">
                    <nuxt-link 
                        :to="item.path" 
                        class="bourgeois text-2xl" 
                        :class="{'text-royalty-gold': isActive(item.path), 'cursor-not-allowed pointer-events-none text-gray-400': item.disabled}" 
                        v-if="!item.disabled"
                        :target="item.external ? '_blank' : '_self'"
                        rel="noopener noreferrer" 
                    >
                        {{ item.name }}
                    </nuxt-link>
                    <span v-else class="bourgeois text-2xl cursor-not-allowed pointer-events-none text-gray-400">
                        {{ item.name }}
                    </span>
                </template>
                <div class="relative">
                    <button @click="toggleDropdown" class="bourgeois text-2xl flex items-center" :aria-expanded="isDropdownOpen.toString()">
                        PAST SEASONS
                        <Icon name="fa-solid:chevron-down" class="w-3 h-3 pl-7"/>
                    </button>
                    <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-30 bg-slate-200 dark:bg-neutral-900 text-neutral-800 dark:text-gray-100 shadow-lg rounded-md py-2 z-10 text-center" @mouseleave="closeDropdown">
                        <nuxt-link to="#" class="block px-4 py-2 bourgeois text-2xl royalty-nav-dark">SEASON I</nuxt-link>
                        <nuxt-link to="#" class="block px-4 py-2 bourgeois text-2xl royalty-nav-dark">SEASON II</nuxt-link>
                        <nuxt-link to="#" class="block px-4 py-2 bourgeois text-2xl royalty-nav-dark">SEASON III</nuxt-link>
                        <nuxt-link to="#" class="block px-4 py-2 bourgeois text-2xl royalty-nav-dark">SEASON IV</nuxt-link>
                        <nuxt-link to="#" class="block px-4 py-2 bourgeois text-2xl royalty-nav-dark">SEASON V</nuxt-link>
                        <nuxt-link to="#" class="block px-4 py-2 bourgeois text-2xl royalty-nav-dark">SEASON VI</nuxt-link>
                    </div>
                </div>
                <!--<div class="relative">
                    <nuxt-link 
                        v-if="loggedIn"
                        @click="clear"
                        class="bourgeois text-2xl" 
                        rel="noopener noreferrer" 
                    >
                        LOGOUT
                    </nuxt-link>
                    <nuxt-link 
                        to="/api/auth/discord"
                        v-else
                        class="bourgeois text-2xl"
                        external
                        rel="noopener noreferrer" 
                    >
                        LOGIN
                    </nuxt-link>
                </div>-->
            </div>

            <div class="lg:hidden">
                <button @click="toggleMenu" class="focus:outline-none">
                    <Icon name="fa-solid:bars" class="w-7 h-7 pl-7"/>
                </button>
            </div>
        </nav>

        <div v-if="isMenuOpen" class="fixed 64px left-0 w-full z-50 lg:hidden bg-slate-200 dark:bg-neutral-900 text-neutral-800 dark:text-gray-100 py-2 px-6 shadow-md">
            <template v-for="item in navbarItems" :key="item.name">
                <nuxt-link 
                    @click="toggleMenu" 
                    :to="item.path" 
                    class="block py-2 bourgeois text-2xl" 
                    :class="{'text-royalty-gold': isActive(item.path), 'cursor-not-allowed pointer-events-none text-gray-400': item.disabled}" 
                    v-if="!item.disabled"
                >
                    {{ item.name }}
                </nuxt-link>
                <span v-else class="block py-2 bourgeois text-2xl cursor-not-allowed pointer-events-none text-gray-400">
                    {{ item.name }}
                </span>
            </template>

            <div>
                <button @click="toggleDropdown" class="w-full text-left py-2 bourgeois text-2xl flex items-center">
                    PAST SEASONS
                    <Icon name="fa-solid:chevron-down" class="w-3 h-3 pl-7"/>
                </button>
                <div v-if="isDropdownOpen" class="py-2 pl-4 shadow-inner border-t border-gray-200">
                    <nuxt-link @click="toggleMenu" to="#" class="block py-2 bourgeois text-2xl">SEASON I</nuxt-link>
                    <nuxt-link @click="toggleMenu" to="#" class="block py-2 bourgeois text-2xl">SEASON II</nuxt-link>
                    <nuxt-link @click="toggleMenu" to="#" class="block py-2 bourgeois text-2xl">SEASON III</nuxt-link>
                    <nuxt-link @click="toggleMenu" to="#" class="block py-2 bourgeois text-2xl">SEASON IV</nuxt-link>
                    <nuxt-link to="#" class="block px-4 py-2 bourgeois text-2xl royalty-nav-dark">SEASON V</nuxt-link>
                    <nuxt-link to="#" class="block px-4 py-2 bourgeois text-2xl royalty-nav-dark">SEASON VI</nuxt-link>
                </div>
            </div>
            <!--<div>
                <nuxt-link 
                    v-if="loggedIn"
                    @click="logoutInMenu"
                    class="block py-2 bourgeois text-2xl" 
                    rel="noopener noreferrer" 
                >
                    LOGOUT
                </nuxt-link>
                <nuxt-link 
                    to="/api/auth/discord"
                    v-else
                    class="block py-2 bourgeois text-2xl"
                    external
                    rel="noopener noreferrer" 
                >
                    LOGIN
                </nuxt-link>
            </div>-->
        </div>
    </div>
</template>


<script lang="ts" setup>
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';
    import type { NavLink } from '~/types/rs';

    const { user, loggedIn, clear } = useUserSession();

    const isMenuOpen = ref(false);
    const isDropdownOpen = ref(false);
    const route = useRoute();

    // Define the navbar items dynamically
    const navbarItems = computed(() => headerNavigation
    .map((x: NavLink) => ({
        ...x,
        name: x.name.toUpperCase(),
        prefetch: false,
    })).filter((x) => {
        let isAuthenticated: boolean = false;
        let isAuthorized: boolean = false;

        if (!x.requiresAuth || (x.requiresAuth && loggedIn.value)) {
            isAuthenticated = true;
        }

        if (
            x.requiredRoles.length === 0 ||
            x.requiredRoles.some(r => user?.value?.roles?.includes(r))
        ) {
            isAuthorized = true
        }

        return isAuthenticated && isAuthorized;
    }));

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
    };

    const toggleDropdown = () => {
        isDropdownOpen.value = !isDropdownOpen.value;
    };

    const closeDropdown = () => {
        isDropdownOpen.value = false;
    };
    
    const logoutInMenu = () => {
        clear();
        toggleMenu();
    }

    // Function to determine if the current route is active
    const isActive = (path: string) => {
        return route.path === path;
    };
</script>
