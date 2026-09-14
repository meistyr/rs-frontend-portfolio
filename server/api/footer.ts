// Unused legacy endpoint. Previously proxied the live backend (and referenced an
// undefined variable). Kept as a harmless stub so nothing depends on the old API/token.
export default defineEventHandler(() => {
  return [];
});
