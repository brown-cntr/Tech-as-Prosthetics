# Tech as Prosthetics

The site is a React + Vite app in `client/`. It is served by GitHub Pages from
the `gh-pages` branch, on the custom domain `techasprosthetics.io`. `main` holds
the source; `gh-pages` holds only the built files.

**Run the commands one at a time and read each result.** If you paste several
at once, a failed step does not stop the rest, and later commands run on the
wrong branch.

## Run locally

```
cd client
npm install
npm run dev
```

Then open the address it prints (usually `http://localhost:5173`).

## Deploy to techasprosthetics.io

**Do not use `npm run deploy`.** The `gh-pages` npm package's push fails in
this repo with `send-pack: unexpected disconnect while reading sideband packet`,
regardless of file size. The manual steps below use plain `git` and work
reliably.

### 1. Commit and push source changes

From the repo root, on `main`:

```
git status
git add client/src client/public client/workshops
git commit -m "describe your changes"
git push origin main
```

Check `git status` before committing so you know what is being added.

### 2. Build

```
cd client
npm run build
du -sh dist
cd ..
```

If the build fails, fix it before deploying. If `du -sh dist` is well over
10MB, an image is probably oversized; find it in the build output before
deploying.

### 3. Publish to gh-pages

From the repo root. First, delete any leftover branch from a previous deploy.
It's fine if this says the branch was not found:

```
git branch -D gh-pages-local
```

Then:

```
git checkout -b gh-pages-local origin/gh-pages
```

**Check that this worked before going on.** The prompt or `git status` must say
`On branch gh-pages-local`. If it doesn't, stop: the next commands would copy
the build into `main`. If `git checkout` complains about local changes, commit
or `git stash` them first.

```
rm -rf assets khipu-game
cp -r client/dist/* .
git restore CNAME
git add -A -- assets khipu-game index.html 404.html favicon.svg icons.svg projectLogo.png
git status
```

Read `git status` before continuing. It should say `On branch gh-pages-local`,
and show changes under `assets/`, `khipu-game/`, and `index.html`, and nothing
under `client/` or `server/`. `git restore CNAME` keeps the domain file already
on `gh-pages`.

Then:

```
git commit -m "Deploy fresh build"
git push origin gh-pages-local:gh-pages
git checkout main
git branch -D gh-pages-local
```

### 4. Verify

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