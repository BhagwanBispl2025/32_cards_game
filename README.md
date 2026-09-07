# ?? 32 Cards Live Casino Game Animation (Web Demo)

This project is a high-performance **HTML5 Web & Mobile Animation Demo** recreating the exact game flow, card dealing physics, 3D flip effects, and lightning multipliers of the **KingMidas 32 Cards Live Game**.

---

## ?? How to Run (Directly in Browser)

1. Open the folder: `Downloads\32_cards_game`
2. **Double-click `index.html`** or right-click and open with **Google Chrome / Microsoft Edge / Brave**.
3. The game starts automatically with sound effects, card dealing, 3D flips, betting chips, and lightning multipliers!

---

## ? Features & Animations Implemented

1. **Card Dealing Trajectory Animation:**
   - Cards physically emerge from the Dealer Shoe machine in the top right.
   - Smoothly slide down with dynamic scaling and rotation directly into each player's slot (Player 8, 9, 10, 11).

2. **3D Card Flip Effect:**
   - Realistic 3D perspective flip (`rotateY(180deg)` with `preserve-3d` and backface culling).
   - Reveals rank, suit (?, ?, ?, ?), and dynamic total points calculation.

3. **Lightning Multiplier (5.7x Effect):**
   - Canvas-based procedural lightning bolt strikes random player boxes during betting.
   - Glowing gold multiplier badge with animated pulse.

4. **Winning Celebration & Glow:**
   - Winner detection based on 32 Cards rules (Base points + Card value).
   - Winning player box pulses with golden neon glow.
   - "Player X Wins!" floating banner with victory sound.

5. **Synthesized Audio (Web Audio API):**
   - Pure procedural sound effects generated via browser audio oscillators:
     - Card slide whoosh
     - Card flip snap
     - Lightning crackle
     - Chip placement clink
     - Countdown tick
     - Victory chime chord
   - **Zero external MP3 files needed — works 100% offline!**

6. **Interactive Betting & Chips:**
   - Place bets with chips (10, 50, 100, 500, 1,000).
   - Real-time balance and stake tracking with automated payout calculation.
   - Recent winning rounds history scorecard.

---

## ??? Technology Stack

* **HTML5 Canvas & DOM:** High-speed 60fps UI rendering.
* **CSS3 3D Transforms:** Perspective projection and hardware-accelerated animations.
* **Modern Vanilla JavaScript:** Async/await round lifecycle management.
* **Web Audio API:** Real-time sound synthesis.
