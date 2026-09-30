# Deploying to techasprosthetics.io

This project deploys to GitHub Pages via the `gh-pages` branch, served at the
custom domain `techasprosthetics.io`.

**Note:** the `npm run deploy` script (which uses the `gh-pages` npm package)
has been unreliable in this repo — pushes to the `gh-pages` branch through
that tool consistently fail with a `send-pack: unexpected disconnect while
reading sideband packet` error, regardless of file size. The cause hasn't
been root-caused, but a manual git-based deploy works reliably every time.
**Use the manual steps below instead of `npm run deploy`.**

## Steps

**1. Commit and push your source changes as normal, from `client/`:**
```
cd client
git status
```
If anything is uncommitted, commit and push it first (from the repo root):
```
cd ..
git add .
git commit -m "describe your changes"
git push origin main
```

**2. Build the site:**
```
cd client
npm run build
```
Worth a quick sanity check on total size before deploying:
```
du -sh dist/
```
Anything in the tens of MB (rather than single-digit MB) usually means a
newly added image is oversized — see the "Compressing large images" section
below before continuing.

**3. From the repo root, check out `gh-pages` into a local branch:**
```
cd ..
git checkout -b gh-pages-local origin/gh-pages
```

**4. Replace the old deployed files with the new build:**
```
rm -rf assets
cp -r client/dist/assets .
cp client/dist/index.html .
git add -A
git status
```
**Check the `git status` output before committing.** It should only show
asset additions/deletions/renames and the `index.html` change — nothing
related to `client/` or `server/` source folders. If anything unexpected
shows up (e.g. a warning about an "embedded git repository"), unstage it
first:
```
git restore --staged <path-to-unexpected-file>
```

**5. Commit and push to `gh-pages`:**
```
git commit -m "Deploy fresh build"
git push origin gh-pages-local:gh-pages
```

**6. Return to the normal working branch and clean up:**
```
git checkout main
git branch -D gh-pages-local
```

**7. Verify the live site.** Give GitHub Pages a minute or two to rebuild,
then check **techasprosthetics.io in a private/incognito window** (not a
regular tab — a stale service worker or browser cache can make an already
up-to-date deploy look wrong). Confirm it matches what you saw in
`npm run dev`.

## Compressing large images before deploying

Several images in this project are Figma exports that embed a large raster
image inside an SVG wrapper, which can inflate a single file to tens of
megabytes. Signs a file needs this treatment:

- `npm run build`'s output size list shows a `.svg` file that's several MB
  or larger.
- `du -sh dist/` shows a total well above ~10MB.

To check if an SVG has this problem:
```
grep -o "image/png\|image/jpeg" src/assets/yourfile.svg | head -1
```
If this prints a match, the file has an embedded raster image.

**Known cairosvg issue:** rendering these files with the `cairosvg` Python
library can produce a visibly broken result (cropped/misaligned content)
for files that use a `<mask>` + pattern `<image>` combination, even though
the SVG itself is valid and displays correctly in a browser or in Figma.
If a converted image looks wrong, re-render it using a real browser engine
instead (e.g. Playwright/headless Chromium) rather than cairosvg — this has
reliably produced correct results in every case where cairosvg failed.

General compression approach for oversized assets:
1. Render/extract the actual image content (avoid cairosvg for files with
   masks — verify visually against the original before trusting a
   conversion).
2. Resize to a sensible max dimension for web use (around 1200–1600px is
   usually plenty).
3. Save as `.webp` at ~80–90% quality.
4. Update the corresponding `import` in the source file to point at the
   new `.webp`, then delete the old oversized file.
5. Rebuild (`npm run build`) and re-check `du -sh dist/` before deploying.