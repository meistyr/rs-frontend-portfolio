import { staffPortalPermissions } from "~/helpers/roles";
import type { NavLink } from "~/types/rs";

export const headerNavigation: NavLink[] = [
    {
        name: 'Home',
        path: '/',
        disabled: false,
        external: false,
        requiresAuth: false,
        requiredRoles: []
    },
    {
        name: 'Rules',
        path: '/rules',
        disabled: false,
        external: false,
        requiresAuth: false,
        requiredRoles: []
    },
    {
        name: 'Circuits',
        path: '/circuits',
        disabled: false,
        external: false,
        requiresAuth: false,
        requiredRoles: []
    },
    {
        name: 'Score Submissions',
        path: '/score-report',
        disabled: true,
        external: false,
        requiresAuth: true,
        requiredRoles: []
    },
    {
        name: 'Socials',
        path: '/socials',
        disabled: false,
        external: false,
        requiresAuth: false,
        requiredRoles: []
    },
    {
        name: 'Discord',
        path: '#',
        disabled: false,
        external: false,
        requiresAuth: false,
        requiredRoles: []
    },
    {
        name: 'League Portal',
        path: '/portal',
        disabled: false,
        external: false,
        requiresAuth: true,
        requiredRoles: []
    },
]

export const dashboardSubNavigation: NavLink[] = [
    {
        name: 'Leagues',
        path: '/portal/leagues',
        disabled: false,
        external: false,
        requiresAuth: true,
        requiredRoles: []
    },
    {
        name: 'Organizations',
        path: '/portal/organizations',
        disabled: false,
        external: false,
        requiresAuth: true,
        requiredRoles: []
    },
    {
        name: 'Teams',
        path: '/portal/teams',
        disabled: false,
        external: false,
        requiresAuth: true,
        requiredRoles: []
    },
    {
        name: 'Account',
        path: '/portal/users/me',
        disabled: false,
        external: false,
        requiresAuth: true,
        requiredRoles: []
    }
]
