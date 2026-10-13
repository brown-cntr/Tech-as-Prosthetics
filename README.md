# Deploying to techasprosthetics.io

The site is served by GitHub Pages from the `gh-pages` branch, on the custom
domain `techasprosthetics.io`. `main` holds the source; `gh-pages` holds only
the built files.

**Do not use `npm run deploy`.** The `gh-pages` npm package's push has failed
in this repo with `send-pack: unexpected disconnect while reading sideband
packet`, regardless of file size. The manual steps below use plain `git` and
work reliably.

**Run the commands one at a time and read each result.** If you paste several
at once, a failed step does not stop the rest, and later commands run on the
wrong branch.

## 1. Commit and push source changes

From the repo root:

```
git status
git add client/src client/public client/workshops
git commit -m "describe your changes"
git push origin main
```

Check `git status` before committing so you know what is being added.

## 2. Build

```
cd client
npm run build
du -sh dist
cd ..
```

`dist` should be single-digit MB. If it is much larger, see "Oversized images"
below before deploying.

## 3. Publish to gh-pages

```
git checkout -b gh-pages-local origin/gh-pages
rm -rf assets khipu-game
cp -r client/dist/* .
git restore CNAME
git add -A -- assets khipu-game index.html 404.html favicon.svg icons.svg projectLogo.png
git status
```

Read `git status` before continuing. It should show changes under `assets/`,
`khipu-game/`, and `index.html`, and nothing under `client/` or `server/`.
`git restore CNAME` keeps the domain file already on `gh-pages`. If `git
checkout` complains about local changes, commit or `git stash` them first.

Then:

```
git commit -m "Deploy fresh build"
git push origin gh-pages-local:gh-pages
git checkout main
git branch -D gh-pages-local
```

## 4. Verify

Wait a minute or two. To check what the server is actually serving, bypassing
your browser's cache:

```
curl -s https://techasprosthetics.io/ | grep -o 'assets/index-[^"]*\.js'
```

That file name should match the `index-*.js` in `client/dist/assets`.

Then check the site in a private window, including `/khipu`, and refresh on a
non-home page to confirm the `404.html` redirect still works.

If your browser shows an old version while `curl` shows the new one, a stale
service worker is the likely cause: DevTools, Application, Service Workers,
Unregister, then Clear site data, then hard-refresh.

## The Khipu game (`/khipu`)

`/khipu` shows a PixiJS game inside an iframe. The built game is a static
folder, `client/public/khipu-game`, that Vite copies into `dist` on every
build. The game's source is separate: `client/workshops/khipu-game`.

To change the game, rebuild it and recopy the output:

```
cd client/workshops/khipu-game
npx vite build
rm -rf ../../public/khipu-game
mkdir -p ../../public/khipu-game
cp -r dist/* ../../public/khipu-game/
cp -r public/* ../../public/khipu-game/
rm -f ../../public/khipu-game/assets/khipuguide.png ../../public/khipu-game/assets/guide.png
```

Notes:
- Use `npx vite build`, not `npm run build`. The game's `build` script runs
  ESLint first, and the existing code fails its style rules.
- The game's `vite.config.ts` sets `base: "./"` so its files load from
  `/khipu-game/`. Keep it.
- Asset paths in the game's code must be relative (`assets/cord.png`), not
  `/public/assets/...`.
- `khipuguide.png` and `guide.png` are not used by the game, so they are
  removed from the deployed copy.

After rebuilding the game, deploy as in steps 1 to 4.

## Oversized images

Figma SVG exports can embed a large PNG inside the SVG, making one file tens
of MB. Signs: a multi-MB `.svg` in the build output, or `du -sh dist` well over
10MB. To check a file:

```
grep -o "image/png\|image/jpeg" src/assets/yourfile.svg | head -1
```

If that prints a match, convert the SVG to a resized WebP (around 1200 to
1600px wide, quality 80 to 90) and update its `import`.

Do not use `cairosvg` for SVGs that contain a `<mask>`. It renders them
cropped or misaligned, even though the SVG is valid. Render with a real
browser engine (for example headless Chromium) and check the result against
the original.

## Known issues in the Khipu game

These are in `client/workshops/khipu-game/src` and have not been fixed yet.

- **The game slows down the longer it is played.** Event listeners (`.on('pointerdown', ...)`) are added inside click handlers, so every click adds another copy of the same listener instead of replacing it. Listeners should be registered once, when the object is created.
- **`createCord` runs twice in `cordHitbox`.** Each click can create duplicate cord objects, which adds to the slowdown above. One of the two calls should be removed.
- **`hintClick` uses the wrong texture key.** Textures are stored under paths like `assets/hintSprite.png`, but `hintClick` looks up `'hintSprite.png'`, so the hint sprite may come back undefined.
- **The guide image is very large.** `public/assets/khipuGuide1.svg` is about 31 MB because a PNG is embedded inside it, and it downloads whenever `/khipu` opens. It should be rendered to a resized WebP.
- **Unused files.** `public/assets/khipuguide.png` (about 5 MB) and `guide.png` are not used by the game.