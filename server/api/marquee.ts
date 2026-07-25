// Serves frozen sponsors for the marquee (was: proxy to /sponsors?status=2).
// SponsorBar filters to status === 2 with a logo_link, so return the full frozen list.
export default defineEventHandler(() => {
  return frozenSponsors;
});
