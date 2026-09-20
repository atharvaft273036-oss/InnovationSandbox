/* CaseGrid - case terminal panes, shared by screens 04, 05 and 06.
   Kept in one file so the interviewer and candidate views cannot drift apart. */
(function (global) {
  'use strict';

  var icon = global.CaseGrid.icon;
  var D = global.CASEGRID_DATA;
  var C = D.activeCase;

  var state = {
    triggersUsed: {},
    keyOpen: false,
    rubricDone: false,
    candSeconds: 32 * 60 + 14,
    candClockId: null,
    asks: [
      { q: 'Can I assume the delivery fee is the same across all eight cities?', a: 'Yes, Rs. 25 flat, below Rs. 500.', at: 'minute 6' },
      { q: 'Is rider pay per delivery or per hour?', a: 'Per delivery.', at: 'minute 11' }
    ],
    mounts: []
  };

  function exhibitById(id) {
    for (var i = 0; i < C.exhibits.length; i++) { if (C.exhibits[i].id === id) { return C.exhibits[i]; } }
    return null;
  }

  function table(ex) {
    var head = ex.rows[0], out = '<table class="data-table"><thead><tr>';
    for (var i = 0; i < head.length; i++) { out += '<th>' + head[i] + '</th>'; }
    out += '</tr></thead><tbody>';
    for (var r = 1; r < ex.rows.length; r++) {
      out += '<tr>';
      for (var c = 0; c < ex.rows[r].length; c++) { out += '<td>' + ex.rows[r][c] + '</td>'; }
      out += '</tr>';
    }
    return out + '</tbody></table>';
  }

  /* ====================================================================
     Interviewer pane
     ==================================================================== */
  function interviewerHTML() {
    var out = '<div class="pane__head">' +
      '<span class="pane__role pane__role--int">' + icon('monitor', 15) + 'Interviewer</span>' +
      '<span class="t-xs subtle">You are running this half</span>' +
      '<div class="spacer"></div>' +
      '<span class="badge">' + icon('users', 12) + 'Adeeba Kishwar is the candidate</span>' +
      '</div><div class="pane__scroll"><div class="stack" style="gap:16px">';

    /* Run sheet - the pane tells you what to do, and ticks itself off. */
    var released = 0;
    for (var r = 0; r < C.exhibits.length; r++) { if (C.exhibits[r].released) { released++; } }
    var steps = [
      { done: true, t: 'Read the prompt aloud', s: 'Done at 00:00. Do not paraphrase it.' },
      { done: released > 0, t: 'Release Exhibit 1 when they ask for data', s: released > 0 ? 'Released at minute 9' : 'Make them ask first - do not volunteer it' },
      { done: usedCount() > 0, t: 'Use a prompt trigger if they stall', s: usedCount() + ' of 3 used' },
      { done: released > 1, t: 'Release Exhibit 2 once they reach rider cost', s: released > 1 ? 'Released' : 'Still locked on their side' },
      { done: state.rubricDone, t: 'Submit the rubric', s: 'Required before either of you can leave' }
    ];
    var doneN = 0, list = '';
    for (var s2 = 0; s2 < steps.length; s2++) {
      if (steps[s2].done) { doneN++; }
      list += '<li class="' + (steps[s2].done ? 'done' : '') + '">' +
        '<span class="check' + (steps[s2].done ? ' check--on' : '') + '">' + icon('checkSm', 12) + '</span>' +
        '<span style="min-width:0"><span class="checklist__t">' + steps[s2].t + '</span>' +
        '<span class="checklist__s">' + steps[s2].s + '</span></span></li>';
    }
    out += '<section class="card"><div class="card__head">' +
      '<span style="color:var(--accent-text)">' + icon('target', 16) + '</span>' +
      '<h2 class="t-h2">Your run sheet</h2>' +
      '<span class="badge' + (doneN === steps.length ? ' badge--ok' : '') + '">' + doneN + ' of ' + steps.length + '</span></div>' +
      '<div class="card__body" style="padding-top:10px;padding-bottom:10px">' +
      '<ul class="checklist">' + list + '</ul></div></section>';

    /* Case narrative */
    out += '<section class="card"><div class="card__head">' +
      '<h2 class="t-h2">' + C.title + '</h2>' +
      '<span class="badge">' + C.type + '</span><span class="badge">' + C.difficulty + '</span>' +
      '</div><div class="card__body">' +
      '<div class="t-label" style="margin-bottom:6px">Read this aloud</div>' +
      '<p class="t-body" style="border-left:2px solid var(--accent);padding-left:14px">' + C.prompt + '</p>' +
      '<div class="t-label" style="margin:18px 0 6px">Give only if asked</div><ul class="flow-sm">';
    for (var i = 0; i < C.context.length; i++) {
      out += '<li class="row" style="gap:8px;align-items:flex-start">' +
        '<span style="color:var(--n-400);margin-top:6px"><span class="dot"></span></span>' +
        '<span class="t-sm">' + C.context[i] + '</span></li>';
    }
    out += '</ul></div></section>';

    /* Solution key */
    out += '<section class="disclosure" data-open="' + state.keyOpen + '" id="key-disc">' +
      '<button class="disclosure__btn" type="button" id="key-toggle" aria-expanded="' + state.keyOpen + '">' +
      icon('chevronRight', 15, 'chev') + '<span>Solution key</span>' +
      '<span class="badge badge--warn" style="margin-left:auto">' + icon('eye', 12) + 'Hidden from candidate</span>' +
      '</button><div class="disclosure__panel"><div class="flow">';
    for (var k = 0; k < C.solutionKey.length; k++) {
      out += '<div><div class="t-h3">' + C.solutionKey[k].heading + '</div>' +
        '<p class="t-sm muted" style="margin-top:3px">' + C.solutionKey[k].body + '</p></div>';
    }
    out += '</div></div></section>';

    /* Triggers */
    out += '<section class="card"><div class="card__head"><h2 class="t-h2">Prompt triggers</h2>' +
      '<span class="badge" id="trigger-count">' + usedCount() + ' of 3 used</span></div>' +
      '<div class="card__body" style="padding-top:14px"><div class="stack--sm" style="display:flex;flex-direction:column">';
    for (var t = 0; t < C.triggers.length; t++) {
      var tr = C.triggers[t], used = !!state.triggersUsed[tr.id];
      out += '<div class="trigger' + (used ? ' trigger--used' : '') + '">' +
        '<div style="min-width:0;flex:1"><div class="trigger__at">' + tr.at + '</div>' +
        '<div class="trigger__text">' + tr.text + '</div></div>' +
        (used
          ? '<span class="badge badge--ok" style="flex:none">' + icon('checkSm', 12) + 'Used</span>'
          : '<button class="btn btn--sm" type="button" data-trigger="' + tr.id + '" style="flex:none">Mark used</button>') +
        '</div>';
    }
    out += '</div></div></section>';

    /* Exhibits */
    out += '<section class="card"><div class="card__head"><h2 class="t-h2">Exhibits</h2>' +
      '<span class="t-xs subtle">Release one at a time. The candidate sees nothing until you do.</span></div>' +
      '<div class="card__body" style="padding-top:14px"><div class="stack--sm" style="display:flex;flex-direction:column;gap:12px">';
    for (var e = 0; e < C.exhibits.length; e++) {
      var ex = C.exhibits[e];
      out += '<div class="exhibit' + (ex.released ? '' : ' exhibit--locked') + '">' +
        '<div class="exhibit__head">' +
        '<span style="color:' + (ex.released ? 'var(--ok)' : 'var(--text-subtle)') + '">' +
        icon(ex.released ? 'unlock' : 'lock', 15) + '</span>' +
        '<div style="min-width:0"><div class="t-h3">' + ex.name + ' · ' + ex.title + '</div>' +
        '<div class="t-xs subtle">' + ex.caption + '</div></div>' +
        '<div class="spacer"></div>' +
        (ex.released
          ? '<span class="badge badge--ok" style="flex:none">' + icon('checkSm', 12) + 'Released</span>'
          : '<button class="btn btn--primary btn--sm" type="button" data-release="' + ex.id + '" style="flex:none">Release</button>') +
        '</div><div class="exhibit__body">' + table(ex) + '</div></div>';
    }
    out += '</div></div></section></div></div>';

    /* Footer - rubric gate */
    out += '<div class="pane__foot">' +
      (state.rubricDone
        ? '<span class="badge badge--ok">' + icon('checkSm', 12) + 'Rubric submitted at 11:48 PM</span>' +
          '<div class="spacer"></div><a class="btn" href="02-dashboard.html">Leave session</a>'
        : '<span class="t-xs" style="display:flex;gap:6px;align-items:center;color:var(--warn)">' + icon('alert', 14) +
          'Rubric required before you can leave</span>' +
          '<div class="spacer"></div>' +
          '<button class="btn" type="button" disabled title="Submit the rubric first">Leave session</button>' +
          '<a class="btn btn--primary" href="07-rubric-submission.html">' + icon('clipboard', 15) + 'Open rubric</a>') +
      '</div>';

    return out;
  }

  function usedCount() {
    var n = 0;
    for (var k in state.triggersUsed) { if (state.triggersUsed[k]) { n++; } }
    return n;
  }

  /* ====================================================================
     Candidate pane
     ==================================================================== */
  function candidateHTML() {
    var ex1 = exhibitById('ex1'), ex2 = exhibitById('ex2');

    var out = '<div class="pane__head">' +
      '<span class="pane__role pane__role--cand">' + icon('pen', 15) + 'Candidate</span>' +
      '<span class="t-xs subtle">Jampana Karthik</span>' +
      '<div class="spacer"></div>' +
      '<span class="badge">' + icon('clock', 12) + '45 minute case</span>' +
      '</div><div class="pane__scroll"><div class="stack" style="gap:16px">';

    /* Countdown */
    out += '<section class="card"><div class="card__body" style="padding:18px 20px">' +
      '<div class="row" style="gap:16px">' +
      '<div><div class="t-label">Time remaining</div>' +
      '<div class="tnum" id="cand-clock" style="font-size:34px;font-weight:650;letter-spacing:-.02em;line-height:1.1">32:14</div></div>' +
      '<div style="flex:1;min-width:0">' +
      '<div class="bar"><div class="bar__fill" style="width:28.4%"></div></div>' +
      '<div class="row row--between" style="margin-top:6px"><span class="t-xs subtle">12:46 elapsed</span>' +
      '<span class="t-xs subtle">Synthesis expected by 40:00</span></div></div>' +
      '<span class="badge badge--ok" style="flex:none"><span class="dot dot--live"></span>Recording off</span>' +
      '</div></div></section>';

    /* The prompt as the candidate sees it */
    out += '<section class="card"><div class="card__head"><h2 class="t-h2">' + C.title + '</h2>' +
      '<span class="badge">' + C.type + '</span></div>' +
      '<div class="card__body"><p class="t-body">' + C.prompt + '</p>' +
      '<p class="t-xs subtle" style="margin-top:10px;display:flex;gap:6px;align-items:center">' + icon('info', 13) +
      'Everything else has to be asked for.</p></div></section>';

    /* What is being scored, visible while it still matters. */
    var chips = '';
    for (var rd = 0; rd < D.rubric.length; rd++) {
      chips += '<span class="badge" title="' + D.rubric[rd].blurb + '">' + D.rubric[rd].short + '</span>';
    }
    out += '<section class="card"><div class="card__head">' +
      '<span style="color:var(--text-subtle)">' + icon('target', 15) + '</span>' +
      '<h2 class="t-h2">You are being scored on</h2>' +
      '<span class="t-xs subtle" style="margin-left:auto">1 to 5 each</span></div>' +
      '<div class="card__body" style="padding-top:12px">' +
      '<div class="chips">' + chips + '</div>' +
      '<p class="t-xs subtle" style="margin-top:10px">Adeeba fills these after the call. Synthesis is the one you have lost marks on four sessions running - close with the answer first.</p>' +
      '</div></section>';

    /* Scratchpad */
    out += '<section class="card"><div class="card__head"><h2 class="t-h2">Scratchpad</h2>' +
      '<span class="t-xs subtle">Private to you</span>' +
      '<button class="btn btn--ghost btn--sm" type="button" style="margin-left:auto">' + icon('pen', 14) + 'Pen</button>' +
      '</div><div class="card__body"><div class="scratchpad">';
    for (var s = 0; s < C.scratchpad.length; s++) {
      out += '<div class="scratchpad__note' + (s >= 4 ? ' scratchpad__note--ink2' : '') + '">' + C.scratchpad[s] + '</div>';
    }
    out += '<div class="scratchpad__note">Ex 2 ask sent<span class="scratchpad__caret"></span></div>';
    out += '</div></div></section>';

    /* Exhibit viewer */
    out += '<section class="card"><div class="card__head"><h2 class="t-h2">Exhibit viewer</h2>' +
      '<span class="t-xs subtle">Released by your interviewer</span></div>' +
      '<div class="card__body" style="padding-top:14px"><div class="stack--sm" style="display:flex;flex-direction:column;gap:12px">';

    out += '<div class="exhibit"><div class="exhibit__head">' +
      '<span style="color:var(--ok)">' + icon('unlock', 15) + '</span>' +
      '<div><div class="t-h3">' + ex1.name + ' · ' + ex1.title + '</div>' +
      '<div class="t-xs subtle">Released at minute 9</div></div></div>' +
      '<div class="exhibit__body">' + table(ex1) + '</div></div>';

    if (ex2.released) {
      out += '<div class="exhibit fade-in"><div class="exhibit__head">' +
        '<span style="color:var(--ok)">' + icon('unlock', 15) + '</span>' +
        '<div><div class="t-h3">' + ex2.name + ' · ' + ex2.title + '</div>' +
        '<div class="t-xs subtle">Released just now</div></div>' +
        '<span class="badge badge--ok" style="margin-left:auto">New</span></div>' +
        '<div class="exhibit__body">' + table(ex2) + '</div></div>';
    } else {
      out += '<div class="locked-panel" id="ex2-waiting">' +
        '<div class="locked-panel__icon">' + icon('lock', 18) + '</div>' +
        '<div class="t-h3">Exhibit 2</div>' +
        '<p class="t-sm muted" style="margin-top:4px;max-width:38ch;margin-left:auto;margin-right:auto">' +
        'Waiting for the interviewer to release this exhibit. Ask for it if you think you need it.</p>' +
        '<div class="row" style="justify-content:center;gap:8px;margin-top:14px">' +
        '<span class="spinner"></span><span class="t-xs subtle">Listening for release</span></div></div>';
    }
    out += '</div></div></section>';

    /* Ask for data */
    out += '<section class="card"><div class="card__head"><h2 class="t-h2">Ask interviewer for data</h2>' +
      '<span class="t-xs subtle">Goes to their pane, not the chat</span></div>' +
      '<div class="card__body" style="padding-top:14px">' +
      '<div class="row" style="gap:8px;align-items:flex-start">' +
      '<input class="input" id="ask-input" placeholder="e.g. Do we have orders per rider trip by month?" aria-label="Ask the interviewer for data">' +
      '<button class="btn btn--primary" type="button" id="ask-btn" style="flex:none">' + icon('send', 15) + 'Send</button></div>' +
      '<div class="t-label" style="margin:18px 0 8px">Asked so far</div><div id="ask-log">' + asksHTML() + '</div>' +
      '</div></section>';

    /* Feedback locked */
    out += '<section class="card"><div class="card__head"><h2 class="t-h2">Feedback</h2>' +
      '<span class="badge">' + icon('lock', 12) + 'Locked</span></div>' +
      '<div class="card__body"><div class="locked-panel" style="padding:28px 20px">' +
      '<div class="locked-panel__icon">' + icon('clipboard', 18) + '</div>' +
      '<div class="t-h3">Your scores arrive after the call</div>' +
      '<p class="t-sm muted" style="margin-top:4px;max-width:42ch;margin-left:auto;margin-right:auto">' +
      'Your interviewer fills the six-dimension rubric once the 45 minutes are up. Nothing is visible to you during the case, in either direction.</p>' +
      '</div></div></section>';

    out += '</div></div>' +
      '<div class="pane__foot">' +
      '<span class="t-xs subtle" style="display:flex;gap:6px;align-items:center">' + icon('shield', 14) +
      'Roles swap at the 45 minute mark</span><div class="spacer"></div>' +
      '<button class="btn btn--sm" type="button">Request a 2 minute pause</button>' +
      '<a class="btn btn--sm" href="08-feedback-received.html">Past feedback</a></div>';

    return out;
  }

  function asksHTML() {
    var out = '';
    for (var i = 0; i < state.asks.length; i++) {
      var a = state.asks[i];
      out += '<div class="row" style="gap:10px;align-items:flex-start;padding:7px 0;border-top:1px solid var(--border-subtle)">' +
        '<span style="color:var(--text-subtle);margin-top:2px">' + icon(a.a ? 'checkSm' : 'clock', 14) + '</span>' +
        '<div style="min-width:0;flex:1"><div class="t-sm">' + a.q + '</div>' +
        '<div class="t-xs subtle">' + (a.a ? 'Answered: ' + a.a : 'Sent, waiting for an answer') + ' · ' + a.at + '</div></div></div>';
    }
    return out;
  }

  /* ====================================================================
     Wiring
     ==================================================================== */
  function wire(root, role) {
    if (role === 'interviewer') {
      var toggle = root.querySelector('#key-toggle');
      if (toggle) {
        toggle.addEventListener('click', function () {
          state.keyOpen = !state.keyOpen;
          renderAll();
        });
      }
      each(root.querySelectorAll('[data-trigger]'), function (btn) {
        btn.addEventListener('click', function () {
          state.triggersUsed[btn.getAttribute('data-trigger')] = true;
          renderAll();
          global.CaseGrid.toast('Trigger marked as used', 'ok',
            usedCount() + ' of 3 used. The candidate never sees this.');
        });
      });
      each(root.querySelectorAll('[data-release]'), function (btn) {
        btn.addEventListener('click', function () {
          var id = btn.getAttribute('data-release');
          btn.disabled = true;
          btn.innerHTML = '<span class="spinner spinner--invert"></span>Releasing';
          global.FakeAPI.releaseExhibit(id).then(function (ex) {
            renderAll();
            global.CaseGrid.toast((ex ? ex.name : 'Exhibit') + ' released to Adeeba', 'ok',
              'It has appeared in her exhibit viewer. This cannot be undone.');
          });
        });
      });
    } else {
      var input = root.querySelector('#ask-input');
      var btn = root.querySelector('#ask-btn');
      if (btn) {
        btn.addEventListener('click', function () {
          var q = input.value.trim();
          if (!q) { input.focus(); return; }
          btn.disabled = true;
          btn.innerHTML = '<span class="spinner spinner--invert"></span>Sending';
          global.FakeAPI.requestData(q).then(function () {
            state.asks.push({ q: q, a: null, at: 'just now' });
            renderAll();
            global.CaseGrid.toast('Sent to your interviewer', 'ok',
              'It shows up in their pane, not in the chat. Keep talking while you wait.');
          });
        });
        input.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') { btn.click(); }
        });
      }
      /* One interval only - re-rendering the pane must not stack timers. */
      var clock = root.querySelector('#cand-clock');
      if (clock) {
        if (state.candClockId) { clearInterval(state.candClockId); }
        state.candClockId = global.CaseGrid.startClock(clock, state.candSeconds, 'down', function (t) {
          state.candSeconds = t;
        });
      }
    }
  }

  function each(list, fn) { for (var i = 0; i < list.length; i++) { fn(list[i]); } }

  function renderAll() {
    for (var i = 0; i < state.mounts.length; i++) {
      var m = state.mounts[i];
      m.el.innerHTML = m.role === 'interviewer' ? interviewerHTML() : candidateHTML();
      wire(m.el, m.role);
    }
  }

  function topBar(opts) {
    opts = opts || {};
    return '<a class="row" href="02-dashboard.html" style="gap:8px;color:#fff">' +
      '<span class="sidebar__mark" style="width:22px;height:22px">' + icon('layers', 13) + '</span>' +
      '<span style="font-size:13px;font-weight:620">CaseGrid</span></a>' +
      '<span class="sep"></span>' +
      '<span class="terminal__case">' + C.title + '</span>' +
      '<span class="badge badge--solid" style="background:rgba(255,255,255,.1);border-color:transparent;color:#cfd4e0">' +
      C.type + ' · ' + C.difficulty + '</span>' +
      '<div class="spacer"></div>' +
      '<span class="t-xs" style="color:var(--n-500)">' + (opts.phase || 'Half 1 of 2 · Karthik interviewing') + '</span>' +
      '<span class="sep"></span>' +
      '<span class="terminal__clock">' + icon('clock', 15) + '<span id="term-clock">32:14</span></span>' +
      '<span class="sep"></span>' +
      '<div class="row" style="gap:6px">' +
      '<span class="avatar" style="width:24px;height:24px;font-size:10px;background:var(--accent)">JK</span>' +
      '<span class="avatar" style="width:24px;height:24px;font-size:10px;background:#4b5468">AK</span></div>' +
      '<button class="btn btn--sm btn--danger" type="button" id="term-exit">End session</button>';
  }

  function mount(opts) {
    var bar = document.getElementById('term-bar');
    if (bar) {
      bar.innerHTML = topBar(opts);
      var clock = document.getElementById('term-clock');
      global.CaseGrid.startClock(clock, 32 * 60 + 14, 'down', function (t) {
        if (t < 5 * 60) { clock.parentNode.classList.add('terminal__clock--warn'); }
      });
      var exit = document.getElementById('term-exit');
      if (exit) {
        exit.addEventListener('click', function () {
          var note = document.getElementById('exit-note');
          if (note) { note.classList.remove('hidden'); }
        });
      }
    }
    var panes = document.querySelectorAll('[data-pane]');
    state.mounts = [];
    each(panes, function (el) {
      state.mounts.push({ el: el, role: el.getAttribute('data-pane') });
    });
    renderAll();
  }

  global.CaseGridTerminal = { mount: mount, state: state, renderAll: renderAll };
})(window);
