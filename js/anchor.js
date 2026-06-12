// ─── Anchor Drill ──────────────────────────────────────────────────
const ANCHOR_PHASES = [
  {
    phase: 'Phase 1 of 5',
    title: 'Place — do not pluck yet',
    desc:  'Rest thumb near G, index on C, middle on E, ring on A. Hold 10 seconds. Feel where each finger sits. This is HOME.',
    seq:   ['G','C','E','A'], cycle: false
  },
  {
    phase: 'Phase 2 of 5',
    title: 'Single pluck — index only',
    desc:  'Pluck C string with INDEX. Immediately return to C. Other fingers stay frozen. Repeat 10 times slowly.',
    seq:   ['C'], cycle: false
  },
  {
    phase: 'Phase 3 of 5',
    title: 'Two-finger drill — i then m',
    desc:  'Pluck C (index) → E (middle) → C → E. Return each finger home after every pluck. Say "i… m… i… m…" aloud.',
    seq:   ['C','E'], cycle: true
  },
  {
    phase: 'Phase 4 of 5',
    title: 'Three-string drill — i m a',
    desc:  'Pluck C → E → A → E → C. Each finger drops straight down, returns immediately. No sideways reaching.',
    seq:   ['C','E','A','E','C'], cycle: true
  },
  {
    phase: 'Phase 5 of 5',
    title: 'Full p-i-m-a with return',
    desc:  'Pluck G(p) → C(i) → E(m) → A(a). After ring plucks A, reset ALL fingers back home before starting again.',
    seq:   ['G','C','E','A'], cycle: true
  }
];

const ANC_FMAP  = { G:'fp', C:'fi', E:'fm', A:'fa' };
const ANC_DCOL  = { G:'#639922', C:'#378ADD', E:'#7F77DD', A:'#D85A30' };
const ANC_SPDS  = [null, 1200, 800, 500, 280];
const ANC_SLBLS = ['','slow','medium','fast','very fast'];

let anc_phase = -1;
let anc_auto  = false;
let anc_timer = null;
let anc_spd   = 2;

function buildAnchorDots() {
  const el = document.getElementById('anchor-dots');
  el.innerHTML = '';
  ANCHOR_PHASES.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'step-dot';
    d.id = 'adot-' + i;
    el.appendChild(d);
  });
}

function updateAnchorDots() {
  ANCHOR_PHASES.forEach((_, i) => {
    const d = document.getElementById('adot-' + i);
    if (!d) return;
    d.className = 'step-dot' +
      (i < anc_phase ? ' done' : i === anc_phase ? ' current' : '');
  });
}

function clearStrBlocks() {
  ['G','C','E','A'].forEach(s => {
    const el = document.getElementById('sb-' + s);
    if (el) el.className = 'str-block ' + ANC_FMAP[s];
  });
  ['fh-p','fh-i','fh-m','fh-a'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('pulse');
  });
}

function lightStrBlock(str) {
  clearStrBlocks();
  const el = document.getElementById('sb-' + str);
  if (el) el.className = 'str-block ' + ANC_FMAP[str] + ' on';
  const fhMap = { G:'fh-p', C:'fh-i', E:'fh-m', A:'fh-a' };
  const fh = document.getElementById(fhMap[str]);
  if (fh) {
    fh.classList.add('pulse');
    setTimeout(() => fh.classList.remove('pulse'), 400);
  }
}

function anchorNext() {
  stopAncAuto();
  anc_phase = Math.min(anc_phase + 1, ANCHOR_PHASES.length - 1);
  showAncPhase(anc_phase);
  const btn = document.getElementById('anc-next-btn');
  if (anc_phase === ANCHOR_PHASES.length - 1) {
    btn.textContent = '↺ Restart';
    btn.onclick = anchorReset;
  } else {
    btn.textContent = 'Next →';
    btn.onclick = anchorNext;
  }
}

function showAncPhase(idx) {
  const p = ANCHOR_PHASES[idx];
  document.getElementById('anc-phase').textContent = p.phase;
  document.getElementById('anc-title').textContent = p.title;
  document.getElementById('anc-desc').textContent  = p.desc;
  updateAnchorDots();
  clearStrBlocks();
  if (p.cycle) {
    startAncSeqPreview(p.seq);
  } else {
    p.seq.forEach((s, i) => setTimeout(() => lightStrBlock(s), i * 350));
  }
}

function startAncSeqPreview(seq) {
  let i = 0;
  const speed = ANC_SPDS[anc_spd];
  function step() {
    lightStrBlock(seq[i % seq.length]);
    i++;
    anc_timer = setTimeout(step, speed);
  }
  step();
}

function anchorReset() {
  stopAncAuto();
  anc_phase = -1;
  clearStrBlocks();
  document.getElementById('anc-phase').textContent = 'Phase 1 of 5';
  document.getElementById('anc-title').textContent = 'Ready to start';
  document.getElementById('anc-desc').textContent  = 'Press Start drill to begin the anchor training sequence.';
  updateAnchorDots();
  const btn = document.getElementById('anc-next-btn');
  btn.textContent = 'Start drill';
  btn.onclick = anchorNext;
}

function toggleAncAuto() {
  anc_auto ? stopAncAuto() : startAncAuto();
}

function startAncAuto() {
  anc_auto = true;
  document.getElementById('anc-auto-btn').textContent = '⏸ Stop';
  const strs = ['G','C','E','A'];
  let pos = 0;
  const speed = ANC_SPDS[anc_spd];
  function tick() {
    lightStrBlock(strs[pos % 4]);
    pos++;
    anc_timer = setTimeout(tick, speed);
  }
  tick();
}

function stopAncAuto() {
  anc_auto = false;
  clearTimeout(anc_timer);
  document.getElementById('anc-auto-btn').textContent = '▶ Auto-cycle strings';
  clearStrBlocks();
}

function setAncSpd(v) {
  anc_spd = parseInt(v);
  document.getElementById('anc-spd-lbl').textContent = ANC_SLBLS[anc_spd];
  if (anc_auto) { stopAncAuto(); startAncAuto(); }
}

function initAnchor() {
  buildAnchorDots();
}
