const DECK = [
  { id: 1, prompt: "Bauern fordern Subventionen für die Schweinezucht", left: { label: "Sie bekommen das Geld", consequence: "Bauern werden Fett und faul. Cholesterinrate steigt im Land." }, right: { label: "Sie bekommen kein Geld", consequence: "Bauern und Schweine streiken. Veganer Partei gewinnt nächste Wahl." }, meta: "Finanzen" },
  { id: 2, prompt: "Polizei fordert doppelt so viel Geld, um Bevölkerung besser zu kontrolieren", left: { label: "Finanzieren", consequence: "Land ist sicherer, aber niemand traut sich mehr aus dem Haus, aus Angst vor Polizeigewalt." }, right: { label: "Nicht Finanzieren", consequence: "Menschen trauen sich nachwievor raus, jedoch ist die Verbrechensrate noch hoch." }, meta: "Sicherheit" },
  { id: 3, prompt: "Wissenschaftler wollen Klone für die Arbeit züchten", left: { label: "Zustimmen", consequence: "Wirtschaft boomt, jedoch weiß keiner wer das Original ist." }, right: { label: "Ablehnen", consequence: "Forschung geht ins Ausland. Plötzlich doppelt so viele Nachbern." }, meta: "Forschung" },
  { id: 4, prompt: "Alle Socialmedia Nachrichten sollen Überwacht werden", left: { label: "Zulassen", consequence: "Bürger haben Angst ihre Meinung zu äußern. Zufriedenheit sinkt." }, right: { label: "Ablehnen", consequence: "Menschen können frei Chatten, Inhalte im Netz weiterhin ungefiltert." }, meta: "Soziales" },
  { id: 5, prompt: "Schüler fordern Kostenlosen Nahverkehr zur Schule", left: { label: "Finanzieren", consequence: "Budget sinkt, jedoch gehen mehr Schüler zur Schule, einer davon wird in Zukunft Krebs heilen." }, right: { label: "Ablehnen", consequence: "Weniger Schüler gehen zur Schule. Kriminalitätsrate steigt." }, meta: "Persönlich" },
  { id: 6, prompt: "Gesetztesvorschlag TikTok Verbot, um jugendliche zu schützen.", left: { label: "Zustimmen", consequence: "Durchschnitts IQ steigt, jedoch sind Tausende 12. Jährige demonstrieren" }, right: {label: "Ablehnen", consequence: "Durchschnitts IQ nimmt weiter ab, jedoch war Bevölkerung nie so glücklich."}, meta: "Bildung"},


];

const state = { index: 0, history: [] };

const $ = (sel, el=document) => el.querySelector(sel);
const create = (tag, cls) => { const n = document.createElement(tag); if (cls) n.className = cls; return n; };

function updateProgress() {
  const p = Math.round((state.index / DECK.length) * 100);
  $('#bar').style.width = p + '%';
}

function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._hide);
  t._hide = setTimeout(()=> t.classList.remove('show'), 1700);
}

function renderBoard() {
  const board = $('#board');
  board.innerHTML = '';

  // --- Endscreen: Konsequenzen ohne Nummerierung ---
  if (state.index >= DECK.length) {
    const wrap = create('div', 'card');
    wrap.style.display = 'grid';
    wrap.style.placeItems = 'center';
    const end = create('div', 'end');

    const items = state.history
      .map(h => `<li>${h.consequence}</li>`)
      .join('');

    end.innerHTML = `
      <h2>Fertig.</h2>
      <p>Deine Konsequenzen:</p>
      <ul style="text-align:left; max-width:560px; margin: 0 auto 16px; padding-left: 20px; list-style-type: none;">
        ${items}
      </ul>
      <button class="btn" onclick="restart()">Nochmal spielen</button>
    `;
    wrap.appendChild(end);
    board.appendChild(wrap);
    $('#bar').style.width = '100%';
    return;
  }

  const visible = [DECK[state.index], DECK[state.index+1], DECK[state.index+2]].filter(Boolean);
  visible.forEach((cardData, i) => {
    const card = create('article', 'card ' + (i===0?'above': i===1?'below':'far'));
    card.setAttribute('data-id', cardData.id);

    const badgeL = create('div', 'badge left'); badgeL.textContent = cardData.left.label;
    const badgeR = create('div', 'badge right'); badgeR.textContent = cardData.right.label;
    card.append(badgeL, badgeR);

    const meta = create('div', 'meta'); meta.textContent = cardData.meta || '';
    const prompt = create('div', 'prompt'); prompt.textContent = cardData.prompt;
    const spacer = create('div');
    const choices = create('div', 'choices');

    const btnLeft = create('button', 'btn btn-left'); btnLeft.textContent = `← ${cardData.left.label}`;
    const btnRight = create('button', 'btn btn-right'); btnRight.textContent = `${cardData.right.label} →`;
    btnLeft.addEventListener('click', () => decide('left', cardData));
    btnRight.addEventListener('click', () => decide('right', cardData));
    choices.append(btnLeft, btnRight);

    card.append(meta, prompt, spacer, choices);
    board.append(card);

    if (i === 0) enableSwipe(card, badgeL, badgeR, cardData);
  });

  updateProgress();
}

function enableSwipe(card, badgeL, badgeR, data) {
  let startX = 0, startY = 0, dx = 0, dy = 0, dragging = false;
  const thresh = 90;

  const onDown = (e) => { dragging = true; card.style.transition = 'none'; startX = e.touches? e.touches[0].clientX : e.clientX; startY = e.touches? e.touches[0].clientY : e.clientY; };
  const onMove = (e) => {
    if (!dragging) return;
    const x = e.touches? e.touches[0].clientX : e.clientX;
    const y = e.touches? e.touches[0].clientY : e.clientY;
    dx = x - startX; dy = y - startY;
    const rot = dx / 16; const scale = 1 - Math.min(Math.abs(dx)/1200, .04);
    card.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${scale})`;
    const t = Math.min(Math.abs(dx)/thresh, 1);
    if (dx < 0) { badgeL.style.opacity = t; badgeR.style.opacity = 0; }
    else if (dx > 0) { badgeR.style.opacity = t; badgeL.style.opacity = 0; }
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false; card.style.transition = '';
    if (Math.abs(dx) > thresh) {
      const dir = dx < 0 ? 'left' : 'right';
      fling(card, dir); decide(dir, data);
    } else { card.style.transform = ''; badgeL.style.opacity = 0; badgeR.style.opacity = 0; }
  };

  card.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { fling(card, 'left'); decide('left', data); }
    if (e.key === 'ArrowRight') { fling(card, 'right'); decide('right', data); }
  });
}

function fling(card, dir) {
  const off = dir === 'left' ? -window.innerWidth : window.innerWidth;
  card.style.transition = 'transform .25s ease, opacity .25s ease';
  card.style.transform = `translate(${off}px, -20px) rotate(${dir==='left'?-18:18}deg)`;
  card.style.opacity = .2;
  setTimeout(()=> card.remove(), 250);
}

function decide(side, data) {
  const pick = data[side];
  state.history.push({ id: data.id, choice: side, label: pick.label, consequence: pick.consequence });
  showToast(pick.consequence);
  state.index += 1;
  setTimeout(renderBoard, 180);
}

function restart() {
  state.index = 0; state.history = []; renderBoard();
}

renderBoard();
