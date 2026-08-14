# Tiesha Green — tieshagreen.com (correct repo)

This is the real, correct source for tieshagreen.com. It was originally misnamed `the-business-of-greatness-site` (leftover from before) and got confused with a different, unrelated Claude-built site sitting at `C:\Users\sinners\Projects\tiesha-green-website`, causing a live-site incident on 2026-08-14. Renamed to `tieshagreen-com` to prevent that happening again.

## Deployment
GitHub repo `tieshagreenofficial/tieshagreen-com` (Public) connected directly to the Vercel project `tiesha-green-website`, which owns the tieshagreen.com domain. Every `git push` to `main` redeploys automatically. No CLI steps needed.

## Structure
Static site, no build step: `index.html` + `style.css` + `script.js`, plus `privacy.html` and `terms.html`.

## Known issues (as of 2026-08-14)
- Fixed: mobile nav was vanishing below 860px with no hamburger fallback. Added toggle, verified live.
- Open: `https://authoritygap.tieshagreen.com` (linked 3x on the site: nav CTA, hero CTA, Resources dropdown) does not resolve. The Assessment HTML exists at `C:\Users\sinners\Projects\GreatnessRevolution\deliverables\authority_gap_assessment.html` but isn't deployed/connected yet. See the launch schedule for the fix plan.

## Related
Fuller project history and brand memory live in `C:\Users\sinners\.claude\projects\C--Users-sinners-Projects\memory\` (see MEMORY.md). Read `brand_colors_website.md` and `voice_rules.md` before making copy changes.
