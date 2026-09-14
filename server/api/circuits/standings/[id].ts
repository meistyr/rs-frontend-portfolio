// Serves frozen standings (standings merged with team names; teamStats were empty upstream).
export default defineEventHandler((event) => {
  const { id } = event.context.params!;
  return frozenStandings[id] || [];
});
