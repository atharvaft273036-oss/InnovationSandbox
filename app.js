/* CaseGrid - shared chrome, icons, fake latency layer.
   No modules, no fetch, no storage. Loaded with a plain script tag. */
(function (global) {
  'use strict';

  var D = global.CASEGRID_DATA;

  /* ======================================================================
     Icons - 1.5px stroke, currentColor, sized by the caller.
     ====================================================================== */
  var PATHS = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    users: '<path d="M16 19v-1.6a3.4 3.4 0 0 0-3.4-3.4H6.4A3.4 3.4 0 0 0 3 17.4V19"/><circle cx="9.5" cy="7.5" r="3.2"/><path d="M21 19v-1.6a3.4 3.4 0 0 0-2.6-3.3"/><path d="M15.5 4.6a3.2 3.2 0 0 1 0 5.9"/>',
    monitor: '<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8.5 21h7M12 17v4"/>',
    clipboard: '<path d="M9 3.5h6a1 1 0 0 1 1 1V6H8V4.5a1 1 0 0 1 1-1Z"/><path d="M16 5h2.5A1.5 1.5 0 0 1 20 6.5v13A1.5 1.5 0 0 1 18.5 21h-13A1.5 1.5 0 0 1 4 19.5v-13A1.5 1.5 0 0 1 5.5 5H8"/><path d="M8.5 11.5h7M8.5 15.5h4.5"/>',
    message: '<path d="M20 14.5a2 2 0 0 1-2 2H8l-4 3.5v-14a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z"/><path d="M8.5 8.5h7M8.5 12h4"/>',
    coin: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M14.3 9.6a2.6 2.6 0 0 0-2.3-1.2c-1.4 0-2.4.8-2.4 1.9 0 2.7 5 1.3 5 4 0 1.2-1.1 2-2.6 2a2.7 2.7 0 0 1-2.4-1.3"/>',
    book: '<path d="M4 5.5A2 2 0 0 1 6 3.5h13v14H6a2 2 0 0 0-2 2Z"/><path d="M4 19.5a2 2 0 0 0 2 2h13v-4"/><path d="M8 7.5h7"/>',
    tag: '<path d="M11.6 3.5H5.5a2 2 0 0 0-2 2v6.1a2 2 0 0 0 .6 1.4l7.4 7.4a2 2 0 0 0 2.8 0l6.1-6.1a2 2 0 0 0 0-2.8L13 4.1a2 2 0 0 0-1.4-.6Z"/><circle cx="8.3" cy="8.3" r="1.3"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 14.5a1.5 1.5 0 0 0 .3 1.7l.1.1a1.8 1.8 0 1 1-2.6 2.6l-.1-.1a1.5 1.5 0 0 0-2.5 1v.3a1.8 1.8 0 1 1-3.6 0v-.2a1.5 1.5 0 0 0-2.6-1l-.1.1a1.8 1.8 0 1 1-2.6-2.6l.1-.1a1.5 1.5 0 0 0-1-2.5h-.3a1.8 1.8 0 0 1 0-3.6h.2a1.5 1.5 0 0 0 1-2.6l-.1-.1A1.8 1.8 0 1 1 8.2 4.8l.1.1a1.5 1.5 0 0 0 1.7.3h.1a1.5 1.5 0 0 0 .9-1.4v-.3a1.8 1.8 0 1 1 3.6 0v.2a1.5 1.5 0 0 0 2.5 1l.1-.1a1.8 1.8 0 1 1 2.6 2.6l-.1.1a1.5 1.5 0 0 0-.3 1.7v.1a1.5 1.5 0 0 0 1.4.9h.3a1.8 1.8 0 0 1 0 3.6h-.2a1.5 1.5 0 0 0-1.4.9Z"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.2V12l3.2 1.9"/>',
    shield: '<path d="M12 3.2 5 6v5.4c0 4.2 2.9 7.5 7 9.4 4.1-1.9 7-5.2 7-9.4V6Z"/><path d="m9.2 12.1 2 2 3.6-3.9"/>',
    check: '<path d="m5 12.6 4.4 4.4L19 7.4"/>',
    checkSm: '<path d="m4.5 10.5 3.4 3.4L16 5.8"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/>',
    unlock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.8a4 4 0 0 1 7.7-1.5"/>',
    alert: '<path d="M10.7 4.2 3.3 17a1.5 1.5 0 0 0 1.3 2.3h14.8a1.5 1.5 0 0 0 1.3-2.3L13.3 4.2a1.5 1.5 0 0 0-2.6 0Z"/><path d="M12 9.5v4M12 16.8h.01"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 15.8v-4.3M12 8.4h.01"/>',
    plus: '<path d="M12 5.5v13M5.5 12h13"/>',
    minus: '<path d="M5.5 12h13"/>',
    arrowRight: '<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
    arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    arrowDown: '<path d="M12 5v14M18 13l-6 6-6-6"/>',
    chevronRight: '<path d="m9 5.5 6.5 6.5L9 18.5"/>',
    chevronDown: '<path d="m5.5 9 6.5 6.5L18.5 9"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.8h17M8.3 3.5v3M15.7 3.5v3"/>',
    play: '<path d="M8 5.6 18.5 12 8 18.4Z"/>',
    eye: '<path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.8"/>',
    pen: '<path d="M16.4 3.9a2.1 2.1 0 0 1 3 3L8.2 18.1l-4 1 1-4Z"/><path d="m14.5 5.8 3.7 3.7"/>',
    help: '<circle cx="12" cy="12" r="8.5"/><path d="M9.7 9.6a2.4 2.4 0 0 1 4.6.8c0 1.6-2.3 2.4-2.3 2.4"/><path d="M12 16.6h.01"/>',
    zap: '<path d="M13.2 2.8 4.5 13.4h6.4l-.8 7.8 8.7-10.6h-6.4Z"/>',
    trend: '<path d="M3.5 16.5 9 11l3.5 3.5L20.5 6.5"/><path d="M15.5 6.5h5v5"/>',
    layers: '<path d="m12 3.2 8.5 4.4-8.5 4.4-8.5-4.4Z"/><path d="m3.5 12.6 8.5 4.4 8.5-4.4"/>',
    filter: '<path d="M3.5 5.5h17l-6.6 7.8v5.3l-3.8 2v-7.3Z"/>',
    send: '<path d="M20.5 3.5 10.8 13.2M20.5 3.5l-6.2 17-3.5-7.3L3.5 9.7Z"/>',
    refresh: '<path d="M20.2 10.5A8.3 8.3 0 0 0 6.1 6.6L3.5 9"/><path d="M3.8 13.5a8.3 8.3 0 0 0 14.1 3.9l2.6-2.4"/><path d="M3.5 4.5V9h4.5M20.5 19.5V15H16"/>',
    dot: '<circle cx="12" cy="12" r="3.5"/>',
    logout: '<path d="M9.5 20.5H6a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h3.5"/><path d="M15 16.5 19.5 12 15 7.5M19.5 12h-11"/>',
    star: '<path d="m12 3.6 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.8l5.9-.8Z"/>',
    flag: '<path d="M5 21V4.2M5 4.2h11l-1.6 3.4L16 11H5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.6 6.3 8.4 6 8.4-6"/>',
    sliders: '<path d="M4 7.5h10M18 7.5h2M4 16.5h4M12 16.5h8"/><circle cx="16" cy="7.5" r="2.2"/><circle cx="10" cy="16.5" r="2.2"/>',
    building: '<path d="M4 20.5h16M5.5 20.5V5a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 14.5 5v15.5"/><path d="M14.5 9.5H18a1.5 1.5 0 0 1 1.5 1.5v9.5"/><path d="M8.5 7.5h3M8.5 11.5h3M8.5 15.5h3"/>',
    snowflake: '<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/><path d="M9.5 4.8 12 3l2.5 1.8M9.5 19.2 12 21l2.5-1.8"/>',
    search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m15.8 15.8 4.4 4.4"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".6" fill="currentColor"/>',
    sparkle: '<path d="M12 3.5 13.8 9l5.5 1.8-5.5 1.8L12 18l-1.8-5.4L4.7 10.8 10.2 9Z"/><path d="M18.5 3.5v3M20 5h-3"/>'
  };

  function icon(name, size, cls) {
    var body = PATHS[name] || PATHS.dot;
    return '<svg viewBox="0 0 24 24" width="' + (size || 16) + '" height="' + (size || 16) +
      '" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"' +
      (cls ? ' class="' + cls + '"' : '') + ' aria-hidden="true">' + body + '</svg>';
  }

  /* ======================================================================
     Fake network layer - every call resolves on a timer, never a socket.
     ====================================================================== */
  function latency() { return 400 + Math.round(Math.random() * 500); }

  function defer(value, ms) {
    var cbs = [];
    var settled = false;
    var result;
    global.setTimeout(function () {
      settled = true;
      result = typeof value === 'function' ? value() : value;
      for (var i = 0; i < cbs.length; i++) { cbs[i](result); }
      cbs.length = 0;
    }, ms == null ? latency() : ms);
    return {
      then: function (cb) {
        if (settled) { cb(result); } else { cbs.push(cb); }
        return this;
      }
    };
  }

  var FakeAPI = {
    latency: latency,
    defer: defer,

    getUser: function () { return defer(function () { return D.user; }); },
    getDashboard: function () {
      return defer(function () {
        return {
          user: D.user,
          next: D.sessions.next,
          recent: D.sessions.recent,
          trend: D.trend
        };
      });
    },
    getPeersOnline: function () {
      return defer(function () {
        return D.peers.filter(function (p) { return p.online; });
      });
    },
    findMatch: function () {
      /* The queue screen wants a visible ~4s search, not the usual latency. */
      return defer(function () {
        var partner = D.peers.filter(function (p) { return p.id === D.queue.match.partnerId; })[0];
        return { partner: partner, match: D.queue.match };
      }, 4200);
    },
    getCases: function () { return defer(function () { return D.cases; }); },
    getLedger: function () { return defer(function () { return D.ledger; }); },
    getFeedback: function () { return defer(function () { return D.feedback; }); },
    getPricing: function () { return defer(function () { return D.pricing; }); },

    /* Mutations - they change the in-memory object and nothing else. */
    releaseExhibit: function (exhibitId) {
      return defer(function () {
        var list = D.activeCase.exhibits;
        for (var i = 0; i < list.length; i++) {
          if (list[i].id === exhibitId) { list[i].released = true; return list[i]; }
        }
        return null;
      }, 600);
    },
    submitRubric: function (payload) {
      return defer(function () {
        var session = D.sessions.recent[0];
        session.scores = payload.scores;
        session.avg = CaseGrid.average(payload.scores);
        D.user.credits += 1;
        D.ledger.unshift({
          id: 'l-' + (10 + D.ledger.length),
          date: '20 Sep 2026', time: '11:48 PM',
          type: 'Conducted',
          description: 'Interviewer - ' + D.activeCase.title + ' with ' + payload.partner,
          delta: 1, balance: D.user.credits, reliability: D.user.reliability, reliabilityDelta: 0
        });
        return { ok: true, credits: D.user.credits, submittedAt: '11:48 PM IST' };
      }, 900);
    },
    spendCredit: function (reason) {
      return defer(function () {
        D.user.credits -= 1;
        return { credits: D.user.credits, reason: reason };
      }, 500);
    },
    useFreezePass: function () {
      return defer(function () {
        D.user.freezePass.available = false;
        return D.user.freezePass;
      }, 700);
    },
    requestData: function (question) {
      return defer(function () {
        return { ok: true, question: question, relayedAt: 'just now' };
      }, 800);
    }
  };

  /* ======================================================================
     Shell - sidebar + topbar, rendered from one definition on every screen.
     ====================================================================== */
  /* Navigation mirrors the product's mental model, not the file list:
     one live session that has three views, never four separate pages. */
  var NAV = [
    { section: 'Practice' },
    { id: 'dashboard', label: 'Dashboard', icon: 'grid', href: '02-dashboard.html' },
    { id: 'queue', label: 'Find a partner', icon: 'users', href: '03-matching-queue.html', count: '14 online' },
    { id: 'library', label: 'Case library', icon: 'book', href: '10-case-library.html', count: '40' },
    { section: 'Tonight’s session', live: true },
    { id: 'split', label: 'Case terminal', icon: 'monitor', href: '06-split-view.html', live: true },
    { id: 'interviewer', label: 'Interviewer view', icon: 'eye', href: '04-case-terminal-interviewer.html', sub: true },
    { id: 'candidate', label: 'Candidate view', icon: 'pen', href: '05-case-terminal-candidate.html', sub: true },
    { id: 'rubric', label: 'Score the case', icon: 'clipboard', href: '07-rubric-submission.html', sub: true, flag: 'Required' },
    { section: 'Account' },
    { id: 'feedback', label: 'Feedback', icon: 'message', href: '08-feedback-received.html', count: '1 new' },
    { id: 'credits', label: 'Credits', icon: 'coin', href: '09-credit-ledger.html' },
    { id: 'pricing', label: 'Plan and billing', icon: 'tag', href: '11-pricing.html' }
  ];

  /* The four beats of a session. Every flow screen shows where it sits. */
  var FLOW = [
    { id: 'match', label: 'Match', href: '03-matching-queue.html', hint: 'Find a partner in your track and tier' },
    { id: 'case', label: 'Run the case', href: '06-split-view.html', hint: '45 minutes, then you swap chairs' },
    { id: 'score', label: 'Score', href: '07-rubric-submission.html', hint: 'Six dimensions and two comments, required' },
    { id: 'feedback', label: 'Feedback', href: '08-feedback-received.html', hint: 'What your partner scored you' }
  ];

  function sidebarHTML(active, prefix) {
    var out = '<div class="sidebar__brand">' +
      '<span class="sidebar__mark">' + icon('layers', 15) + '</span>' +
      '<span class="sidebar__name">CaseGrid</span>' +
      '<span class="sidebar__env">GLIM</span>' +
      '</div><nav class="nav" aria-label="Main">';

    for (var i = 0; i < NAV.length; i++) {
      var item = NAV[i];
      if (item.section) {
        out += '<div class="nav__section">' + item.section +
          (item.live ? '<span class="nav__live"><span class="dot dot--live"></span>Live</span>' : '') + '</div>';
        continue;
      }
      var isActive = item.id === active;
      out += '<a class="nav__item' + (isActive ? ' nav__item--active' : '') + (item.sub ? ' nav__item--sub' : '') +
        '" href="' + prefix + item.href + '"' +
        (isActive ? ' aria-current="page"' : '') + '>' + icon(item.icon, item.sub ? 14 : 16) +
        '<span>' + item.label + '</span>' +
        (item.flag ? '<span class="nav__flag">' + item.flag + '</span>' : '') +
        (item.count ? '<span class="nav__count">' + item.count + '</span>' : '') + '</a>';
    }
    out += '</nav><div class="sidebar__foot"><div class="sidebar__card">' +
      '<strong>Monthly plan</strong><p>Renews 12 Oct 2026 at Rs. 499. Switch to the season pass and save Rs. 997.</p>' +
      '<a class="sidebar__upgrade" href="' + prefix + '11-pricing.html">View season pass</a>' +
      '</div>' +
      '<a class="nav__item" href="' + prefix + '../allScreens.html" style="margin-top:12px">' + icon('grid', 16) + '<span>All screens</span></a>' +
      '<a class="nav__item" href="' + prefix + '../index.html">' + icon('logout', 16) + '<span>Sign out</span></a>' +
      '</div>';
    return out;
  }

  function topbarHTML(opts) {
    var u = D.user;
    var crumb = '<div class="topbar__crumb">' +
      '<span>' + (opts.section || 'Practice') + '</span>' + icon('chevronRight', 14) +
      '<span class="topbar__title">' + (opts.title || 'Dashboard') + '</span></div>';

    return crumb +
      '<div class="topbar__right">' +

      /* A button that looks like a field, so it is obviously pressable,
         and it teaches its own shortcut. */
      '<button class="searchbtn" type="button" id="cg-search">' + icon('search', 15) +
      '<span>Search cases, peers, screens</span><kbd>/</kbd></button>' +

      '<div class="pop-host">' +
      '<button class="metric-chip metric-chip--btn" type="button" id="chip-credits" aria-expanded="false">' +
      icon('coin', 15) + 'Credits <b data-bind="credits">' + u.credits + '</b>' + icon('chevronDown', 13) +
      '</button></div>' +

      '<div class="pop-host">' +
      '<button class="metric-chip metric-chip--btn metric-chip--ok" type="button" id="chip-reliability" aria-expanded="false">' +
      icon('shield', 15) + 'Reliability <b data-bind="reliability">' + u.reliability + '%</b>' + icon('chevronDown', 13) +
      '</button></div>' +

      '<div style="width:1px;height:26px;background:var(--border)"></div>' +
      '<div class="pop-host">' +
      '<button class="btn btn--ghost btn--sm" type="button" id="chip-bell" aria-label="Notifications" style="position:relative">' +
      icon('message', 16) +
      '<span style="position:absolute;top:4px;right:5px;width:6px;height:6px;border-radius:999px;background:var(--accent)"></span>' +
      '</button></div>' +
      '<div class="row" style="gap:9px">' +
      '<span class="avatar">' + u.initials + '</span>' +
      '<div style="line-height:1.25"><div style="font-size:12px;font-weight:620;color:var(--n-900)">' + u.name + '</div>' +
      '<div style="font-size:11px" class="subtle">' + u.tier + ' &middot; ' + u.track + '</div></div>' +
      '</div></div>';
  }

  /* ----- what the chips explain when you click them ----- */
  function creditsPopHTML(prefix) {
    var rules = D.creditRules, out = '', i;
    for (i = 0; i < rules.length; i++) {
      var tone = rules[i].tone === 'pos' ? 'var(--ok)' : (rules[i].tone === 'neutral' ? 'var(--text-subtle)' : 'var(--danger)');
      out += '<li class="row" style="gap:10px;align-items:flex-start;padding:6px 0">' +
        '<b class="tnum" style="width:26px;flex:none;color:' + tone + '">' + rules[i].delta + '</b>' +
        '<span class="t-sm">' + rules[i].label +
        (rules[i].note ? '<span class="t-xs subtle" style="display:block">' + rules[i].note + '</span>' : '') +
        '</span></li>';
    }
    return '<div class="pop__head">' + icon('coin', 16) + '<strong>How credits work</strong></div>' +
      '<p class="t-sm muted">Credits keep the give and take even. They are not money - your plan is separate.</p>' +
      '<ul style="margin-top:10px">' + out + '</ul>' +
      '<div class="pop__foot"><span class="t-xs subtle">Balance <b class="tnum" style="color:var(--n-900)">' + D.user.credits + '</b></span>' +
      '<a class="btn btn--sm" href="' + prefix + '09-credit-ledger.html">Open ledger</a></div>';
  }

  function reliabilityPopHTML(prefix) {
    return '<div class="pop__head">' + icon('shield', 16) + '<strong>How reliability is scored</strong></div>' +
      '<p class="t-sm muted">Attended sessions as a share of booked sessions over your last 20, with late cancellations counted twice.</p>' +
      '<div class="mono" style="margin-top:12px;background:var(--n-50);border:1px solid var(--border);border-radius:6px;padding:10px 12px;line-height:1.7">' +
      'booked&nbsp;&nbsp;&nbsp;&nbsp;20<br>attended&nbsp;&nbsp;19<br>late&nbsp;cancel&nbsp;1&nbsp;&times;2<br>' +
      '<span style="color:var(--text-subtle)">-----------------</span><br>(20&nbsp;&minus;&nbsp;2)&nbsp;/&nbsp;20&nbsp;=&nbsp;<b style="color:var(--n-900)">96%</b></div>' +
      '<p class="t-xs subtle" style="margin-top:10px">Partners see this number before accepting a match. Below 85% you drop to the back of the queue.</p>' +
      '<div class="pop__foot"><a class="btn btn--sm" href="' + prefix + '09-credit-ledger.html">See what moved it</a></div>';
  }

  function bellPopHTML(prefix) {
    var rows = [
      { ic: 'message', t: 'Siddharth Goel scored your airline case', s: '4.2 average · 12 minutes ago', href: '08-feedback-received.html', unread: true },
      { ic: 'calendar', t: 'Adeeba Kishwar confirmed 11:00 PM tonight', s: 'Kirana Quick-Commerce Margin Squeeze · 2 hours ago', href: '06-split-view.html' },
      { ic: 'coin', t: 'You earned a credit for conducting a case', s: 'Balance is now 3 · yesterday', href: '09-credit-ledger.html' }
    ];
    var out = '';
    for (var i = 0; i < rows.length; i++) {
      out += '<a class="pop__row" href="' + prefix + rows[i].href + '">' +
        '<span style="color:' + (rows[i].unread ? 'var(--accent-text)' : 'var(--text-subtle)') + '">' + icon(rows[i].ic, 15) + '</span>' +
        '<span style="min-width:0"><span class="t-sm" style="display:block;font-weight:560">' + rows[i].t + '</span>' +
        '<span class="t-xs subtle">' + rows[i].s + '</span></span>' +
        (rows[i].unread ? '<span class="dot" style="background:var(--accent);margin-left:auto;align-self:center"></span>' : '') +
        '</a>';
    }
    return '<div class="pop__head">' + icon('message', 16) + '<strong>Notifications</strong></div>' + out;
  }

  /* ======================================================================
     Flow rail - the single component that answers "where am I, what next".
     ====================================================================== */
  function flowIndex(id) {
    for (var i = 0; i < FLOW.length; i++) { if (FLOW[i].id === id) { return i; } }
    return -1;
  }

  function flowRailHTML(activeId, opts) {
    opts = opts || {};
    var prefix = opts.prefix || '';
    var idx = flowIndex(activeId);
    if (idx === -1) { return ''; }

    var out = '<div class="flowrail' + (opts.terminal ? ' flowrail--terminal' : '') + '">' +
      '<span class="flowrail__label">Session</span>';

    for (var i = 0; i < FLOW.length; i++) {
      var state = i < idx ? 'done' : (i === idx ? 'active' : 'todo');
      out += '<a class="flowstep flowstep--' + state + '" href="' + prefix + FLOW[i].href + '" title="' + FLOW[i].hint + '">' +
        '<span class="flowstep__n">' + (state === 'done' ? icon('checkSm', 11) : (i + 1)) + '</span>' +
        '<span>' + FLOW[i].label + '</span></a>';
      if (i < FLOW.length - 1) { out += '<span class="flowrail__sep"></span>'; }
    }

    out += '<span class="flowrail__hint">' + FLOW[idx].hint + '</span><div class="spacer"></div>';

    var next = FLOW[idx + 1];
    if (next) {
      out += '<span class="t-xs subtle nowrap">Next step</span>' +
        '<a class="btn btn--primary btn--sm" href="' + prefix + next.href + '">' + next.label + icon('arrowRight', 14) + '</a>';
    } else {
      out += '<a class="btn btn--sm" href="' + prefix + '03-matching-queue.html">Book another case' + icon('arrowRight', 14) + '</a>';
    }
    return out + '</div>';
  }

  function mountFlow(prefix) {
    var host = document.getElementById('cg-flow');
    if (!host) { return; }
    var id = document.body.getAttribute('data-flow');
    if (!id) { return; }
    host.innerHTML = flowRailHTML(id, {
      prefix: prefix,
      terminal: host.getAttribute('data-terminal') === 'true'
    });
  }

  /* ======================================================================
     Toasts - every state change says what it did, and to whom.
     ====================================================================== */
  function toastHost() {
    var el = document.getElementById('cg-toasts');
    if (!el) {
      el = document.createElement('div');
      el.id = 'cg-toasts';
      el.className = 'toasts';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    return el;
  }

  function toast(message, tone, detail) {
    var host = toastHost();
    var el = document.createElement('div');
    var ic = tone === 'ok' ? 'checkSm' : (tone === 'warn' ? 'alert' : (tone === 'danger' ? 'alert' : 'info'));
    el.className = 'toast' + (tone ? ' toast--' + tone : '');
    el.innerHTML = icon(ic, 16) +
      '<span style="min-width:0"><span style="display:block">' + message + '</span>' +
      (detail ? '<span class="t-xs subtle">' + detail + '</span>' : '') + '</span>' +
      '<button class="toast__x" type="button" aria-label="Dismiss">' + icon('x', 13) + '</button>';
    host.appendChild(el);

    var killed = false;
    function kill() {
      if (killed) { return; }
      killed = true;
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
      global.setTimeout(function () { if (el.parentNode) { el.parentNode.removeChild(el); } }, 180);
    }
    el.querySelector('.toast__x').addEventListener('click', kill);
    global.setTimeout(kill, 4200);
    return el;
  }

  /* ======================================================================
     Click-to-open popovers (replacing hover-only tooltips)
     ====================================================================== */
  var openPop = null;

  function closePop() {
    if (!openPop) { return; }
    if (openPop.el.parentNode) { openPop.el.parentNode.removeChild(openPop.el); }
    if (openPop.trigger) { openPop.trigger.setAttribute('aria-expanded', 'false'); }
    openPop = null;
    document.removeEventListener('mousedown', outsidePop);
  }

  function outsidePop(e) {
    if (openPop && !openPop.el.contains(e.target) && !openPop.trigger.contains(e.target)) { closePop(); }
  }

  function showPop(trigger, html) {
    var wasOpen = openPop && openPop.trigger === trigger;
    closePop();
    if (wasOpen) { return; }
    var el = document.createElement('div');
    el.className = 'pop';
    el.innerHTML = html;
    trigger.parentNode.appendChild(el);
    trigger.setAttribute('aria-expanded', 'true');
    openPop = { el: el, trigger: trigger };
    global.setTimeout(function () { document.addEventListener('mousedown', outsidePop); }, 0);
  }

  /* ======================================================================
     Drawer - for detail that should not cost you your place on the page.
     ====================================================================== */
  var drawerEls = null;

  function closeDrawer() {
    if (!drawerEls) { return; }
    drawerEls.scrim.parentNode.removeChild(drawerEls.scrim);
    drawerEls.panel.parentNode.removeChild(drawerEls.panel);
    drawerEls = null;
  }

  function openDrawer(opts) {
    closeDrawer();
    var scrim = document.createElement('div');
    scrim.className = 'drawer-scrim';
    var panel = document.createElement('aside');
    panel.className = 'drawer';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.innerHTML =
      '<div class="drawer__head"><div style="min-width:0">' +
      (opts.eyebrow ? '<div class="t-label">' + opts.eyebrow + '</div>' : '') +
      '<h2 class="t-h2" style="margin-top:3px">' + opts.title + '</h2></div>' +
      '<button class="btn btn--ghost btn--sm" type="button" id="cg-drawer-x" aria-label="Close">' + icon('x', 16) + '</button></div>' +
      '<div class="drawer__body">' + opts.body + '</div>' +
      (opts.foot ? '<div class="drawer__foot">' + opts.foot + '</div>' : '');

    document.body.appendChild(scrim);
    document.body.appendChild(panel);
    drawerEls = { scrim: scrim, panel: panel };
    scrim.addEventListener('click', closeDrawer);
    panel.querySelector('#cg-drawer-x').addEventListener('click', closeDrawer);
    var first = panel.querySelector('.drawer__foot .btn, #cg-drawer-x');
    if (first) { first.focus(); }
    return panel;
  }

  /* ======================================================================
     Command palette - the search box actually goes somewhere.
     ====================================================================== */
  var paletteEls = null;

  function paletteItems(prefix) {
    var items = [], i;
    for (i = 0; i < NAV.length; i++) {
      if (NAV[i].section) { continue; }
      items.push({ kind: 'Screen', label: NAV[i].label, icon: NAV[i].icon, href: prefix + NAV[i].href });
    }
    items.push({ kind: 'Screen', label: 'Onboarding and calibration', icon: 'sliders', href: prefix + '01-onboarding.html' });
    items.push({ kind: 'Screen', label: 'All screens', icon: 'grid', href: prefix + '../allScreens.html' });
    for (i = 0; i < D.peers.length; i++) {
      items.push({
        kind: 'Peer', label: D.peers[i].name, icon: 'users',
        meta: D.peers[i].tier + ' · ' + D.peers[i].track,
        href: prefix + '03-matching-queue.html'
      });
    }
    for (i = 0; i < D.cases.length; i++) {
      items.push({
        kind: 'Case', label: D.cases[i].title, icon: 'book',
        meta: D.cases[i].type + ' · ' + D.cases[i].difficulty,
        href: prefix + '10-case-library.html?case=' + D.cases[i].id
      });
    }
    return items;
  }

  function closePalette() {
    if (!paletteEls) { return; }
    paletteEls.scrim.parentNode.removeChild(paletteEls.scrim);
    paletteEls = null;
  }

  function openPalette(prefix) {
    if (paletteEls) { return; }
    closePop();
    var all = paletteItems(prefix || '');
    var scrim = document.createElement('div');
    scrim.className = 'palette-scrim';
    scrim.innerHTML =
      '<div class="palette" role="dialog" aria-modal="true" aria-label="Search">' +
      '<div class="palette__bar">' + icon('search', 17) +
      '<input class="palette__input" id="cg-pal-input" placeholder="Jump to a screen, case or peer" aria-label="Search" autocomplete="off">' +
      '<kbd>Esc</kbd></div>' +
      '<div class="palette__list" id="cg-pal-list"></div>' +
      '<div class="palette__foot"><kbd>&uarr;</kbd><kbd>&darr;</kbd> to move <kbd>Enter</kbd> to open</div>' +
      '</div>';
    document.body.appendChild(scrim);
    paletteEls = { scrim: scrim };

    var input = scrim.querySelector('#cg-pal-input');
    var list = scrim.querySelector('#cg-pal-list');
    var shown = [], cursor = 0;

    function draw() {
      var q = input.value.trim().toLowerCase();
      shown = all.filter(function (it) {
        return !q || (it.label + ' ' + (it.meta || '') + ' ' + it.kind).toLowerCase().indexOf(q) > -1;
      }).slice(0, 40);
      cursor = 0;
      if (!shown.length) {
        list.innerHTML = '<div class="palette__none">Nothing matches &ldquo;' + esc(input.value) + '&rdquo;. Try a case type like Profitability.</div>';
        return;
      }
      var out = '';
      for (var i = 0; i < shown.length; i++) {
        out += '<button class="palette__item' + (i === 0 ? ' palette__item--on' : '') + '" type="button" data-i="' + i + '">' +
          icon(shown[i].icon, 15) +
          '<span style="min-width:0"><span class="palette__label">' + shown[i].label + '</span>' +
          (shown[i].meta ? '<span class="t-xs subtle"> ' + shown[i].meta + '</span>' : '') + '</span>' +
          '<span class="palette__kind">' + shown[i].kind + '</span></button>';
      }
      list.innerHTML = out;
      var btns = list.querySelectorAll('.palette__item');
      for (var b = 0; b < btns.length; b++) {
        (function (n) {
          btns[n].addEventListener('click', function () { go(n); });
          btns[n].addEventListener('mousemove', function () { move(n); });
        })(b);
      }
    }

    function move(n) {
      var btns = list.querySelectorAll('.palette__item');
      if (!btns.length) { return; }
      cursor = (n + btns.length) % btns.length;
      for (var i = 0; i < btns.length; i++) {
        btns[i].className = 'palette__item' + (i === cursor ? ' palette__item--on' : '');
      }
      btns[cursor].scrollIntoView({ block: 'nearest' });
    }

    function go(n) {
      if (!shown[n]) { return; }
      global.location.href = shown[n].href;
    }

    input.addEventListener('input', draw);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(cursor + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(cursor - 1); }
      else if (e.key === 'Enter') { e.preventDefault(); go(cursor); }
    });
    scrim.addEventListener('mousedown', function (e) { if (e.target === scrim) { closePalette(); } });

    draw();
    input.focus();
  }

  /* ======================================================================
     Shell
     ====================================================================== */
  function wireTopbar(prefix) {
    var search = document.getElementById('cg-search');
    if (search) { search.addEventListener('click', function () { openPalette(prefix); }); }

    bindPop('chip-credits', function () { return creditsPopHTML(prefix); });
    bindPop('chip-reliability', function () { return reliabilityPopHTML(prefix); });
    bindPop('chip-bell', function () { return bellPopHTML(prefix); });

    function bindPop(id, html) {
      var el = document.getElementById(id);
      if (el) { el.addEventListener('click', function () { showPop(el, html()); }); }
    }
  }

  function bindGlobalKeys(prefix, withPalette) {
    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      var typing = tag === 'input' || tag === 'textarea' || tag === 'select';

      if (e.key === 'Escape') {
        if (paletteEls) { closePalette(); return; }
        if (drawerEls) { closeDrawer(); return; }
        closePop();
        return;
      }
      /* The palette only knows how to link from inside screens/. */
      if (withPalette && e.key === '/' && !typing && !paletteEls) {
        e.preventDefault();
        openPalette(prefix);
      }
    });
  }

  function mountShell() {
    var app = document.querySelector('[data-screen]');
    var prefix = app ? (app.getAttribute('data-prefix') || '') : '';

    if (app) {
      var active = app.getAttribute('data-screen');
      var side = document.getElementById('cg-sidebar');
      var top = document.getElementById('cg-topbar');
      if (side) { side.innerHTML = sidebarHTML(active, prefix); }
      if (top) {
        top.innerHTML = topbarHTML({
          title: app.getAttribute('data-title') || '',
          section: app.getAttribute('data-section') || 'Practice'
        });
        wireTopbar(prefix);
      }
    }

    mountFlow(prefix);
    bindGlobalKeys(prefix, !!app);
  }

  function syncChrome() {
    var c = document.querySelectorAll('[data-bind="credits"]');
    for (var i = 0; i < c.length; i++) { c[i].textContent = D.user.credits; }
    var r = document.querySelectorAll('[data-bind="reliability"]');
    for (var j = 0; j < r.length; j++) { r[j].textContent = D.user.reliability + '%'; }
  }

  /* ======================================================================
     Small helpers used across screens
     ====================================================================== */
  function average(scores) {
    var keys = Object.keys(scores), sum = 0;
    for (var i = 0; i < keys.length; i++) { sum += scores[keys[i]]; }
    return Math.round((sum / keys.length) * 10) / 10;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function tierFor(count) {
    if (count <= 5) { return 'Novice'; }
    if (count <= 15) { return 'Intermediate'; }
    return 'Advanced';
  }

  function countUp(el, to, suffix) {
    var from = 0, start = null, dur = 600;
    function frame(ts) {
      if (start === null) { start = ts; }
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (to - from) * eased) + (suffix || '');
      if (p < 1) { global.requestAnimationFrame(frame); }
    }
    global.requestAnimationFrame(frame);
  }

  /* Elapsed / countdown clock driven by setInterval, purely cosmetic. */
  function startClock(el, seconds, direction, onTick) {
    var t = seconds;
    function paint() {
      var m = Math.floor(Math.abs(t) / 60), s = Math.abs(t) % 60;
      el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
      if (onTick) { onTick(t); }
    }
    paint();
    return global.setInterval(function () {
      t += direction === 'down' ? -1 : 1;
      if (t < 0) { t = 0; }
      paint();
    }, 1000);
  }

  /* Inline SVG line chart - hand-rolled, no library. */
  function lineChart(points, opts) {
    opts = opts || {};
    var w = opts.width || 520, h = opts.height || 150;
    var padL = 28, padR = 8, padT = 12, padB = 22;
    var min = opts.min != null ? opts.min : 1;
    var max = opts.max != null ? opts.max : 5;
    var iw = w - padL - padR, ih = h - padT - padB;
    var step = points.length > 1 ? iw / (points.length - 1) : 0;

    function x(i) { return padL + i * step; }
    function y(v) { return padT + ih - ((v - min) / (max - min)) * ih; }

    var gridLines = '', labels = '';
    for (var g = min; g <= max; g++) {
      var gy = y(g);
      gridLines += '<line x1="' + padL + '" y1="' + gy + '" x2="' + (w - padR) + '" y2="' + gy +
        '" stroke="var(--border-subtle)" stroke-width="1"/>';
      labels += '<text x="' + (padL - 8) + '" y="' + (gy + 3.5) + '" text-anchor="end" font-size="9" fill="var(--n-400)">' + g + '</text>';
    }

    var d = '', area = '';
    for (var i = 0; i < points.length; i++) {
      d += (i === 0 ? 'M' : 'L') + x(i).toFixed(1) + ' ' + y(points[i].value).toFixed(1) + ' ';
    }
    area = d + 'L' + x(points.length - 1).toFixed(1) + ' ' + (padT + ih) + ' L' + padL + ' ' + (padT + ih) + ' Z';

    var dots = '', xlabels = '';
    for (var k = 0; k < points.length; k++) {
      var last = k === points.length - 1;
      dots += '<circle cx="' + x(k).toFixed(1) + '" cy="' + y(points[k].value).toFixed(1) + '" r="' + (last ? 4 : 3) +
        '" fill="' + (last ? 'var(--accent)' : 'var(--n-0)') + '" stroke="var(--accent)" stroke-width="1.5"/>';
      xlabels += '<text x="' + x(k).toFixed(1) + '" y="' + (h - 6) + '" text-anchor="middle" font-size="9" fill="var(--n-400)">' +
        points[k].label + '</text>';
    }

    return '<svg viewBox="0 0 ' + w + ' ' + h + '" width="100%" height="' + h + '" role="img" ' +
      'aria-label="Average rubric score across the last six sessions, rising from 3.3 to 4.2">' +
      '<defs><linearGradient id="cgArea" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="var(--accent)" stop-opacity=".16"/>' +
      '<stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>' +
      gridLines + labels +
      '<path d="' + area + '" fill="url(#cgArea)"/>' +
      '<path d="' + d.trim() + '" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      dots + xlabels + '</svg>';
  }

  var CaseGrid = {
    data: D,
    icon: icon,
    FakeAPI: FakeAPI,
    mountShell: mountShell,
    syncChrome: syncChrome,
    average: average,
    esc: esc,
    tierFor: tierFor,
    countUp: countUp,
    startClock: startClock,
    lineChart: lineChart,
    nav: NAV,
    flow: FLOW,
    toast: toast,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
    openPalette: openPalette,
    flowRailHTML: flowRailHTML
  };

  global.CaseGrid = CaseGrid;
  global.FakeAPI = FakeAPI;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountShell);
  } else {
    mountShell();
  }
})(window);
