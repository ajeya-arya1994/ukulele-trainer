# 🎵 Ukulele Fingerpicking Trainer

A clean, offline-ready web app to build fingerpicking muscle memory on ukulele — from total beginner to classical roll patterns.

**Live demo:** https://your-username.github.io/ukulele-trainer

---

## What's inside

### 1. 20 Pattern Trainer
All 20 essential PIMA fingerpicking patterns across 5 groups:
- Basic ascending (P-I-M-A, P-I-A-M, P-M-I-A, P-M-A-I)
- Basic descending (A-M-I-P, A-I-M-P, M-I-P-A, I-M-P-A)
- Arpeggio patterns (P-I-M-I, P-M-I-M, P-I-M-A, P-A-M-I, P-I-A-M)
- Alternating patterns (P-I-P-I, P-M-P-M, I-M-I-M, M-A-M-A)
- Classical full rolls (P-I-M-A-M-I, P-M-I-A-I-M, P-I-M-I-A-M)

Each pattern shows animated beat-by-beat finger cues with a built-in metronome. Track your reps (20 = move on) and overall progress across all 20 patterns.

### 2. Anchor Drill
Fix the #1 beginner problem — fingers swapping strings. A 5-phase guided drill that teaches each finger to "own" its string and return home after every pluck.

- Phase 1: Place fingers, feel home position
- Phase 2: Single finger isolation
- Phase 3: Two-finger alternation
- Phase 4: Three-string sequence
- Phase 5: Full p-i-m-a with mandatory return

### 3. Technique Guide
8 illustrated principle cards covering posture, plucking direction, nail vs flesh, speed rules, saying patterns aloud, daily practice structure, the return habit, and metronome use.

---

## How to use

### Option A — Open directly (no server needed)
```
git clone https://github.com/your-username/ukulele-trainer.git
cd ukulele-trainer
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

### Option B — GitHub Pages (free live website)
1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Click **Save** — your site goes live at `https://your-username.github.io/ukulele-trainer`

---

## File structure
```
ukulele-trainer/
├── index.html        ← main app (all three pages)
├── css/
│   └── style.css     ← all styling, light + dark mode
├── js/
│   ├── patterns.js   ← 20 pattern data + trainer logic
│   ├── anchor.js     ← anchor drill logic
│   └── app.js        ← navigation + init
└── README.md
```

---

## Features
- ✅ No dependencies — pure HTML, CSS, JavaScript
- ✅ Works offline — no internet needed after download
- ✅ Dark mode — follows your system preference automatically
- ✅ Mobile friendly — responsive layout
- ✅ Progress tracking — remembers which patterns you've completed (per session)
- ✅ Adjustable speed — 5 levels from slow to max
- ✅ Animated beat display — watch exactly which finger and string lights up

---

## PIMA finger assignment (ukulele)

| Finger | Symbol | String |
|--------|--------|--------|
| Thumb  | p      | G      |
| Index  | i      | C      |
| Middle | m      | E      |
| Ring   | a      | A      |

---

## Practice tips
- **Never practice faster than you can play cleanly** — speed comes from repetition, not effort
- **Do 20 clean reps** on each pattern before moving to the next
- **Say the finger names aloud** while practicing — "p… i… m… a…"
- **15 minutes daily** beats 2 hours once a week
- **Use a real metronome** alongside this app for timing discipline

---

## Contributing
Pull requests welcome. Ideas for improvement:
- Chord display alongside patterns
- Audio click track
- LocalStorage to persist progress across sessions
- Nepali language support 🇳🇵

---

## License
MIT — free to use, share, and modify.

---

*Built for ukulele beginners · Practice slow, play clean 🎵*
