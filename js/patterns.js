// ─── All 20 patterns ───────────────────────────────────────────────
const GROUPS = [
  {
    label: '1. Basic ascending',
    patterns: [
      { name: 'P – I – M – A', seq: ['p','i','m','a'], tip: 'Natural string order G→C→E→A. Your foundation. Say "p-i-m-a" aloud with each pluck.' },
      { name: 'P – I – A – M', seq: ['p','i','a','m'], tip: 'Ring jumps before middle. Trains ring finger to move independently.' },
      { name: 'P – M – I – A', seq: ['p','m','i','a'], tip: 'Middle before index. Forces middle finger to lead — important for independence.' },
      { name: 'P – M – A – I', seq: ['p','m','a','i'], tip: 'Middle → ring → index. Index comes last. Builds reverse independence.' },
    ]
  },
  {
    label: '2. Basic descending',
    patterns: [
      { name: 'A – M – I – P', seq: ['a','m','i','p'], tip: 'Full reverse of P-I-M-A. A→E→C→G. Ring leads, thumb ends.' },
      { name: 'A – I – M – P', seq: ['a','i','m','p'], tip: 'Ring skips to index, then middle, then thumb. Trains ring-to-index jump.' },
      { name: 'M – I – P – A', seq: ['m','i','p','a'], tip: 'Middle leads, thumb in middle, ring ends. Great for independence.' },
      { name: 'I – M – P – A', seq: ['i','m','p','a'], tip: 'Index leads, thumb in 3rd position. Trains thumb to wait and enter late.' },
    ]
  },
  {
    label: '3. Arpeggio patterns',
    patterns: [
      { name: 'P – I – M – I', seq: ['p','i','m','i'], tip: 'Thumb bass then index-middle-index. Index repeats — very common in real songs.' },
      { name: 'P – M – I – M', seq: ['p','m','i','m'], tip: 'Middle repeats around index. Creates a rocking feel. Used in ballads.' },
      { name: 'P – I – M – A', seq: ['p','i','m','a'], tip: 'Classic ascending arpeggio. Most used fingerpicking pattern worldwide.' },
      { name: 'P – A – M – I', seq: ['p','a','m','i'], tip: 'Thumb then descend fingers A→E→C. Reverse arpeggio — harp-like sound.' },
      { name: 'P – I – A – M', seq: ['p','i','a','m'], tip: 'Ring jumps over middle on beat 3. Trains ring independence in arpeggio context.' },
    ]
  },
  {
    label: '4. Alternating patterns',
    patterns: [
      { name: 'P – I – P – I', seq: ['p','i','p','i'], tip: 'Thumb and index alternate. Like a heartbeat. Great for thumb-index coordination.' },
      { name: 'P – M – P – M', seq: ['p','m','p','m'], tip: 'Thumb and middle alternate. Builds middle finger strength and timing.' },
      { name: 'I – M – I – M', seq: ['i','m','i','m'], tip: 'Index and middle only — no thumb. Classic tremolo prep. Keep perfectly even.' },
      { name: 'M – A – M – A', seq: ['m','a','m','a'], tip: 'Middle and ring alternate. Hardest pair — ring is weakest finger. Go slow.' },
    ]
  },
  {
    label: '5. Classical full roll',
    patterns: [
      { name: 'P – I – M – A – M – I', seq: ['p','i','m','a','m','i'], tip: 'Up and back down. 6-beat wave. The most musical-sounding beginner pattern.' },
      { name: 'P – M – I – A – I – M', seq: ['p','m','i','a','i','m'], tip: 'Middle leads the ascent. Reverse pairs on the way back. Great for coordination.' },
      { name: 'P – I – M – I – A – M', seq: ['p','i','m','i','a','m'], tip: 'Index repeats on beat 4 before ring. Syncopated feel — trains timing awareness.' },
    ]
  }
];

// ─── Helpers ───────────────────────────────────────────────────────
const FCLS  = { p:'fp', i:'fi', m:'fm', a:'fa' };
const FSTR  = { p:'G',  i:'C',  m:'E',  a:'A'  };
const DCOL  = { p:'#639922', i:'#378ADD', m:'#7F77DD', a:'#D85A30' };
const SPDS  = [null, 950, 680, 460, 300, 170];
const SLBLS = ['','slow','medium','fast','very fast','max'];

let p_cur = null, p_playing = false, p_timer = null;
let p_beat = 0, p_reps = 0, p_spd = 2, p_done = [];
let allPats = [];

// ─── Build list ────────────────────────────────────────────────────
function buildPatList() {
  const el = document.getElementById('pat-list');
  el.innerHTML = '';
  let idx = 0;
  GROUPS.forEach(g => {
    const gl = document.createElement('div');
    gl.className = 'grp-label';
    gl.textContent = g.label;
    el.appendChild(gl);
    g.patterns.forEach(p => {
      const i = idx;
      const row = document.createElement('div');
      const isDone = p_done.includes(i);
      const isCur  = p_cur === i;
      row.className = 'pat-row' + (isCur ? ' active' : isDone ? ' done' : '');
      row.id = 'pr-' + i;
      row.onclick = () => selectPat(i);
      row.innerHTML = `
        <div class="pat-name">${p.name}</div>
        <div class="pat-badges">
          ${p.seq.map(f => `<div class="mini-f ${FCLS[f]}">${f}</div>`).join('')}
          ${isDone ? '<span style="margin-left:4px;color:#1D9E75;font-size:15px">✓</span>' : ''}
        </div>`;
      el.appendChild(row);
      idx++;
    });
  });
  document.getElementById('done-n').textContent = p_done.length;
  document.getElementById('total-bar').style.width = (p_done.length / 20 * 100) + '%';
}

function selectPat(i) {
  stopPlay1();
  p_cur = i; p_beat = 0; p_reps = 0;
  const p = allPats[i];
  document.getElementById('disp-group').textContent = p.group;
  document.getElementById('disp-name').textContent  = p.name;
  document.getElementById('disp-sub').textContent   = 'Pattern ' + (i + 1) + ' of 20';
  document.getElementById('disp-tip').textContent   = p.tip;
  renderBeats1(p.seq, -1);
  clearDots1();
  updateRep1();
  buildPatList();
  const row = document.getElementById('pr-' + i);
  if (row) row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function renderBeats1(seq, lit) {
  const row = document.getElementById('beat-row');
  row.innerHTML = '';
  seq.forEach((f, i) => {
    const d = document.createElement('div');
    d.className = 'beat ' + FCLS[f] + (i === lit ? ' on' : '');
    d.innerHTML = f + '<span class="sn">' + FSTR[f] + '</span>';
    row.appendChild(d);
  });
}

function clearDots1() {
  ['G','C','E','A'].forEach(s => {
    document.getElementById('dot-' + s).style.background = 'var(--border2)';
  });
}

function lightDot1(f) {
  clearDots1();
  document.getElementById('dot-' + FSTR[f]).style.background = DCOL[f];
}

// ─── Playback ──────────────────────────────────────────────────────
function togglePlay1() {
  if (p_cur === null) selectPat(0);
  p_playing ? stopPlay1() : startPlay1();
}

function startPlay1() {
  p_playing = true;
  document.getElementById('play-btn1').textContent = '⏸ Pause';
  tick1();
}

function stopPlay1() {
  p_playing = false;
  clearTimeout(p_timer);
  document.getElementById('play-btn1').textContent = '▶ Play';
  if (p_cur !== null) renderBeats1(allPats[p_cur].seq, -1);
  clearDots1();
  document.getElementById('mdot1').style.background = 'var(--border2)';
}

function tick1() {
  if (!p_playing) return;
  const seq = allPats[p_cur].seq;
  renderBeats1(seq, p_beat);
  lightDot1(seq[p_beat]);
  const md = document.getElementById('mdot1');
  md.style.background = p_beat % 2 === 0 ? '#378ADD' : '#1D9E75';
  setTimeout(() => md.style.background = 'var(--border2)', 85);
  p_beat++;
  if (p_beat >= seq.length) { p_beat = 0; p_reps++; updateRep1(); }
  p_timer = setTimeout(tick1, SPDS[p_spd]);
}

function updateRep1() {
  document.getElementById('rep-n1').textContent = p_reps;
  document.getElementById('rep-bar1').style.width = (Math.min(p_reps, 20) / 20 * 100) + '%';
}

function markDone1() {
  if (p_cur === null) return;
  stopPlay1();
  if (!p_done.includes(p_cur)) p_done.push(p_cur);
  p_reps = 0; p_beat = 0;
  updateRep1();
  buildPatList();
  const next = p_cur + 1 < 20 ? p_cur + 1 : p_cur;
  selectPat(next);
}

function resetAll1() {
  stopPlay1();
  p_done = []; p_reps = 0; p_beat = 0;
  buildPatList();
  if (p_cur !== null) selectPat(p_cur);
}

function setSpd1(v) {
  p_spd = parseInt(v);
  document.getElementById('spd1-lbl').textContent = SLBLS[p_spd];
  if (p_playing) { stopPlay1(); startPlay1(); }
}

// ─── Init ──────────────────────────────────────────────────────────
function initPatterns() {
  allPats = [];
  GROUPS.forEach(g => g.patterns.forEach(p => allPats.push({ ...p, group: g.label })));
  buildPatList();
  selectPat(0);
}
