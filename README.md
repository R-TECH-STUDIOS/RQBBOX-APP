# RQBBOX-APP

RQBBOX 1.0 is a working gaming-console-like web app inspired by modern Xbox and PS5 UI systems, co-branded with RTECH.

## Experience Highlights
- RQBBOX × RTECH branded boot-up splash with live progress status and security handshake copy
- RQBBOX × RTECH ID Login / Sign Up portal with secure-session branding and access tabs
- Fully interactive console navigation (Home, Game Pass, Library, Store, Friends, Settings)
- Dynamic hero + panel content that updates by selected navigation view
- Working dashboard actions: Quick Launch, Party Up toggle, Play Now, Watch Trailer, Log Out, and Install App
- Real-time telemetry updates (FPS, ping, GPU temperature)
- PWA support (manifest + service worker) so the app is installable

## Run locally
```bash
python3 -m http.server 4173
```
Then open: <http://localhost:4173>

## Make it downloadable from GitHub (Android, iOS, Windows 10/11)
1. Push this repo to GitHub.
2. Enable **GitHub Pages** (Settings → Pages → Deploy from branch).
3. Open the Pages URL on devices:
   - **Android (Chrome/Edge):** tap **Install App** (or browser install prompt).
   - **iOS (Safari):** tap **Share → Add to Home Screen**.
   - **Windows 10/11 (Edge/Chrome):** click **Install App** (or browser app install icon).

Because the app is a PWA, users can download/install it directly from the hosted GitHub Pages URL.
