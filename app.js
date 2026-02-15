const bootScreen = document.getElementById("bootScreen");
const bootProgress = document.getElementById("bootProgress");
const bootStatus = document.getElementById("bootStatus");
const authScreen = document.getElementById("authScreen");
const appShell = document.getElementById("appShell");
const toast = document.getElementById("toast");

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const profileName = document.getElementById("profileName");
const dashboardTitle = document.getElementById("dashboardTitle");
const panelTitle = document.getElementById("panelTitle");
const queueList = document.getElementById("queueList");
const tilesGrid = document.getElementById("tilesGrid");

const featuredTitle = document.getElementById("featuredTitle");
const featuredCopy = document.getElementById("featuredCopy");

const fps = document.getElementById("fps");
const ping = document.getElementById("ping");
const temp = document.getElementById("temp");

const state = {
  user: "PLAYER",
  activeView: "home",
  partyOnline: false,
  queue: [
    "Eclipse Protocol — Campaign checkpoint 7/12",
    "Neon Drift X — Ranked finals waiting",
    "Rogue Planet Siege — Co-op squad invite",
    "Skyline Frontline — Cloud stream standby",
    "Apex Sector — Patch installed, ready to launch",
  ],
  views: {
    home: {
      panelTitle: "Up Next",
      hero: {
        title: "R TECH Chronicles: Eclipse Protocol",
        copy: "Drop into a cinematic campaign with adaptive haptics, smart triggers, and cross-platform squads.",
      },
      items: [
        "Eclipse Protocol — Campaign checkpoint 7/12",
        "Neon Drift X — Ranked finals waiting",
        "Rogue Planet Siege — Co-op squad invite",
      ],
      tiles: [
        ["Instant Resume", "Jump back into 4 suspended games in under 6 seconds.", "green"],
        ["Activity Cards", "Track quests, speedrun goals, and mission checkpoints live.", "blue"],
        ["Cloud Arena", "Stream your session in 4K to mobile and browser instantly.", "purple"],
        ["Squad Voice", "Spatial chat with noise filtering and tactical channel presets.", "orange"],
      ],
    },
    gamepass: {
      panelTitle: "Game Pass Picks",
      hero: {
        title: "RTECH Game Pass Spotlight",
        copy: "Discover day-one releases and exclusive drops curated for your profile.",
      },
      items: ["Zero Gravity Raiders", "Metro Shadowline", "Quantum Derby Ultimate", "Nebula Kart Rush"],
      tiles: [
        ["Ultimate Plan", "500+ rotating titles with cloud support.", "green"],
        ["New This Week", "12 new games added for instant install.", "blue"],
        ["Rewards", "Earn points for every challenge completed.", "purple"],
        ["Download Queue", "Optimize install order for play-first titles.", "orange"],
      ],
    },
    library: {
      panelTitle: "Installed Library",
      hero: {
        title: "Your Installed Collection",
        copy: "Organize, pin favorites, and launch directly from your customized library.",
      },
      items: ["Eclipse Protocol", "Apex Sector", "Neo Rally Infinite", "Skyline Frontline", "Raiders of Nova"],
      tiles: [
        ["Pinned", "Keep top 10 games in instant reach.", "green"],
        ["Storage", "423 GB available on RTECH SSD.", "blue"],
        ["Recently Played", "Resume where you left off instantly.", "purple"],
        ["Achievements", "1,926 total score this season.", "orange"],
      ],
    },
    store: {
      panelTitle: "Store Deals",
      hero: {
        title: "RTECH Store Live Deals",
        copy: "Limited bundles, expansion passes, and seasonal cosmetics now available.",
      },
      items: ["Eclipse Battle Pass -25%", "Cloud Arena Expansion -40%", "RTECH Pro Controller Skin Pack", "Nebula Coins x5000"],
      tiles: [
        ["Daily Deals", "Four featured discounts refresh every 24h.", "green"],
        ["Wishlist", "Track price drops automatically.", "blue"],
        ["Bundles", "Cross-game packs with bonus currency.", "purple"],
        ["Secure Checkout", "Fast one-click RTECH pay.", "orange"],
      ],
    },
    friends: {
      panelTitle: "Friends Online",
      hero: {
        title: "Squad & Social Hub",
        copy: "Invite teammates, join voice channels, and track squad activity in real time.",
      },
      items: ["ALPHAWOLF — In Eclipse Protocol", "NOVAQUEEN — In lobby", "BYTEHUNTER — Streaming now", "SKYTRON — Looking for squad"],
      tiles: [
        ["Party Status", "Launch instant co-op sessions.", "green"],
        ["Voice Rooms", "Private and public tactical channels.", "blue"],
        ["Presence", "See current game and activity cards.", "purple"],
        ["Invites", "Send batch invites to your crew.", "orange"],
      ],
    },
    settings: {
      panelTitle: "System Settings",
      hero: {
        title: "RQBBOX System Controls",
        copy: "Tune visuals, audio, controller profiles, and account preferences.",
      },
      items: ["Performance Mode: Enabled", "HDR Output: Auto", "Controller Preset: Tactical", "Notifications: Priority only"],
      tiles: [
        ["Display", "4K120 and VRR configuration.", "green"],
        ["Audio", "3D audio and output routing.", "blue"],
        ["Accessibility", "Subtitles, contrast, and remap options.", "purple"],
        ["Account", "RTECH ID, privacy and security.", "orange"],
      ],
    },
  },
};

let deferredInstallPrompt = null;
const installBtn = document.getElementById("installApp");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installBtn.classList.add("install-ready");
});

installBtn.addEventListener("click", async () => {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installBtn.classList.remove("install-ready");
    showToast("Install prompt opened.");
    return;
  }

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  if (isIOS) {
    showToast("iOS: Share → Add to Home Screen to install.");
  } else {
    showToast("Install unavailable here. Use HTTPS/GitHub Pages.");
  }
});

window.addEventListener("appinstalled", () => {
  installBtn.classList.remove("install-ready");
  showToast("RQBBOX installed successfully.");
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => toast.classList.remove("show"), 1800);
}

function renderList(items) {
  queueList.textContent = "";
  items.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    queueList.appendChild(li);
  });
}

function renderTiles(tiles) {
  tilesGrid.textContent = "";
  tiles.forEach(([title, copy, tone]) => {
    const tile = document.createElement("article");
    tile.className = `tile ${tone}`;
    tile.innerHTML = `<h3>${title}</h3><p>${copy}</p>`;
    tilesGrid.appendChild(tile);
  });
}

function setView(viewKey) {
  state.activeView = viewKey;
  const view = state.views[viewKey];
  panelTitle.textContent = view.panelTitle;
  featuredTitle.textContent = view.hero.title;
  featuredCopy.textContent = view.hero.copy;
  renderList(view.items);
  renderTiles(view.tiles);
}

function bootSequence() {
  let progress = 0;
  const timer = setInterval(() => {
    progress = Math.min(progress + 8, 100);
    bootProgress.style.width = `${progress}%`;
    bootStatus.textContent = `Boot sequence: ${progress}%`;
    if (progress === 100) {
      clearInterval(timer);
      bootStatus.textContent = "Boot complete: RQBBOX × RTECH online";
      setTimeout(() => {
        bootScreen.classList.add("hidden");
        authScreen.classList.remove("hidden");
      }, 350);
    }
  }, 180);
}

function switchAuthMode(mode) {
  const loginMode = mode === "login";
  loginTab.classList.toggle("active", loginMode);
  signupTab.classList.toggle("active", !loginMode);
  loginForm.classList.toggle("hidden", !loginMode);
  signupForm.classList.toggle("hidden", loginMode);
}

function enterApp(name) {
  state.user = name || "PLAYER";
  authScreen.classList.add("hidden");
  appShell.classList.remove("hidden");
  profileName.textContent = `${state.user} • RTECH ID`;
  dashboardTitle.textContent = `Welcome back, ${state.user}`;
  setView("home");
  showToast("RQBBOX × RTECH system ready.");
}

loginTab.addEventListener("click", () => switchAuthMode("login"));
signupTab.addEventListener("click", () => switchAuthMode("signup"));

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const user = email.split("@")[0] || "Player";
  enterApp(user.toUpperCase());
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const gamerTag = document.getElementById("signupUser").value.trim() || "New Player";
  enterApp(gamerTag.toUpperCase());
});

const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
function updateRuntimeStats() {
  fps.textContent = String(randomRange(95, 120));
  ping.textContent = `${randomRange(9, 28)}ms`;
  temp.textContent = `${randomRange(54, 67)}°C`;
}
updateRuntimeStats();
setInterval(updateRuntimeStats, 3500);

document.querySelectorAll("#mainNav .nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.view;
    document.querySelectorAll("#mainNav .nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    setView(view);
    showToast(`Opened ${button.textContent}`);
  });
});

document.getElementById("quickLaunch").addEventListener("click", () => {
  const game = state.views[state.activeView].items[0] || "your featured title";
  showToast(`Quick Launch: ${game}`);
});

document.getElementById("partyUp").addEventListener("click", () => {
  state.partyOnline = !state.partyOnline;
  showToast(state.partyOnline ? "Party is now OPEN to friends." : "Party has been closed.");
});

document.getElementById("playNow").addEventListener("click", () => {
  const active = featuredTitle.textContent;
  if (!state.queue.includes(active)) {
    state.queue.unshift(`${active} — launched now`);
  }
  showToast(`Now playing: ${active}`);
});

document.getElementById("watchTrailer").addEventListener("click", () => {
  document.getElementById("tilesGrid").scrollIntoView({ behavior: "smooth" });
  showToast("Trailer preview opened in media hub.");
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  appShell.classList.add("hidden");
  authScreen.classList.remove("hidden");
  loginForm.reset();
  signupForm.reset();
  switchAuthMode("login");
  showToast("Signed out from RTECH ID.");
});

bootSequence();
