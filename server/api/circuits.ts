// Serves the frozen divisions list (was: proxy to RS_BASE_API_URL /divisions?status=3).
export default defineEventHandler(() => {
  return frozenCircuits;
});
