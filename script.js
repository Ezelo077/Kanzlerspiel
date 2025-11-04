// 4 Kategorien, Startwert je 5 Punkte, Limit 0–10
const CATEGORIES = ["Bildung", "Sicherheit", "Zufriedenheit", "Finanzen"];

const DECK = [
  {
    id: 1,
    prompt: "Bauern fordern Subventionen für die Schweinezucht",
    meta: "Finanzen",
    left:  {
      label: "Sie bekommen das Geld",
      consequence: "Bauern werden fett und faul. Cholesterinrate steigt im Land.",
      effects: { Finanzen: -2, Zufriedenheit: +1 }
    },
    right: {
      label: "Sie bekommen kein Geld",
      consequence: "Bauern und Schweine streiken. Veganer Partei gewinnt nächste Wahl.",
      effects: { Finanzen: +1, Zufriedenheit: -1 }
    }
  },
  {
    id: 2,
    prompt: "Polizei fordert doppelt so viel Geld, um Bevölkerung besser zu kontrolieren",
    meta: "Sicherheit",
    left:  {
      label: "Finanzieren",
      consequence: "Land ist sicherer, aber niemand traut sich mehr aus dem Haus.",
      effects: { Sicherheit: +2, Zufriedenheit:-1, Finanzen: -1 }
    },
    right: {
      label: "Nicht Finanzieren",
      consequence: "Menschen trauen sich weiterhin raus, Verbrechensrate bleibt hoch.",
      effects: { Sicherheit: -1, Zufriedenheit: +2 }
    }
  },
  {
    id: 3,
    prompt: "Wissenschaftler wollen Klone für die Arbeit züchten",
    meta: "Finanzen",
    left:  {
      label: "Zustimmen",
      consequence: "Wirtschaft boomt, jedoch weiß keiner, wer das Original ist.",
      effects: { Finanzen: +2, Bildung: +1, Zufriedenheit: -1, Sicherheit: -1 }
    },
    right: {
      label: "Ablehnen",
      consequence: "Forschung wandert ab. Weniger Wachstum, weniger ethische Konflikte.",
      effects: { Finanzen: -1, Zufriedenheit: +2 }
    }
  },
  {
    id: 4,
    prompt: "Alle Social-Media-Nachrichten sollen überwacht werden",
    meta: "Zufriedenheit",
    left:  {
      label: "Zulassen",
      consequence: "Bürger haben Angst, ihre Meinung zu äußern.",
      effects: { Sicherheit: +1, Zufriedenheit: -2 }
    },
    right: {
      label: "Ablehnen",
      consequence: "Freie Chats; Inhalte bleiben ungefiltert.",
      effects: { Sicherheit: -1, Zufriedenheit: +2 }
    }
  },
  {
    id: 5,
    prompt: "Schüler fordern kostenlosen Nahverkehr zur Schule",
    meta: "Bildung",
    left:  {
      label: "Finanzieren",
      consequence: "Budget sinkt, mehr Schüler in der Schule; einer heilt später Krebs.",
      effects: { Bildung: +2, Zufriedenheit: +1, Finanzen: -1 }
    },
    right: {
      label: "Ablehnen",
      consequence: "Weniger Schüler in der Schule. Kriminalitätsrate steigt.",
      effects: { Bildung: -2, Zufriedenheit: -1, Finanzen: +1 }
    }
  },
  {id: 6,
   prompt: "Maultaschen sollen verboten werden, um Fleischverbrauch zu reduzieren",
   meta: "Zufriedenheit",
   left: {
    label: "Zulassen",
    consequence: "Bevölkerung ist empört. Illegale Maultaschenringe entstehen.",
    effects: { Sicherheit: -1, Zufriedenheit: -1, Finanzen: +1  }
   },
   right: {
      label: "Ablehnen",
      consequence: "Maultaschen Industrie boomt. Veganer sind empört",
      effects: { Finanzen: +1, Zufriedenheit: +2 }
    }
  },
  {
    id: 7,
    prompt: "Schwarzwald soll im großen Stil abgeholzt werden, um neue Ferienorte zu schaffen",
   left: {
    label: "Zulassen",
    consequence: "Tourismus wächst, jedoch wird die Luftqualität deutlich schlechter",
    effects: {  Zufriedenheit: -1, Finanzen: +2  }
   },
   right: {
      label: "Ablehnen",
      consequence: "Natur bleibt erhalten, jedoch gehen viele Potentielle Arbeitsplätze verloren",
      effects: { Finanzen: -1, Zufriedenheit: +2 }
    }
  }


  
];

const state = {
  index: 0,
  history: [],
  scores: { Bildung: 5, Sicherheit: 5, Zufriedenheit: 5, Finanzen: 5 }
};

const $ = (sel, el=document) => el.querySelector(sel);
const create = (tag, cls) => { const n = document.createElement(tag); if (cls) n.className = cls; return n; };

function updateProgress() {
  const p = Math.round((state.index / DECK.length) * 100);
  $('#bar').style.width = p + '%';
}

function updateBars() {
  for (const cat of CATEGORIES) {
    const el = document.getElementById('bar-' + cat);
    if (!el) continue;
    const val = state.scores[cat];
    const percent = (val / 10) * 100;
    el.style.width = percent + '%';
    el.style.background = val <= 2 || val >= 8 ? '#ff1d1d' : 'linear-gradient(90deg, #ff5864, #ff9a56)';
  }
}

function checkGameOver() {
  for (const [cat, val] of Object.entries(state.scores)) {
    if (val <= 0 || val >= 10) {
      showGameOver(cat, val <= 0 ? "zu niedrig" : "zu hoch");
      return true;
    }
  }
  return false;
}

// Individuelle Game-Over-Texte für jede Kategorie
const GAME_OVER_MESSAGES = {
  Bildung: {
    low:  "Dein Land ist verblödet. Es ist rückständig geworden und deine Bevölkerung bewirft sich auf offener Straße mit Kacke.",
    high: "Deine Bevölkerung ist zu schlau geworden. Sie durchschauen deine Tricks und lassen sich von niemanden regieren. "
  },
  Sicherheit: {
    low:  "Die niedriegen Sicherheitsstandarts haben deine gierigen Nachbarn aufmerksam gemacht. Sie ziehen in den Krieg gegen dich und gewinnen.",
    high: "Du wurdest zu gierig. Du startest einen Krieg mit dem Nachbarland, verlierst jedoch."
  },
  Zufriedenheit: {
    low:  "Die Leute waren unzufrieden mit dir. Du wirst von deinen engsten Beratern im schlaf erschossen",
    high: "Die Menschen sind fett und faul geworden. Keiner macht mehr seinen Job was der Elite gar nicht gefällt. Du wirst im schlaf erschossen."
  },
  Finanzen: {
    low:  "Krankenhäuser brechen zusammen. Alle werden Krank und sterben über lange Zeit an ihren Qualen.",
    high: "Das ganze Geld hat dich überaus Korrupt gemacht. Für den richtigen Betrag würdest du alles tun. Deine Bevölkerung wird unrhuig und lehnt sich gegen dich auf. "
  }
};


function showGameOver(cat, reason) {
  const board = $('#board');
  board.innerHTML = '';

  const wrap = create('div', 'card');
  wrap.style.display = 'grid';
  wrap.style.placeItems = 'center';
  const end = create('div', 'end');

  // Wähle passenden Text
  const msgSet = GAME_OVER_MESSAGES[cat];
  let msg = '';
  if (msgSet) {
    msg = reason === "zu niedrig" ? msgSet.low : msgSet.high;
  } else {
    msg = `Deine Politik hat ${cat} zerstört.`;
  }

  end.innerHTML = `
    <h2>Spiel vorbei!</h2>
    <p><strong>${cat}</strong> ist ${reason} geworden.</p>
    <p>${msg}</p>
    <button class="btn" onclick="restart()">Neu starten</button>
  `;
  wrap.appendChild(end);
  board.appendChild(wrap);
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

  if (state.index >= DECK.length) {
    const wrap = create('div', 'card');
    wrap.style.display = 'grid';
    wrap.style.placeItems = 'center';
    const end = create('div', 'end');
    const scoreList = Object.entries(state.scores)
      .map(([k,v]) => `<div><strong>${k}:</strong> ${v}</div>`).join('');
    end.innerHTML = `
      <h2>Fertig.</h2>
      <p>Endstand:</p>
      <div>${scoreList}</div>
      <button class="btn" onclick="restart()">Nochmal spielen</button>
    `;
    wrap.appendChild(end);
    board.appendChild(wrap);
    $('#bar').style.width = '100%';
    return;
  }

  const cardData = DECK[state.index];
  const card = create('article', 'card above');
  const badgeL = create('div', 'badge left');  badgeL.textContent  = cardData.left.label;
  const badgeR = create('div', 'badge right'); badgeR.textContent = cardData.right.label;
  card.append(badgeL, badgeR);

  const meta = create('div', 'meta'); meta.textContent = cardData.meta;
  const prompt = create('div', 'prompt'); prompt.textContent = cardData.prompt;
  const spacer = create('div');
  const choices = create('div', 'choices');

  const btnLeft  = create('button', 'btn btn-left');  btnLeft.textContent  = `← ${cardData.left.label}`;
  const btnRight = create('button', 'btn btn-right'); btnRight.textContent = `${cardData.right.label} →`;
  btnLeft.addEventListener('click',  () => decide('left',  cardData));
  btnRight.addEventListener('click', () => decide('right', cardData));
  choices.append(btnLeft, btnRight);

  card.append(meta, prompt, spacer, choices);
  board.appendChild(card);
  updateProgress();
  updateBars();
}

function decide(side, data) {
  const pick = data[side];
  const eff = pick.effects || {};
  for (const [cat, val] of Object.entries(eff)) {
    if (state.scores[cat] === undefined) state.scores[cat] = 5;
    state.scores[cat] += val;
    if (state.scores[cat] > 10) state.scores[cat] = 10;
    if (state.scores[cat] < 0) state.scores[cat] = 0;
  }
  state.history.push({ id: data.id, choice: side, consequence: pick.consequence, effects: eff });
  showToast(pick.consequence);
  state.index++;
  updateBars();
  if (!checkGameOver()) setTimeout(renderBoard, 180);
}

function restart() {
  state.index = 0;
  state.history = [];
  state.scores = { Bildung: 5, Sicherheit: 5, Zufriedenheit: 5, Finanzen: 5 };
  renderBoard();
}

renderBoard();
updateBars();
