// ─── Navigation ────────────────────────────────────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  const btns = document.querySelectorAll('.nav-btn');
  const map = { patterns: 0, anchor: 1, guide: 2 };
  if (btns[map[name]]) btns[map[name]].classList.add('active');

  // stop any playing when switching pages
  if (name !== 'patterns' && p_playing) stopPlay1();
  if (name !== 'anchor'   && anc_auto)  stopAncAuto();
}

// ─── Boot ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initPatterns();
  initAnchor();
});
