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

const queueData = [
  "Eclipse Protocol — Campaign checkpoint 7/12",
  "Neon Drift X — Ranked finals waiting",
  "Rogue Planet Siege — Co-op squad invite",
  "Skyline Frontline — Cloud stream standby",
  "Apex Sector — Patch installed, ready to launch",
];

const queueList = document.getElementById("queueList");
const fps = document.getElementById("fps");
const ping = document.getElementById("ping");
const temp = document.getElementById("temp");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => toast.classList.remove("show"), 1800);
}

function bootSequence() {
  let progress = 0;
  const timer = setInterval(() => {
    progress = Math.min(progress + 10, 100);
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
  }, 160);
}

function switchAuthMode(mode) {
  const loginMode = mode === "login";
  loginTab.classList.toggle("active", loginMode);
  signupTab.classList.toggle("active", !loginMode);
  loginForm.classList.toggle("hidden", !loginMode);
  signupForm.classList.toggle("hidden", loginMode);
}

function enterApp(name) {
  authScreen.classList.add("hidden");
  appShell.classList.remove("hidden");
  profileName.textContent = `${name || "PLAYER"} • RTECH ID`;
  dashboardTitle.textContent = `Welcome back, ${name || "Player"}`;
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

queueData.forEach((game) => {
  const item = document.createElement("li");
  item.textContent = game;
  queueList.appendChild(item);
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
    document.querySelectorAll("#mainNav .nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    showToast(`Opening ${button.dataset.view}...`);
  });
});

document.getElementById("quickLaunch").addEventListener("click", () => showToast("Quick Launch engaged."));
document.getElementById("partyUp").addEventListener("click", () => showToast("Party beacon activated."));
document.getElementById("playNow").addEventListener("click", () => showToast("Launching Eclipse Protocol."));
document.getElementById("watchTrailer").addEventListener("click", () => {
  document.getElementById("tilesGrid").scrollIntoView({ behavior: "smooth" });
  showToast("Showing gameplay cards.");
});

bootSequence();
