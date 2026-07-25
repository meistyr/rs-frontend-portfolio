// Serves frozen player stats for a division (was: proxy to /stats/players?division_id=id).
export default defineEventHandler((event) => {
  const { id } = event.context.params!;
  return frozenPlayerStats[id] || [];
});
