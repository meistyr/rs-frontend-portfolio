// Serves frozen teams for a division: approved teams merged with standings + roster.
export default defineEventHandler((event) => {
  const { id } = event.context.params!;
  return frozenTeams[id] || [];
});
