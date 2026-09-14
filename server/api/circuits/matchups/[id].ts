// Serves frozen matchups for a division (was: proxy to /matches?division=id).
export default defineEventHandler((event) => {
  const { id } = event.context.params!;
  return frozenMatchups[id] || [];
});
