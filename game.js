// 32 Cards Live Casino - JavaScript Engine with Pixi.js WebGL & Confirmed Balance Update

// ==========================================
// 1. CONSTANTS & SVG ASSETS
// ==========================================
const PLAYERS = [8, 9, 10, 11];

const SUITS = {
  spades: {
    name: "spades",
    color: "black",
    svg: '<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#0f172a" d="M12 2C9 7 4 10 4 14.5C4 17.5 6.5 20 9.5 20C10.5 20 11.4 19.6 12 19C12.6 19.6 13.5 20 14.5 20C17.5 20 20 17.5 20 14.5C20 10 15 7 12 2ZM13 18.5V22H11V18.5H13Z"/></svg>'
  },
  hearts: {
    name: "hearts",
    color: "red",
    svg: '<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#e11d48" d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"/></svg>'
  },
  clubs: {
    name: "clubs",
    color: "black",
    svg: '<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#0f172a" d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 7.6 7.9 8.6 8.6 9.3C6.6 9.1 5 10.7 5 12.7C5 14.9 6.8 16.7 9 16.7C10.1 16.7 11.1 16.3 11.8 15.6V22H12.2V15.6C12.9 16.3 13.9 16.7 15 16.7C17.2 16.7 19 14.9 19 12.7C19 10.7 17.4 9.1 15.4 9.3C16.1 8.6 16.5 7.6 16.5 6.5C16.5 4 14.5 2 12 2Z"/></svg>'
  },
  diamonds: {
    name: "diamonds",
    color: "red",
    svg: '<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="#e11d48" d="M12 2L3 12L12 22L21 12L12 2Z"/></svg>'
  }
};

const DECK = [
  { rank: "J", value: 3 },
  { rank: "Q", value: 4 },
  { rank: "K", value: 5 },
  { rank: "A", value: 6 },
  { rank: "7", value: 1 },
  { rank: "8", value: 2 },
  { rank: "9", value: 3 },
  { rank: "10", value: 4 }
];

// ==========================================
// 2. PIXI.JS WEBGL PARTICLE & LIGHTNING ENGINE
// ==========================================
const canvasContainer = document.getElementById("pixiCanvasContainer");
let pixiApp = null;
let lightningGraphics = null;

function initPixi() {
  if (typeof PIXI === "undefined") {
    console.warn("Pixi.js not loaded, skipping WebGL FX");
    return;
  }
  const rect = canvasContainer.getBoundingClientRect();
  pixiApp = new PIXI.Application({
    width: rect.width || 410,
    height: rect.height || 690,
    backgroundAlpha: 0,
    antialias: true
  });
  canvasContainer.appendChild(pixiApp.view);

  lightningGraphics = new PIXI.Graphics();
  pixiApp.stage.addChild(lightningGraphics);
}
window.addEventListener("DOMContentLoaded", initPixi);

function triggerPixiLightning(x1, y1, x2, y2) {
  if (!pixiApp || !lightningGraphics) return;
  sound.playLightning();

  let frames = 0;
  const anim = () => {
    lightningGraphics.clear();
    if (frames < 7) {
      const steps = 9;
      let currX = x1;
      let currY = y1;

      lightningGraphics.lineStyle(3, 0xfacc15, 0.95);
      lightningGraphics.moveTo(currX, currY);

      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const targetX = x1 + (x2 - x1) * t;
        const targetY = y1 + (y2 - y1) * t;
        const jitterX = (Math.random() - 0.5) * 32;
        const jitterY = (Math.random() - 0.5) * 16;
        currX = targetX + jitterX;
        currY = targetY + jitterY;
        lightningGraphics.lineTo(currX, currY);
      }
      lightningGraphics.lineTo(x2, y2);
      frames++;
      requestAnimationFrame(anim);
    } else {
      lightningGraphics.clear();
    }
  };
  requestAnimationFrame(anim);
}

function triggerPixiWinSparks(x, y) {
  if (!pixiApp) return;
  const particles = [];
  const colors = [0xfbbf24, 0xf59e0b, 0x38bdf8, 0x4ade80, 0xffffff];

  for (let i = 0; i < 35; i++) {
    const p = new PIXI.Graphics();
    const col = colors[Math.floor(Math.random() * colors.length)];
    p.beginFill(col);
    p.drawCircle(0, 0, Math.random() * 3.5 + 2);
    p.endFill();
    p.x = x;
    p.y = y;

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed - 2.5;
    p.alpha = 1;

    pixiApp.stage.addChild(p);
    particles.push(p);
  }

  const sparkTicker = () => {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // Gravity
      p.alpha -= 0.025;
      if (p.alpha <= 0) {
        pixiApp.stage.removeChild(p);
        p.destroy();
        particles.splice(i, 1);
      }
    }
    if (particles.length === 0) {
      pixiApp.ticker.remove(sparkTicker);
    }
  };
  pixiApp.ticker.add(sparkTicker);
}

// ==========================================
// 3. SYNTHETIC AUDIO ENGINE
// ==========================================
class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }
  playChip() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(250, this.ctx.currentTime + 0.08);
    g.gain.setValueAtTime(0.3, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }
  playSlide() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const bSize = this.ctx.sampleRate * 0.15;
    const buf = this.ctx.createBuffer(1, bSize, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bSize; i++) d[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const flt = this.ctx.createBiquadFilter();
    flt.type = "bandpass";
    flt.frequency.setValueAtTime(1400, this.ctx.currentTime);
    flt.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.15);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.22, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    src.connect(flt);
    flt.connect(g);
    g.connect(this.ctx.destination);
    src.start();
  }
  playFlip() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(650, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);
    g.gain.setValueAtTime(0.4, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }
  playLightning() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.28);
    g.gain.setValueAtTime(0.35, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.28);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.29);
  }
  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);
      g.gain.setValueAtTime(0.3, this.ctx.currentTime + idx * 0.09);
      g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.09 + 0.3);
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + idx * 0.09);
      osc.stop(this.ctx.currentTime + idx * 0.09 + 0.32);
    });
  }
  playTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    g.gain.setValueAtTime(0.1, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.03);
    osc.connect(g);
    g.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.03);
  }
}

const sound = new SoundManager();

document.getElementById("soundBtn").addEventListener("click", function() {
  sound.enabled = !sound.enabled;
  this.textContent = sound.enabled ? "🔊" : "🔇";
});

// ==========================================
// 4. GAME STATE & VERTICAL CHIP POPUP LOGIC
// ==========================================
let balance = 9981;
let totalStake = 0;
let selectedChip = 1;
let bets = { 8: 0, 9: 0, 10: 0, 11: 0 };
let currentRoundBets = { 8: 0, 9: 0, 10: 0, 11: 0 }; // Track bets placed during round for guaranteed payout!
let betHistory = []; // Stack for undo functionality
let isBettingOpen = false;
let roundId = 83921;
let activeMultiplier = { player: 11, value: "1.3x" };
let lastMenuInteractionTime = 0;

// DOM Elements
const balanceText = document.getElementById("balanceText");
const stakeText = document.getElementById("stakeText");
const toastCapsule = document.getElementById("toastCapsule");
const toastMsg = document.getElementById("toastMsg");
const timerLabel = document.getElementById("timerLabel");
const timerCount = document.getElementById("timerCount");
const newRoundBanner = document.getElementById("newRoundBanner");
const statsGrid = document.getElementById("statsGrid");
const chipsMenu = document.getElementById("chipsMenu");
const activeChipNum = document.getElementById("activeChipNum");
const mainActiveChip = document.getElementById("mainActiveChip");

// Toggle the Vertical Chips Stack on clicking the active chip
function toggleChipsMenu(e) {
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  lastMenuInteractionTime = Date.now();
  chipsMenu.classList.toggle("open");
  sound.playChip();
}

const ALL_CHIP_VALUES = [10, 5, 3, 2, 1, 0.5];

// Dynamically render the capsule dock with all chips except the selected one
function renderChipsMenu() {
  if (!chipsMenu) return;
  const remainingChips = ALL_CHIP_VALUES.filter(v => v !== selectedChip);

  chipsMenu.innerHTML = remainingChips.map(val => `
    <div class="pop-chip chip-val-${val === 0.5 ? '05' : val}" data-val="${val}">
      ${val}
    </div>
  `).join('');

  chipsMenu.querySelectorAll('.pop-chip').forEach(chipEl => {
    const onSelect = (e) => {
      e.stopPropagation();
      e.preventDefault();
      lastMenuInteractionTime = Date.now();
      const val = parseFloat(chipEl.getAttribute('data-val'));
      if (!isNaN(val)) {
        selectChipFromMenu(val);
      }
    };
    chipEl.addEventListener('click', onSelect);
    chipEl.addEventListener('touchend', onSelect);
    chipEl.addEventListener('pointerup', onSelect);
  });
}

// Select chip from vertical menu
function selectChipFromMenu(val) {
  lastMenuInteractionTime = Date.now();
  selectedChip = val;
  activeChipNum.textContent = val === 0.5 ? "0.5" : val;

  // Update styling of main active chip based on value
  if (val === 10) mainActiveChip.style.background = "radial-gradient(circle, #2563eb, #1e3a8a)";
  else if (val === 5) mainActiveChip.style.background = "radial-gradient(circle, #db2777, #831843)";
  else if (val === 3) mainActiveChip.style.background = "radial-gradient(circle, #059669, #064e3b)";
  else if (val === 2) mainActiveChip.style.background = "radial-gradient(circle, #7c3aed, #4c1d95)";
  else if (val === 0.5) mainActiveChip.style.background = "radial-gradient(circle, #ea580c, #9a3412)";
  else mainActiveChip.style.background = "radial-gradient(circle, #dc2626, #991b1b)";

  chipsMenu.classList.remove("open");
  sound.playChip();
  renderChipsMenu();
}

// Prevent click inside chipsMenu from falling through to betting boxes below
chipsMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  lastMenuInteractionTime = Date.now();
});
chipsMenu.addEventListener("pointerdown", (e) => {
  e.stopPropagation();
  lastMenuInteractionTime = Date.now();
});
chipsMenu.addEventListener("touchstart", (e) => {
  e.stopPropagation();
  lastMenuInteractionTime = Date.now();
});

// Close chips menu if user clicks outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".chip-stack-wrapper")) {
    if (chipsMenu.classList.contains("open")) {
      lastMenuInteractionTime = Date.now();
      chipsMenu.classList.remove("open");
    }
  }
});

// History Data
const historyRecords = [
  9, 11, 8, 10, 10, 11, 9, 10, 11, 9, 11,
  11, 9, 11, 10, 9, 10, 9, 11, 10, 9, 11,
  10, 10, 11, 11, 8, 8, 8, 8, 11, 11, 11,
  10, 10, 11, 11, 8, 8, 8, 8, 11, 10, 11,
  10, 9, 10, 9, 11, 11, 10, 11, 11, 9, 9
];

function renderStats() {
  statsGrid.innerHTML = "";
  const recent = historyRecords.slice(-55);
  recent.forEach(winner => {
    const tile = document.createElement("div");
    tile.className = `hist-tile t-${winner}`;
    tile.textContent = winner;
    statsGrid.appendChild(tile);
  });

  const total = recent.length;
  PLAYERS.forEach(p => {
    const count = recent.filter(x => x === p).length;
    const pct = Math.round((count / total) * 100);
    const bar = document.getElementById(`bar-${p}`);
    const val = document.getElementById(`pct-${p}`);
    if (bar) bar.style.width = `${pct}%`;
    if (val) val.textContent = `${pct}%`;
  });
}
renderStats();
renderChipsMenu();

// ==========================================
// 5. BETTING & ACTION BUTTONS (↶ Undo, ✕ Clear, x2 Double)
// ==========================================
function handlePlaceBet(player) {
  if (Date.now() - lastMenuInteractionTime < 450) {
    return; // Block ghost clicks from chip selection or menu toggle!
  }
  if (!isBettingOpen) {
    showToast("WAIT FOR NEXT ROUND", "red", 1200);
    return;
  }
  if (balance < selectedChip) {
    showToast("INSUFFICIENT BALANCE", "red", 1200);
    return;
  }

  balance -= selectedChip;
  bets[player] += selectedChip;
  currentRoundBets[player] += selectedChip;
  totalStake += selectedChip;
  betHistory.push({ player, amount: selectedChip });

  balanceText.textContent = balance.toLocaleString();
  stakeText.textContent = totalStake.toLocaleString();

  const socket = document.getElementById(`chips-${player}`);
  socket.innerHTML = `<div class="chip-badge" style="background: radial-gradient(circle, #f59e0b, #b45309); color: #000;">${bets[player]}</div>`;

  sound.playChip();
}

// ↶ Undo Last Bet
function handleUndo() {
  if (!isBettingOpen || betHistory.length === 0) return;
  const last = betHistory.pop();
  bets[last.player] -= last.amount;
  currentRoundBets[last.player] -= last.amount;
  balance += last.amount;
  totalStake -= last.amount;

  balanceText.textContent = balance.toLocaleString();
  stakeText.textContent = totalStake.toLocaleString();

  const socket = document.getElementById(`chips-${last.player}`);
  if (bets[last.player] > 0) {
    socket.innerHTML = `<div class="chip-badge" style="background: radial-gradient(circle, #f59e0b, #b45309); color: #000;">${bets[last.player]}</div>`;
  } else {
    socket.innerHTML = "";
  }
  sound.playChip();
}

// ✕ Clear / Cancel All Bets
function handleClear() {
  if (!isBettingOpen || totalStake === 0) return;
  balance += totalStake;
  totalStake = 0;
  PLAYERS.forEach(p => {
    bets[p] = 0;
    currentRoundBets[p] = 0;
    document.getElementById(`chips-${p}`).innerHTML = "";
  });
  betHistory = [];

  balanceText.textContent = balance.toLocaleString();
  stakeText.textContent = "0";
  sound.playChip();
}

// x2 Double Bets
function handleDouble() {
  if (!isBettingOpen || totalStake === 0) return;
  if (balance < totalStake) {
    showToast("INSUFFICIENT BALANCE", "red", 1200);
    return;
  }

  balance -= totalStake;
  PLAYERS.forEach(p => {
    if (bets[p] > 0) {
      bets[p] *= 2;
      currentRoundBets[p] *= 2;
      const socket = document.getElementById(`chips-${p}`);
      socket.innerHTML = `<div class="chip-badge" style="background: radial-gradient(circle, #f59e0b, #b45309); color: #000;">${bets[p]}</div>`;
    }
  });

  totalStake *= 2;
  balanceText.textContent = balance.toLocaleString();
  stakeText.textContent = totalStake.toLocaleString();
  sound.playChip();
}

// ==========================================
// 6. FLOATING TOAST NOTIFICATIONS
// ==========================================
let toastTimer = null;
function showToast(msg, type = "red", duration = 2000) {
  clearTimeout(toastTimer);
  toastMsg.textContent = msg;
  toastCapsule.className = "toast-capsule active";
  if (type === "gold") toastCapsule.classList.add("gold");

  toastTimer = setTimeout(() => {
    toastCapsule.classList.remove("active", "gold");
  }, duration);
}

// ==========================================
// 7. CARD DEALING & 3D FLIP ANIMATION
// ==========================================
function dealCard(player, cardData, delay = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      const slotEl = document.getElementById(`slot-${player}`);
      const slotRect = slotEl.getBoundingClientRect();
      const arenaRect = canvasContainer.getBoundingClientRect();

      // Start position from Shoe Machine in table surface
      const shoeEl = document.getElementById("shoeDevice");
      let startX = arenaRect.left + arenaRect.width * 0.76;
      let startY = arenaRect.top + 210;

      if (shoeEl) {
        const shoeRect = shoeEl.getBoundingClientRect();
        startX = shoeRect.left + 12;
        startY = shoeRect.top + 8;
      }
      const miniBox = document.getElementById(`mini-${player}`);
      if (miniBox) {
        miniBox.classList.add("dealing-active");
        miniBox.querySelector(".box-sub").textContent = cardData.rank;
      }

      const flyNode = document.createElement("div");
      flyNode.className = "flying-card-node";
      flyNode.style.left = `${startX}px`;
      flyNode.style.top = `${startY}px`;
      flyNode.style.transform = "rotate(-10deg) scale(0.4)";
      document.body.appendChild(flyNode);

      sound.playSlide();

      requestAnimationFrame(() => {
        flyNode.style.left = `${slotRect.left}px`;
        flyNode.style.top = `${slotRect.top}px`;
        flyNode.style.width = `${slotRect.width}px`;
        flyNode.style.height = `${slotRect.height}px`;
        flyNode.style.transform = "rotate(0deg) scale(1)";
      });

      setTimeout(() => {
        flyNode.remove();

        const card = document.createElement("div");
        card.className = "playing-card";

        const suit = cardData.suit;
        const isRed = suit.color === "red";

        card.innerHTML = `
          <div class="card-side card-back"></div>
          <div class="card-side card-front ${isRed ? "red-suit" : ""}">
            <div class="index-corner-top">
              <span class="index-val">${cardData.rank}</span>
              <div class="mini-suit-icon">${suit.svg}</div>
            </div>
            <div class="center-suit-art">
              ${suit.svg}
            </div>
            <div class="index-corner-bottom">
              <span class="index-val">${cardData.rank}</span>
              <div class="mini-suit-icon">${suit.svg}</div>
            </div>
          </div>
        `;

        slotEl.innerHTML = "";
        slotEl.appendChild(card);

        // 3D Flip
        setTimeout(() => {
          card.classList.add("flipped");
          sound.playFlip();

          const totalPoints = player + cardData.value;
          const ptsEl = document.getElementById(`pts-${player}`);
          ptsEl.textContent = totalPoints;
          ptsEl.classList.add("show");

          resolve({ player, totalPoints });
        }, 260);

      }, 440);

    }, delay);
  });
}

// ==========================================
// 8. MAIN ROUND FLOW LOOP
// ==========================================
function dealCardFromDealer(player, cardData, startPos, delay = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      const slotEl = document.getElementById(`slot-${player}`);
      const slotRect = slotEl.getBoundingClientRect();

      const flyNode = document.createElement("div");
      flyNode.className = "flying-card-node";
      flyNode.style.left = `${startPos.x}px`;
      flyNode.style.top = `${startPos.y}px`;
      flyNode.style.transform = "rotate(-10deg) scale(0.35)";
      document.body.appendChild(flyNode);

      sound.playSlide();

      requestAnimationFrame(() => {
        flyNode.style.left = `${slotRect.left}px`;
        flyNode.style.top = `${slotRect.top}px`;
        flyNode.style.width = `${slotRect.width}px`;
        flyNode.style.height = `${slotRect.height}px`;
        flyNode.style.transform = "rotate(0deg) scale(1)";
      });

      setTimeout(() => {
        flyNode.remove();

        const card = document.createElement("div");
        card.className = "playing-card";

        const suit = cardData.suit;
        const isRed = suit.color === "red";

        card.innerHTML = `
          <div class="card-side card-back"></div>
          <div class="card-side card-front ${isRed ? "red-suit" : ""}">
            <div class="index-corner-top">
              <span class="index-val">${cardData.rank}</span>
              <div class="mini-suit-icon">${suit.svg}</div>
            </div>
            <div class="center-suit-art">
              ${suit.svg}
            </div>
            <div class="index-corner-bottom">
              <span class="index-val">${cardData.rank}</span>
              <div class="mini-suit-icon">${suit.svg}</div>
            </div>
          </div>
        `;

        slotEl.innerHTML = "";
        slotEl.appendChild(card);

        // 3D Flip
        setTimeout(() => {
          card.classList.add("flipped");
          sound.playFlip();

          const totalPoints = player + cardData.value;
          const ptsEl = document.getElementById(`pts-${player}`);
          ptsEl.textContent = totalPoints;
          ptsEl.classList.add("show");

          resolve({ player, totalPoints });
        }, 260);

      }, 480);

    }, delay);
  });
}

async function runRound() {
  roundId++;
  const roundCodeEl = document.getElementById("roundCodeText");
  if (roundCodeEl) roundCodeEl.textContent = `Round ID: TTC-${Math.random().toString(36).substring(2, 8)}`;

  const dealerVid = document.getElementById("dealerVideo");

  PLAYERS.forEach(p => {
    document.getElementById(`slot-${p}`).innerHTML = "";
    const pts = document.getElementById(`pts-${p}`);
    pts.textContent = "--";
    pts.classList.remove("show");
    document.getElementById(`box-${p}`).classList.remove("winner");
    document.getElementById(`chips-${p}`).innerHTML = "";
    document.getElementById(`mult-${p}`).classList.remove("active");
  });

  bets = { 8: 0, 9: 0, 10: 0, 11: 0 };
  currentRoundBets = { 8: 0, 9: 0, 10: 0, 11: 0 };
  betHistory = [];
  totalStake = 0;
  stakeText.textContent = "0";

  // Step 1: New Round 3D Banner & Dealer Welcome
  newRoundBanner.classList.add("show");
  setTimeout(() => newRoundBanner.classList.remove("show"), 1500);

  // Sync Video: Dealer announces "Place your bets" (Time 26s in video)
  if (dealerVid) {
    dealerVid.currentTime = 26.2;
    dealerVid.play().catch(() => {});
  }

  // Step 2: Open Betting
  isBettingOpen = true;
  timerLabel.textContent = "Place bet now";
  let countdown = 12;
  timerCount.textContent = countdown;

  // Step 3: Trigger Multiplier Lightning with Pixi.js
  setTimeout(() => {
    const luckyPlayer = PLAYERS[Math.floor(Math.random() * PLAYERS.length)];
    const multipliers = ["1.3x", "2.7x", "4.5x", "5.7x", "11x"];
    const multVal = multipliers[Math.floor(Math.random() * multipliers.length)];
    activeMultiplier = { player: luckyPlayer, value: multVal };

    const multBadge = document.getElementById(`mult-${luckyPlayer}`);
    multBadge.textContent = `⚡ ${multVal}`;
    multBadge.classList.add("active");

    const boxRect = document.getElementById(`box-${luckyPlayer}`).getBoundingClientRect();
    const arenaRect = canvasContainer.getBoundingClientRect();

    triggerPixiLightning(
      arenaRect.width / 2,
      70,
      boxRect.left + boxRect.width / 2 - arenaRect.left,
      boxRect.top + 20 - arenaRect.top
    );
  }, 2200);

  // Countdown timer
  await new Promise(resolve => {
    const timer = setInterval(() => {
      countdown--;
      timerCount.textContent = countdown;
      sound.playTick();

      if (countdown === 3) {
        showToast("Time is running out", "red", 1500);
      }

      if (countdown <= 0) {
        clearInterval(timer);
        resolve();
      }
    }, 1000);
  });

  // Step 4: Lock Bets & Sync Dealer to "No more bets" and Dealing Shoes
  isBettingOpen = false;
  timerLabel.textContent = "Dealing Cards...";
  timerCount.textContent = "--";
  chipsMenu.classList.remove("open");
  showToast("BET LOCKED!", "red", 1200);

  // Video Jump to 00:01.8 - Dealer takes cards from shoe and distributes with her hands!
  if (dealerVid) {
    dealerVid.currentTime = 1.9;
    dealerVid.play().catch(() => {});
  }
  await new Promise(r => setTimeout(r, 1100));

  // Step 5: Deal 4 Cards Sequentially as Dealer Hands Move
  const suitsList = [SUITS.spades, SUITS.hearts, SUITS.clubs, SUITS.diamonds];
  const roundResults = [];

  const arenaRect = canvasContainer.getBoundingClientRect();
  // Physical start coordinates exactly from dealer girl hands & shoe on the table!
  const dealerHands = [
    { x: arenaRect.left + arenaRect.width * 0.42, y: arenaRect.top + 215 }, // Hand to Card 8
    { x: arenaRect.left + arenaRect.width * 0.48, y: arenaRect.top + 215 }, // Hand to Card 9
    { x: arenaRect.left + arenaRect.width * 0.54, y: arenaRect.top + 215 }, // Hand to Card 10
    { x: arenaRect.left + arenaRect.width * 0.60, y: arenaRect.top + 215 }  // Hand to Card 11
  ];

  // Distribute one by one exactly as dealer gestures
  for (let i = 0; i < PLAYERS.length; i++) {
    const player = PLAYERS[i];
    const cardData = DECK[Math.floor(Math.random() * DECK.length)];
    const cardSuit = suitsList[Math.floor(Math.random() * suitsList.length)];
    const startCoord = dealerHands[i];

    const res = await dealCardFromDealer(player, { rank: cardData.rank, value: cardData.value, suit: cardSuit }, startCoord, 0);
    roundResults.push(res);
    await new Promise(r => setTimeout(r, 450)); // Realistic dealing pause per card
  }

  // Step 6: Evaluate Winner
  await new Promise(r => setTimeout(r, 600));

  let highestScore = -1;
  let winningPlayer = 8;

  roundResults.forEach(r => {
    if (r.totalPoints > highestScore) {
      highestScore = r.totalPoints;
      winningPlayer = r.player;
    }
  });

  const winningBox = document.getElementById(`box-${winningPlayer}`);
  winningBox.classList.add("winner");

  let odds = 1;
  if (winningPlayer === 8) odds = 11;
  if (winningPlayer === 9) odds = 4.5;
  if (winningPlayer === 10) odds = 2.2;
  if (winningPlayer === 11) odds = 1.0;

  if (activeMultiplier.player === winningPlayer) {
    odds = parseFloat(activeMultiplier.value) || odds;
  }

  sound.playWin();

  // Step 7: Guaranteed Coin Payout & User Balance Update!
  const betPlacedOnWinner = currentRoundBets[winningPlayer] || bets[winningPlayer] || 0;
  if (betPlacedOnWinner > 0) {
    const totalWinAmount = Math.round(betPlacedOnWinner * odds);
    balance += totalWinAmount;
    balanceText.textContent = balance.toLocaleString();
    showToast(`YOU WON ${totalWinAmount.toLocaleString()} COINS! (PLAYER ${winningPlayer})`, "gold", 4000);
  } else {
    showToast(`PLAYER ${winningPlayer} WINS! (${highestScore} PTS)`, "gold", 3500);
  }

  // Trigger Pixi.js Confetti Particles
  const winBoxRect = winningBox.getBoundingClientRect();
  triggerPixiWinSparks(
    winBoxRect.left + winBoxRect.width / 2 - arenaRect.left,
    winBoxRect.top + winBoxRect.height / 2 - arenaRect.top
  );

  historyRecords.push(winningPlayer);
  renderStats();

  setTimeout(runRound, 4800);
}