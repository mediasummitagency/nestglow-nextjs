# TASK-07 — Cleanup old site

**Paste this into a fresh Claude Code conversation in Antigravity.**
**Run LAST, after TASK-06 is complete and the new site has been verified working in dev.**
**This task deletes files. Do not skip the archive step.**

---

You are archiving the old TemplateMo site and cleaning up dead files. The new
Next.js site at `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow-nextjs/`
is already built and verified.

Old site location: `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/`

## Step 1 — Archive the old site first

Before deleting anything, create a compressed archive of the entire current
`nestglow/` directory as a safety net:

```bash
cd /Users/lucasbarbosa/Desktop/claude-access/websites
tar -czf nestglow-old-site-archive-2026-04-16.tar.gz nestglow/
mv nestglow-old-site-archive-2026-04-16.tar.gz /Users/lucasbarbosa/Desktop/claude-access/archives/
```

(Create `archives/` if it does not exist. Use today's date in the filename.)

Verify the archive:

```bash
ls -lh /Users/lucasbarbosa/Desktop/claude-access/archives/nestglow-old-site-archive-2026-04-16.tar.gz
```

Should be around 4-6 MB.

## Step 2 — Preserve what matters

Inside `nestglow/`, the `tasks/` folder is the handoff documentation for this
whole build. Move it somewhere it will survive the cleanup:

```bash
mv /Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/tasks \
   /Users/lucasbarbosa/Desktop/claude-access/websites/nestglow-nextjs/HANDOFF-docs
```

This keeps the original task files accessible inside the new project folder
for reference, and removes them from the deletion path.

## Step 3 — Delete dead files inside `nestglow/`

These files are dead weight and not referenced by anything live. Delete them:

**Unused Gemini-generated images (~3.2 MB total):**
- `nestglow/Gemini_Generated_Image_4u9lt84u9lt84u9l.png` (664 KB)
- `nestglow/Gemini_Generated_Image_ob9w5bob9w5bob9w.png` (685 KB)
- `nestglow/Gemini_Generated_Image_ob9w5bob9w5bob9w (1).png` (583 KB)
- `nestglow/Gemini_Generated_Image_ob9w5bob9w5bob9w (2).png` (676 KB)
- `nestglow/Gemini_Generated_Image_wi67frwi67frwi67.png` (630 KB)

**Other dead files:**
- `nestglow/test.html` (dev leftover)
- `nestglow/cleaning-services-left.png.png` (706 KB — note the `.png.png` double extension; almost certainly unused)
- `nestglow/bgreviews.png` (924 KB — check if still referenced; delete if not)
- `nestglow/book-cleaning.html` (replaced by `/book` in the new site)
- `nestglow/cleaning-calculator.html` (unused)
- `nestglow/bookurcle.jpg` (72 KB, unused image)
- `nestglow/.DS_Store` (macOS metadata)

**Check before deleting** (grep the codebase if you're not sure a file is unreferenced):
```bash
grep -r "bgreviews" /Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/
```

If a file appears nowhere except `index.html` and `index.html` is itself being deleted,
it is safe to remove.

## Step 4 — Archive and remove the rest of the old site

Once task files are moved and dead files are deleted, archive and delete the
entire old site folder:

```bash
# Confirm the archive from Step 1 still exists
ls -lh /Users/lucasbarbosa/Desktop/claude-access/archives/nestglow-old-site-archive-2026-04-16.tar.gz

# Then remove the old site folder
rm -rf /Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/
```

The new site lives at `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow-nextjs/`
going forward.

## Step 5 — Rename the new project folder (optional)

Now that the old `nestglow/` directory is gone, you can rename the new one
to simply `nestglow` for cleaner pathing:

```bash
cd /Users/lucasbarbosa/Desktop/claude-access/websites
mv nestglow-nextjs nestglow
```

If you do this, update any hardcoded paths in `PROGRESS.md` or notes. Skip if
you'd rather keep `nestglow-nextjs` to make it visually clear this is the
rebuild.

## Step 6 — Create a migration notes file

Create `/Users/lucasbarbosa/Desktop/claude-access/websites/nestglow/MIGRATION-NOTES.md`
(or `nestglow-nextjs` if not renamed) with these sections:

```markdown
# NestGlow Co — Migration Notes

## Current status
- Old site: archived at `/Users/lucasbarbosa/Desktop/claude-access/archives/nestglow-old-site-archive-2026-04-16.tar.gz`
- New site: this repo
- Production domain: nestglowco.com (currently still pointing to Hostinger old site)

## Hosting migration checklist (for Lucas)

### Before switching DNS

- [ ] Deploy new site to Vercel (or chosen host)
- [ ] Add production environment variables:
  - `NEXT_PUBLIC_BASE_URL` (if used)
  - Any Formspree or analytics IDs pulled from config
- [ ] Populate `src/lib/config.ts` with real values:
  - `TRACKING.gtmId` (GTM container ID)
  - `TRACKING.ga4Id` (GA4 measurement ID)
  - `TRACKING.googleAdsId` (Google Ads conversion ID)
  - `FORMS.quickQuote` (quick-quote Formspree endpoint, once created)
- [ ] Verify `FORMS.booking` is still set to `https://formspree.io/f/xnngyenw`
- [ ] Replace placeholder hero image with real Caroline/team photo
- [ ] Add real Google Business Profile URL to reviews page

### DNS switch

1. In Vercel, add `nestglowco.com` as a custom domain
2. In Cloudflare (or current DNS provider), update the A / CNAME records to point to Vercel
3. Wait for SSL to provision (usually under 10 min)
4. Verify site loads at `https://nestglowco.com` with valid cert
5. Submit new sitemap to Google Search Console: `https://nestglowco.com/sitemap.xml`
6. Request recrawl of the old top-ranking URLs in Search Console

### After DNS switch

- [ ] Verify Google Analytics is firing (real-time events)
- [ ] Verify form submissions still reach Formspree inbox
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Update social profile links (Instagram @summithomeservice bio, if it points anywhere)
- [ ] Request Google Business Profile URL updates if the old one pointed to a specific landing page

### If there were inbound links to old URLs

The old site was single-page with hash anchors (`#services`, `#about`). There are
probably few real external links to those hash URLs, but if any exist, they still
resolve (they'll land on the new home page rather than the section, which is
acceptable fallback behavior).

## Keep/Remove summary

| Kept | Rebuilt | Removed |
|------|---------|---------|
| Formspree endpoint `xnngyenw` | Booking form (React) | 4 MB of Gemini images |
| Phone (732) 614-0192 | Hero / sections | TemplateMo HTML template |
| Email nestglowco@gmail.com | Navigation | jQuery, Bootstrap 4 |
| 5 real testimonials | Review display | owl-carousel, isotope, animation.js |
| General-vs-Deep comparison content | Comparison page as `/general-vs-deep-cleaning` | Dead Login/Register modal |
| Favicons | Regenerated via Next.js | test.html, book-cleaning.html, cleaning-calculator.html |
```

## Step 7 — Update PROGRESS.md one last time

Mark TASK-07 complete. Summary the whole build at the top:

```markdown
## Build complete (2026-04-XX)

All 8 tasks complete. Site ready for hosting deployment.

Open items for Lucas:
- Populate tracking IDs (GTM, GA4, Google Ads) in `src/lib/config.ts`
- Create quick-quote Formspree endpoint and set `FORMS.quickQuote`
- Replace hero placeholder with real Caroline/team photo
- Add Google Business Profile URL to reviews page
- Deploy to chosen host (Vercel recommended)
- Update DNS to point nestglowco.com at new deployment
- Submit sitemap to Google Search Console and Bing Webmaster Tools
```

## Verify

- [ ] Archive exists in `/Users/lucasbarbosa/Desktop/claude-access/archives/`
- [ ] Old `nestglow/` directory is removed
- [ ] New site at `nestglow-nextjs/` (or renamed `nestglow/`) builds cleanly
- [ ] `HANDOFF-docs/` folder preserves all 8 task files inside the new project
- [ ] `MIGRATION-NOTES.md` is in the project root
- [ ] `PROGRESS.md` shows all 8 tasks complete

## Rules

- Do NOT delete the archive until the site is live in production and stable
- Do NOT delete the task files — move them into the new project
- If in doubt about a file, grep for references before deleting
- The old site directory has been frozen since TASK-00 — nothing inside it
  should have been edited during the rebuild, so archiving and removing is safe
