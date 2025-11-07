// 4 Kategorien, Startwert je 5 Punkte, Limit 0–10
const CATEGORIES = ["Bildung", "Sicherheit", "Zufriedenheit", "Finanzen"];

// --- Dein volles MASTER-DECK (15 Fragen) ---
const DECK = [
  {
    id: 1,
    prompt: "Bauern fordern Subventionen (finanzielle unterstützung) für die Schweinezucht.",
    meta: "Finanzen",
    left:  {
      label: "Sie bekommen das Geld",
      consequence: "Bauern werden fett und faul. Cholesterinrate steigt im Land.",
      effects: { Finanzen: -2, Zufriedenheit: +2, Bildung: -1 }
    },
    right: {
      label: "Sie bekommen kein Geld",
      consequence: "Bauern und Schweine streiken. Veganer Partei gewinnt nächste Wahl.",
      effects: { Finanzen: +1, Zufriedenheit: -2 }
    }
  },
  {
    id: 2,
    prompt: "Polizei fordert doppelt so viel Geld, um Bevölkerung besser zu kontrolieren",
    meta: "Sicherheit.",
    left:  {
      label: "Finanzieren",
      consequence: "Land ist sicherer, aber niemand traut sich mehr aus dem Haus.",
      effects: { Sicherheit: +2, Zufriedenheit:-2, Finanzen: -1 }
    },
    right: {
      label: "Nicht Finanzieren",
      consequence: "Menschen trauen sich weiterhin raus, Verbrechensrate bleibt hoch.",
      effects: { Sicherheit: -1, Zufriedenheit: +2 }
    }
  },
  {
    id: 3,
    prompt: "Wissenschaftler wollen Klone für die Arbeit züchten.",
    meta: "Finanzen",
    left:  {
      label: "Zustimmen",
      consequence: "Wirtschaft boomt, jedoch weiß keiner, wer das Original ist.",
      effects: { Finanzen: +2, Bildung: +1, Zufriedenheit: -1, Sicherheit: -2 }
    },
    right: {
      label: "Ablehnen",
      consequence: "Forschung wandert ab. Weniger Wachstum, weniger ethische Konflikte.",
      effects: { Finanzen: -1, Zufriedenheit: +2, Bildung: -1 }
    }
  },
  {
    id: 4,
    prompt: "Alle Social-Media-Nachrichten sollen überwacht werden.",
    meta: "Zufriedenheit",
    left:  {
      label: "Zulassen",
      consequence: "Bürger haben Angst, ihre Meinung zu äußern.",
      effects: { Sicherheit: +2, Zufriedenheit: -2 }
    },
    right: {
      label: "Ablehnen",
      consequence: "Freie Chats; Inhalte bleiben ungefiltert.",
      effects: { Sicherheit: -1, Zufriedenheit: +2 }
    }
  },
  {
    id: 5,
    prompt: "Schüler fordern kostenlosen Nahverkehr zur Schule.",
    meta: "Bildung",
    left:  {
      label: "Finanzieren",
      consequence: "Budget sinkt, mehr Schüler in der Schule; einer heilt später Krebs.",
      effects: { Bildung: +2, Zufriedenheit: +1, Finanzen: -2 }
    },
    right: {
      label: "Ablehnen",
      consequence: "Weniger Schüler in der Schule. Kriminalitätsrate steigt.",
      effects: { Bildung: -2, Zufriedenheit: -2, Finanzen: +1 }
    }
  },
  {
    id: 6,
    prompt: "Maultaschen sollen verboten werden, um Fleischverbrauch zu reduzieren",
    meta: "Zufriedenheit.",
    left: {
      label: "Zulassen",
      consequence: "Bevölkerung ist empört. Illegale Maultaschenringe entstehen.",
      effects: { Sicherheit: -2, Zufriedenheit: -1, Finanzen: +1  }
    },
    right: {
      label: "Ablehnen",
      consequence: "Maultaschen Industrie boomt. Veganer sind empört.",
      effects: { Finanzen: +2, Zufriedenheit: +2, Bildung: -1 }
    }
  },
  {
    id: 7,
    prompt: "Schwarzwald soll im großen Stil abgeholzt werden, um neue Ferienorte zu schaffen.",
    left: {
      label: "Zulassen",
      consequence: "Tourismus wächst, jedoch wird die Luftqualität deutlich schlechter.",
      effects: {  Zufriedenheit: -2, Finanzen: +2  }
    },
    right: {
      label: "Ablehnen",
      consequence: "Natur bleibt erhalten, jedoch gehen viele Potentielle Arbeitsplätze verloren",
      effects: { Finanzen: -2, Zufriedenheit: +2 }
    }
  },
  {
    id: 8,
    prompt: "Einfürung einer Brezel Steuer, zur Finanzierung der Straßen.",
    left: {
      label: "Zulassen",
      consequence: "Straßen werden saniert, jedoch ist der Zorn der Bäcker grenzenlos. Der Preis der Brezel steigt auf 5€.",
      effects: { Zufriedenheit: -1, Finanzen: +2  }
    },
    right: {
      label: "Ablehnen",
      consequence: "Die Straßen sind weiterhin kaputt, jedoch können die Bürger in Ruhe ihre Brezeln frühstücken.",
      effects: { Sicherheit: -1, Zufriedenheit: +2 }
    }
  },
  {
    id: 9,
    prompt: "Ausbau des Stuttgarter Flughafens mitten in ein Naturschutzgebiet.",
    left: {
      label: "Zulassen",
      consequence: "Wirtschaft profitiert, jedoch sterben seltene Tierarten aus. Demonstranten gehen auf die Straße.",
      effects: { Zufriedenheit: -1, Finanzen: +2, Bildung: -2 }
    },
    right: {
      label: "Ablehnen",
      consequence: "Umwelt bleibt Intakt.",
      effects: { Zufriedenheit: +1, Bildung: +1 }
    }
  },
  {
    id: 10,
    prompt: "Der Bodensee soll teilweise privatisiert werden.",
    left: {
      label: "Zulassen",
      consequence: "Luxushotels krallen sich die Grundstücke. Bodensee darf nur noch gegen Gebühr betreten werden.",
      effects: { Zufriedenheit: -2, Finanzen: +2  }
    },
    right: {
      label: "Ablehnen",
      consequence: "Ufer bleiben öffentlich, jedoch gehen eine Menge einnahmen verloren.",
      effects: { Finanzen: -2, Zufriedenheit: +2}
    }
  },
  {
    id: 11,
    prompt: "Die Kuckucksuhr soll als nationales Kulturerbe gefördert werden.",
    left: {
      label: "Fördern",
      consequence: "Traditionen leben auf, jedoch leidet das Budget an der Uhren offensive.",
      effects: { Zufriedenheit: +2, Finanzen: -1, Bildung: +1  }
    },
    right: {
      label: "Nicht fördern",
      consequence: "Alte Handwerksbetriebe sterben aus. Bevölkerung ist enttäuscht.",
      effects: { Zufriedenheit: -1, Finanzen: -1 }
    }
  },
  {
    id: 12,
    prompt: "Der Bahnhof in Stuttgart soll weiter vergrößert werden.",
    left: {
      label: "Vergrößern",
      consequence: "Baustelle wird endlich fertig-2038. Bürger sind wütend.",
      effects: { Zufriedenheit: -2, Finanzen: -1  }
    },
    right: {
      label: "Nicht Vergrößern",
      consequence: "Es herrscht weiterhin absolutes Chaos.",
      effects: { Finanzen: -1, Zufriedenheit: -1 }
    }
  },
  {
    id: 13,
    prompt: "Einführung einer Pflicht zum Tragen von Trachten an Feiertagen.",
    left: {
      label: "Zulassen",
      consequence: "Heimatsgefühl wächst, aber Individualisten und Jugendliche rebelieren. ",
      effects: { Zufriedenheit: -1, Finanzen: +1, Bildung: -1  }
    },
    right: {
      label: "Ablehnen",
      consequence: "Modefreiheit bleibt, aber Touristen beschweren sich über den fehlenden Flair.",
      effects: { Finanzen: -1, Zufriedenheit: +1, Bildung: +1}
    }
  },
  {
    id: 14,
    prompt: "Einführung eines Dialekt-Pflichtfaches in Schulen.",
    left: {
      label: "Einführen",
      consequence: "Kinder reden wieder schwäbisch D`Kender schwätzad etz wieder Schwäbisch. D`Lehrer send am Verzweifla bei de Grammatikaufgab.",
      effects: { Zufriedenheit: -1, Bildung: -2  }
    },
    right: {
      label: "Nicht Einführen",
      consequence: "Hochdeutsch setzt sich durch und Dialekte sterben aus.",
      effects: { Zufriedenheit: -1, Bildung: +2}
    }
  },
  {
    id: 15,
    prompt: "Freibäder sollen Verboten werden um Wasser zu sparen und potentielle Unfälle zu vermeiden.",
    left: {
      label: "Verbieten",
      consequence: "Die Bevölkerung hat angefangen ihre eigenen Pools zu bauen, wodurch es zu vielen verletzten gekommen ist.",
      effects: { Zufriedenheit: -1, Bildung: +1, Finanzen: -1, Sicherheit: -1  }
    },
    right: {
      label: "Nicht Verbieten",
      consequence: "Die Nachfrage nach Schwimmbädern schoss in die Decke. Noch nie wurden so viele Rettungsschwimmer benötigt.",
      effects: { Zufriedenheit: +1, Finanzen: +1, Sicherheit: +1 }
    }
  }
];

// --- Hilfsfunktion: n zufällige, eindeutige Karten ziehen ---
function sampleDeck(base, n) {
  const arr = base.slice();
  // Fisher-Yates Shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

const state = {
  index: 0,
  history: [],
  scores: { Bildung: 5, Sicherheit: 5, Zufriedenheit: 5, Finanzen: 5 },
  playDeck: sampleDeck(DECK, 5) // <— 5 zufällige Fragen pro Run
};

const $ = (sel, el=document) => el.querySelector(sel);
const create = (tag, cls) => { const n = document.createElement(tag); if (cls) n.className = cls; return n; };

function updateProgress() {
  const p = Math.round((state.index / state.playDeck.length) * 100);
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
    low:  "Die Leute waren unzufrieden mit dir. Du wirst von deinen engsten Beratern im Schlaf erschossen",
    high: "Die Menschen sind fett und faul geworden. Keiner macht mehr seinen Job was der Elite gar nicht gefällt. Du wirst im Schlaf erschossen."
  },
  Finanzen: {
    low:  "Krankenhäuser brechen zusammen. Alle werden Krank und sterben über lange Zeit an ihren Qualen.",
    high: "Das ganze Geld hat dich überaus korrupt gemacht. Für den richtigen Betrag würdest du alles tun. Deine Bevölkerung wird unrhuig und lehnt sich gegen dich auf. "
  }
};

function showGameOver(cat, reason) {
  const board = $('#board');
  board.innerHTML = '';

  const wrap = create('div', 'card');
  wrap.style.display = 'grid';
  wrap.style.placeItems = 'center';
  const end = create('div', 'end');

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

  // --- Gewonnen / Spielende nach 5 zufälligen Fragen ---
  if (state.index >= state.playDeck.length) {
    const wrap = create('div', 'card');
    wrap.style.display = 'grid';
    wrap.style.placeItems = 'center';
    const end = create('div', 'end');

    // Kategorien-Endstand
    const scoreList = Object.entries(state.scores)
      .map(([k,v]) => `<div><strong>${k}:</strong> ${v}</div>`)
      .join('');

    // Alle Konsequenzen aus dem Spielverlauf
    const historyList = state.history
      .map(h =>
        `<li style="margin-bottom:6px;">
           <strong>Frage ${h.id}:</strong> ${h.consequence}
           <br><span style="opacity:.6;">(${Object.entries(h.effects)
             .map(([cat,val]) => `${cat}: ${val > 0 ? '+'+val : val}`)
             .join(', ')})</span>
         </li>`
      )
      .join('');

    end.innerHTML = `
      <h2>Gewonnen!</h2>
      <p>Du hast alle ${state.playDeck.length} Fragen beantwortet.</p>
      <p><strong>Endstand:</strong></p>
      <div>${scoreList}</div>
      <p style="margin-top:12px;"><strong>Deine Entscheidungen und ihre Folgen:</strong></p>
      <ul style="text-align:left; max-width:560px; margin:0 auto 16px; padding-left:20px; list-style:none;">
        ${historyList}
      </ul>
      <button class="btn" onclick="restart()">Nochmal spielen</button>
    `;

    wrap.appendChild(end);
    board.appendChild(wrap);
    $('#bar').style.width = '100%';
    return;
  }

  // --- Nächste Karte anzeigen ---
  const cardData = state.playDeck[state.index];
  const card = create('article', 'card above');
  const badgeL = create('div', 'badge left');
  badgeL.textContent = cardData.left.label;
  const badgeR = create('div', 'badge right');
  badgeR.textContent = cardData.right.label;
  card.append(badgeL, badgeR);

  const meta = create('div', 'meta');
  meta.textContent = cardData.meta || '';
  const prompt = create('div', 'prompt');
  prompt.textContent = cardData.prompt;
  const spacer = create('div');
  const choices = create('div', 'choices');

  const btnLeft = create('button', 'btn btn-left');
  btnLeft.textContent = `← ${cardData.left.label}`;
  const btnRight = create('button', 'btn btn-right');
  btnRight.textContent = `${cardData.right.label} →`;
  btnLeft.addEventListener('click', () => decide('left', cardData));
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
  state.playDeck = sampleDeck(DECK, 5); // neue 5 zufällige Fragen
   }
   
function renderBoard() {
  const board = $('#board');
  board.innerHTML = '';

  // --- Gewonnen / Spielende nach 5 zufälligen Fragen ---
  if (state.index >= state.playDeck.length) {
    const wrap = create('div', 'card');
    wrap.style.display = 'grid';
    wrap.style.placeItems = 'center';
    const end = create('div', 'end');

    // Kategorien-Endstand
    const scoreList = Object.entries(state.scores)
      .map(([k,v]) => `<div><strong>${k}:</strong> ${v}</div>`)
      .join('');

    // Konsequenzen als Fließtext
    const historyText = state.history
      .map(h => h.consequence)
      .join(' '); // durch Leerzeichen verbunden

    end.innerHTML = `
      <h2>Gewonnen!</h2>
      <p>Du hast alle ${state.playDeck.length} Fragen beantwortet.</p>
      <p><strong>Endstand:</strong></p>
      <div>${scoreList}</div>
      <p style="margin-top:12px;"><strong>Deine Entscheidungen hatten folgende Folgen:</strong></p>
      <p style="text-align:justify; max-width:560px; margin:0 auto 16px;">
        ${historyText}
      </p>
      <button class="btn" onclick="restart()">Nochmal spielen</button>
    `;

    wrap.appendChild(end);
    board.appendChild(wrap);
    $('#bar').style.width = '100%';
    return;
  }

  // --- Nächste Karte anzeigen ---
  const cardData = state.playDeck[state.index];
  const card = create('article', 'card above');
  const badgeL = create('div', 'badge left');
  badgeL.textContent = cardData.left.label;
  const badgeR = create('div', 'badge right');
  badgeR.textContent = cardData.right.label;
  card.append(badgeL, badgeR);

  const meta = create('div', 'meta');
  meta.textContent = cardData.meta || '';
  const prompt = create('div', 'prompt');
  prompt.textContent = cardData.prompt;
  const spacer = create('div');
  const choices = create('div', 'choices');

  const btnLeft = create('button', 'btn btn-left');
  btnLeft.textContent = `← ${cardData.left.label}`;
  const btnRight = create('button', 'btn btn-right');
  btnRight.textContent = `${cardData.right.label} →`;
  btnLeft.addEventListener('click', () => decide('left', cardData));
  btnRight.addEventListener('click', () => decide('right', cardData));
  choices.append(btnLeft, btnRight);

  card.append(meta, prompt, spacer, choices);
  board.appendChild(card);
  updateProgress();
  updateBars();
}

updateBars();
