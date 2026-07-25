import type { ROLE } from "~/helpers/roles";

class NavLink {
    name: string;
    path: string;
    disabled: boolean;
    external: boolean;
    requiresAuth: boolean;
    requiredRoles: ROLE[];
}