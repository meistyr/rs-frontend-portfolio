import { appendResponseHeader } from 'h3'
import { parse, parseSetCookie, serialize } from 'cookie-es'
import type { ApiTokens } from '#auth-utils';

export default defineNuxtRouteMiddleware(async () => {
    const nuxtApp = useNuxtApp();

    if (nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
        return;
    }

    const { session, clear: clearSession, fetch: fetchSession } = useUserSession();

    if (!session.value?.jwt) {
        return navigateTo('/');
    }

    let tokenData: ApiTokens = session.value.jwt;
    const date = new Date().toISOString();
    const now = new Date(new Date().toISOString());
    const expiry = new Date(tokenData.accessTokenExpires)

    if (now >= expiry) {
        const { data, pending, error, refresh } = await useFetch('/api/auth/refresh', {
            method: "POST"
        })

        if (error?.value) {
            console.error(error.value);
            clearSession();
            return navigateTo('/');
        }

        if (!data?.value || Object.keys(data?.value).length === 0) {
            clearSession();
            return navigateTo('/');
        }

        tokenData = data?.value?.data;
    }

    if (!tokenData?.accessToken && !tokenData?.refreshToken) {
        clearSession();
        return navigateTo('/');
    }

    session.value.jwt = tokenData;
    return;
});
