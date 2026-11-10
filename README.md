# Tech as Prosthetics

The site is a React + Vite app in `client/`. It is served by GitHub Pages from
the `gh-pages` branch, on the custom domain `techasprosthetics.io`. `main` holds
the source; `gh-pages` holds only the built files.

**Run the commands one at a time and check each result** against the
"You should see" line. If a step doesn't match, stop. A failed step does not
stop the next ones, and they will run on the wrong branch.

## Run locally

```
cd client
npm install
npm run dev
```

Then open the address it prints (usually `http://localhost:5173`).

## Deploy to techasprosthetics.io

**Do not use `npm run deploy`.** The `gh-pages` npm package's push fails in
this repo. The manual steps below use plain `git` and work reliably.

### 1. Save your work on `main`

From the repo root (`Tech-as-Prosthetics`):

```
git status
```
You should see: `On branch main`, and a list of the files you changed.

```
git add -A
git commit -m "describe your changes"
git push origin main
```
You should see: a line ending in `main -> main`.

### 2. Build

```
cd client
npm run build
```
You should see: `✓ built in ...` with no red errors.

```
du -sh dist
cd ..
```
You should see: a size around 16M. If it's much bigger, an image is oversized.

### 3. Publish

From the repo root.

```
git branch -D gh-pages-local
```
You should see: `Deleted branch` or `branch 'gh-pages-local' not found`. Both are fine.

```
git checkout -b gh-pages-local origin/gh-pages
```
You should see: `Switched to a new branch 'gh-pages-local'`.
**If you don't, stop.** The next commands would copy the build into `main`.

```
rm -rf assets khipu-game
cp -r client/dist/* .
git restore CNAME
git add -A -- assets khipu-game index.html 404.html favicon.svg icons.svg projectLogo.png
git status
```
You should see: `On branch gh-pages-local`, changes under `assets/` and
`index.html`, and nothing under `client/`.

```
git commit -m "Deploy fresh build"
git push origin gh-pages-local:gh-pages
```
You should see: a line ending in `gh-pages-local -> gh-pages`.
If it says `rejected`, someone else deployed first; ask before going on.

```
git checkout main
git branch -D gh-pages-local
```
You should see: `Switched to branch 'main'`.

### 4. Check it's live

Wait a minute or two, then:

```
curl -s https://techasprosthetics.io/ | grep -o 'assets/index-[^"]*\.js'
```
You should see: the same `index-*.js` name as in `client/dist/assets`.

Then open the site in a **private window**, including `/khipu`.

**If the site looks unstyled (white, Times font) in your normal window but fine
in a private one,** your browser has an old cached copy. Open DevTools, go to
Storage (Firefox) or Application (Chrome), unregister any service worker, delete
the site's data, and hard-reload with Cmd+Shift+R.