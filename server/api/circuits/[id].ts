// Serves a frozen division detail (was: proxy to /divisions?division_id=id).
export default defineEventHandler((event) => {
  const { id } = event.context.params!;
  const division = frozenDivisions[id];

  if (!division) {
    throw createError({
      statusCode: 404,
      statusMessage: `Division not found for ID ${id}`,
    });
  }
  return { ...division };
});
