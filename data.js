/* CaseGrid - seeded mock data. Single global, no network, no storage. */
(function (global) {
  'use strict';

  var RUBRIC_DIMENSIONS = [
    {
      id: 'structuring',
      label: 'Problem Structuring',
      short: 'Structuring',
      blurb: 'MECE breakdown, clarifying questions, a stated approach before diving in.',
      anchors: {
        1: 'No framework. Jumped to answers without laying out the problem.',
        2: 'Borrowed a textbook framework without tailoring it to the case.',
        3: 'Workable structure, some overlap between buckets.',
        4: 'Tailored, largely MECE tree with a clear driver hierarchy.',
        5: 'Bespoke structure, prioritised buckets, stated what they would not look at.'
      }
    },
    {
      id: 'hypothesis',
      label: 'Hypothesis Generation',
      short: 'Hypothesis',
      blurb: 'Forms an early point of view and tests it rather than boiling the ocean.',
      anchors: {
        1: 'Exhaustive search, no point of view at any stage.',
        2: 'Hypothesis stated only after being prompted twice.',
        3: 'Formed a hypothesis but did not revise it as data arrived.',
        4: 'Led with a hypothesis and updated it on the Exhibit 2 reveal.',
        5: 'Sharp early hypothesis, explicitly falsified it, redirected the analysis.'
      }
    },
    {
      id: 'numeracy',
      label: 'Numerical Agility',
      short: 'Numeracy',
      blurb: 'Speed and accuracy of mental math, sanity checks, unit discipline.',
      anchors: {
        1: 'Arithmetic errors left uncorrected; lost track of units.',
        2: 'Correct eventually but slow, needed the interviewer to re-anchor.',
        3: 'Accurate at a steady pace, few sanity checks.',
        4: 'Fast, rounded sensibly, sanity-checked the order of magnitude.',
        5: 'Fast and exact, pre-empted the sensitivity the numbers implied.'
      }
    },
    {
      id: 'judgement',
      label: 'Business Judgement',
      short: 'Judgement',
      blurb: 'Commercial realism, second-order effects, feasibility of recommendations.',
      anchors: {
        1: 'Recommendations disconnected from the industry economics.',
        2: 'Generic levers that would apply to any business.',
        3: 'Reasonable levers, thin on implementation reality.',
        4: 'Industry-specific insight, named the key trade-off.',
        5: 'Named the trade-off, the second-order effect and who would resist it.'
      }
    },
    {
      id: 'synthesis',
      label: 'Synthesis',
      short: 'Synthesis',
      blurb: 'Answer-first recommendation, supported, with risks and next steps.',
      anchors: {
        1: 'Recounted the analysis instead of answering the question.',
        2: 'Answer buried at the end of a long narration.',
        3: 'Answer-first but supports were listed, not prioritised.',
        4: 'Crisp answer-first close with three supports and a risk.',
        5: 'Board-ready close: answer, supports, risk, and the next 30-day step.'
      }
    },
    {
      id: 'composure',
      label: 'Executive Composure',
      short: 'Composure',
      blurb: 'Pace, signposting, recovery under pushback, presence on the call.',
      anchors: {
        1: 'Visibly rattled by pushback; long unsignposted silences.',
        2: 'Recovered slowly, filler-heavy, spoke over the interviewer.',
        3: 'Steady tone, signposting inconsistent.',
        4: 'Signposted every transition, took silence deliberately.',
        5: 'Calm under sustained pushback, reframed the challenge as an input.'
      }
    }
  ];

  var USER = {
    id: 'u-karthik',
    name: 'Jampana Karthik',
    initials: 'JK',
    age: 27,
    program: 'PGPM 2026-27',
    school: 'Great Lakes Institute of Management',
    city: 'Chennai',
    email: 'karthik.jampana@greatlakes.edu.in',
    track: 'Consulting',
    tier: 'Advanced',
    casesDone: 22,
    credits: 3,
    reliability: 96,
    practiceWindow: { start: '22:30', end: '01:30', label: '10:30 PM - 1:30 AM' },
    freezePass: {
      available: true,
      lastUsed: '14 Sep 2026',
      nextAvailable: '28 Sep 2026',
      noticeMinutes: 90,
      cycleDays: 14
    }
  };

  var PEERS = [
    { id: 'p-titiksha', name: 'Titiksha Handique', initials: 'TH', track: 'Product', tier: 'Intermediate', casesDone: 11, reliability: 94, program: 'PGPM 2026-27', online: true, window: '9:00 PM - 12:00 AM', lastCase: 'Kirana Quick-Commerce Margin Squeeze' },
    { id: 'p-siddharth', name: 'Siddharth Goel', initials: 'SG', track: 'Finance', tier: 'Advanced', casesDone: 19, reliability: 98, program: 'PGPM 2026-27', online: true, window: '10:00 PM - 1:00 AM', lastCase: 'Carve-out of a Speciality Chemicals Arm' },
    { id: 'p-nikhil', name: 'Nikhil Ruthwik', initials: 'NR', track: 'General Management', tier: 'Novice', casesDone: 3, reliability: 89, program: 'PGDM 2026-28', online: true, window: '11:00 PM - 2:00 AM', lastCase: 'Campus Cafeteria Throughput' },
    { id: 'p-adeeba', name: 'Adeeba Kishwar', initials: 'AK', track: 'Consulting', tier: 'Advanced', casesDone: 24, reliability: 97, program: 'PGPM 2026-27', online: true, window: '10:30 PM - 1:30 AM', lastCase: 'Regional Airline Route Rationalisation' },
    { id: 'p-aryan', name: 'Aryan Manglik', initials: 'AM', track: 'Consulting', tier: 'Advanced', casesDone: 17, reliability: 92, program: 'PGPM 2026-27', online: false, window: '9:30 PM - 12:30 AM', lastCase: 'Diagnostics Chain Network Design' },
    { id: 'p-bharath', name: 'Bharath M', initials: 'BM', track: 'Operations', tier: 'Intermediate', casesDone: 13, reliability: 91, program: 'PGPM 2026-27', online: true, window: '10:00 PM - 12:30 AM', lastCase: 'Tyre Plant Changeover Losses' },
    { id: 'p-shinjini', name: 'Shinjini Dasgupta', initials: 'SD', track: 'Product', tier: 'Advanced', casesDone: 21, reliability: 95, program: 'PGPM 2026-27', online: false, window: '8:30 PM - 11:00 PM', lastCase: 'Vernacular Audio App Retention Collapse' }
  ];

  var CASE_TYPES = ['Profitability', 'Market Entry', 'M&A', 'Operations', 'Guesstimate'];
  var DIFFICULTIES = ['Novice', 'Intermediate', 'Advanced'];

  /* What the candidate is actually asked, by case type. Shown before you commit
     to a case so nobody opens one blind. */
  var TYPE_BRIEFS = {
    'Profitability': {
      asked: 'Profit has moved in the wrong direction. Find out which line caused it, then say what you would do about it.',
      watch: 'Interviewers score hard on whether you built a per-unit economics tree before touching the exhibits.'
    },
    'Market Entry': {
      asked: 'A client is considering a new market, segment or channel. Decide whether they should go in, and on what terms.',
      watch: 'The trap is a market-size answer with no view on whether the client can win. Get to competition and capability.'
    },
    'M&A': {
      asked: 'An acquirer is looking at a target. Work out whether the deal creates value and what it is worth.',
      watch: 'Standalone value, synergies and integration risk are three separate questions. Keep them separate out loud.'
    },
    'Operations': {
      asked: 'A process is losing throughput, yield or money. Find the bottleneck and fix it within the client’s constraints.',
      watch: 'Walk the process end to end before theorising. Interviewers reward candidates who ask what happens at each step.'
    },
    'Guesstimate': {
      asked: 'Size something with no data in front of you. Show your structure, state your assumptions, sanity-check the answer.',
      watch: 'Say your assumptions out loud and flag which one your answer is most sensitive to. Precision is not the point.'
    }
  };

  var DONE_CASE_IDS = ['cs-01', 'cs-05', 'cs-06', 'cs-08', 'cs-12', 'cs-16', 'cs-21', 'cs-26', 'cs-34'];

  var CASES = [
    ['cs-01', 'Declining Margins at a Chennai Dosa Chain', 'Profitability', 'Food Service', 'Novice', 34],
    ['cs-02', 'Two-Wheeler EV Entry into Tier-2 Cities', 'Market Entry', 'Automotive', 'Intermediate', 28],
    ['cs-03', 'Carve-out of a Speciality Chemicals Arm', 'M&A', 'Chemicals', 'Advanced', 12],
    ['cs-04', 'Tyre Plant Changeover Losses', 'Operations', 'Manufacturing', 'Intermediate', 19],
    ['cs-05', 'Cups of Filter Coffee Sold in Chennai Daily', 'Guesstimate', 'Consumer', 'Novice', 41],
    ['cs-06', 'Kirana Quick-Commerce Margin Squeeze', 'Profitability', 'Retail', 'Advanced', 23],
    ['cs-07', 'Diagnostics Chain Network Design', 'Operations', 'Healthcare', 'Advanced', 15],
    ['cs-08', 'Regional Airline Route Rationalisation', 'Profitability', 'Aviation', 'Advanced', 17],
    ['cs-09', 'D2C Ayurveda Brand Enters Modern Trade', 'Market Entry', 'FMCG', 'Intermediate', 26],
    ['cs-10', 'Litres of Paint Used in Bengaluru Per Year', 'Guesstimate', 'Building Materials', 'Novice', 37],
    ['cs-11', 'NBFC Acquires a Gold Loan Book', 'M&A', 'Financial Services', 'Advanced', 9],
    ['cs-12', 'Campus Cafeteria Throughput', 'Operations', 'Food Service', 'Novice', 44],
    ['cs-13', 'Vernacular Audio App Retention Collapse', 'Profitability', 'Media', 'Intermediate', 22],
    ['cs-14', 'Solar Rooftop Installer Goes Commercial', 'Market Entry', 'Energy', 'Intermediate', 18],
    ['cs-15', 'Hospital Chain Merges Two Cath Labs', 'M&A', 'Healthcare', 'Advanced', 11],
    ['cs-16', 'Textile Exporter Loses a Key Buyer', 'Profitability', 'Textiles', 'Intermediate', 25],
    ['cs-17', 'Number of ATMs Needed in Coimbatore', 'Guesstimate', 'Financial Services', 'Novice', 33],
    ['cs-18', 'Cold Chain for a Dairy Co-operative', 'Operations', 'Agriculture', 'Intermediate', 20],
    ['cs-19', 'Edtech Pivots from B2C to School Licensing', 'Market Entry', 'Education', 'Intermediate', 31],
    ['cs-20', 'Cement Player Buys a Grinding Unit', 'M&A', 'Cement', 'Advanced', 8],
    ['cs-21', 'Multiplex Chain Weekday Occupancy', 'Profitability', 'Entertainment', 'Novice', 29],
    ['cs-22', 'Wedding Photographers Working in India', 'Guesstimate', 'Services', 'Novice', 30],
    ['cs-23', 'Auto Components Supplier Adds a Shift', 'Operations', 'Automotive', 'Intermediate', 16],
    ['cs-24', 'Premium Coffee Chain Enters Kochi', 'Market Entry', 'Food Service', 'Novice', 35],
    ['cs-25', 'Logistics Aggregator Buys a Trucking Fleet', 'M&A', 'Logistics', 'Advanced', 10],
    ['cs-26', 'Apparel Retailer Discount Addiction', 'Profitability', 'Retail', 'Intermediate', 27],
    ['cs-27', 'Steel Plant Yield Loss in Hot Rolling', 'Operations', 'Metals', 'Advanced', 13],
    ['cs-28', 'Insurance Broker Launches a Digital Arm', 'Market Entry', 'Insurance', 'Advanced', 14],
    ['cs-29', 'Tonnes of E-Waste Generated in Tamil Nadu', 'Guesstimate', 'Environment', 'Intermediate', 21],
    ['cs-30', 'Budget Hotel Group Post-Pandemic Recovery', 'Profitability', 'Hospitality', 'Intermediate', 24],
    ['cs-31', 'Seed Company Acquires a Trait Licence', 'M&A', 'Agriculture', 'Advanced', 7],
    ['cs-32', 'Warehouse Pick-Path Redesign', 'Operations', 'Logistics', 'Intermediate', 23],
    ['cs-33', 'Telecom Tower Firm Enters Small Cells', 'Market Entry', 'Telecom', 'Advanced', 12],
    ['cs-34', 'Cab Aggregator Driver Churn', 'Profitability', 'Mobility', 'Intermediate', 32],
    ['cs-35', 'Weight of Water in a Municipal Pipeline', 'Guesstimate', 'Utilities', 'Intermediate', 18],
    ['cs-36', 'Speciality Hospital Adds an Oncology Wing', 'Market Entry', 'Healthcare', 'Advanced', 15],
    ['cs-37', 'Printing Press Order Book Collapse', 'Profitability', 'Printing', 'Novice', 26],
    ['cs-38', 'Two Banks Merge Their Branch Networks', 'M&A', 'Banking', 'Advanced', 11],
    ['cs-39', 'Handset Assembly Line Rework Rate', 'Operations', 'Electronics', 'Intermediate', 19],
    ['cs-40', 'Idlis Consumed in Tamil Nadu Each Morning', 'Guesstimate', 'Consumer', 'Novice', 39]
  ].map(function (row) {
    return {
      id: row[0],
      title: row[1],
      type: row[2],
      industry: row[3],
      difficulty: row[4],
      batchCompletions: row[5],
      duration: 45,
      done: DONE_CASE_IDS.indexOf(row[0]) > -1
    };
  });

  /* The case loaded in the terminal screens. */
  var ACTIVE_CASE = {
    id: 'cs-06',
    title: 'Kirana Quick-Commerce Margin Squeeze',
    type: 'Profitability',
    industry: 'Retail',
    difficulty: 'Advanced',
    duration: 45,
    prompt: 'Our client is Saral, a quick-commerce operator running 140 dark stores across eight Indian cities. Orders have grown 38% year on year, but contribution margin per order has fallen from Rs. 21 to Rs. 4 over the same period. The board wants to know why, and what to do about it before the next funding round in March.',
    context: [
      'Average order value is Rs. 412, roughly flat year on year.',
      'Saral charges a Rs. 25 delivery fee on orders below Rs. 500; 62% of orders fall below that line.',
      'Riders are paid per delivery, not per hour.',
      'The client will not raise the delivery fee this quarter - a competitor dropped theirs to zero in June.'
    ],
    solutionKey: [
      { heading: 'Expected structure', body: 'Contribution margin per order = gross margin + delivery fee - rider cost - packaging - dark store variable cost. A strong candidate builds this per-order P&L before touching the exhibits.' },
      { heading: 'Where the margin actually went', body: 'Gross margin percentage is stable. The collapse is 70% rider cost per order (Rs. 38 to Rs. 61) and 30% a mix shift towards sub-Rs.-500 baskets where the fee does not cover the drop.' },
      { heading: 'Why rider cost rose', body: 'Batching fell from 2.4 to 1.3 orders per trip after the 10-minute promise launched in April. The promise is self-inflicted, not a market cost.' },
      { heading: 'Recommendation worth a 5', body: 'Relax the 10-minute promise to 20 minutes on sub-Rs.-500 baskets only, restoring batching on the low-value tail while protecting the premium tier. Quantifies roughly Rs. 13 per order recovered, flags the brand risk, proposes a two-city pilot.' },
      { heading: 'Common traps', body: 'Candidates who chase discounting or "increase AOV" without testing rider cost usually stall around minute 30. Push them towards per-trip economics.' }
    ],
    triggers: [
      { id: 't1', at: 'If stuck past minute 8', text: 'Ask them to write the per-order P&L before continuing. Do not accept a plain revenue-versus-cost split.' },
      { id: 't2', at: 'After Exhibit 1', text: 'Ask which of these cost lines is within the client’s control this quarter.' },
      { id: 't3', at: 'If they land on rider cost', text: 'Push back once: "The rider market rate rose for everyone. Why is that our problem?"' }
    ],
    exhibits: [
      {
        id: 'ex1',
        name: 'Exhibit 1',
        title: 'Per-order economics, FY25 vs FY26',
        released: true,
        caption: 'Rider cost per order rose from Rs. 38 to Rs. 61; gross margin held at 24%.',
        rows: [
          ['Line item', 'FY25', 'FY26'],
          ['Average order value', 'Rs. 408', 'Rs. 412'],
          ['Gross margin', 'Rs. 98', 'Rs. 99'],
          ['Delivery fee collected', 'Rs. 16', 'Rs. 15'],
          ['Rider cost', 'Rs. 38', 'Rs. 61'],
          ['Packaging', 'Rs. 9', 'Rs. 10'],
          ['Dark store variable', 'Rs. 46', 'Rs. 39'],
          ['Contribution per order', 'Rs. 21', 'Rs. 4']
        ]
      },
      {
        id: 'ex2',
        name: 'Exhibit 2',
        title: 'Orders per rider trip by city, Jan to Aug FY26',
        released: false,
        caption: 'Batching fell sharply in April, the month the 10-minute promise launched.',
        rows: [
          ['City', 'Jan', 'Apr', 'Aug'],
          ['Chennai', '2.4', '1.6', '1.3'],
          ['Hyderabad', '2.6', '1.7', '1.4'],
          ['Pune', '2.2', '1.5', '1.2'],
          ['Lucknow', '2.9', '2.1', '1.9']
        ]
      }
    ],
    scratchpad: [
      'CM/order: 21 -> 4. Gap = Rs. 17',
      'Revenue side flat (AOV 408 -> 412) ... so it is cost',
      'Rider 38 -> 61 = Rs. 23 swing. Bigger than the whole gap!',
      'Dark store came DOWN 46 -> 39, offsets +7',
      'Hyp: cost per ORDER up, not cost per RIDER',
      '=> orders per trip must have fallen. Need Ex 2.'
    ]
  };

  var SESSIONS = {
    next: {
      id: 's-next',
      when: 'Tonight, 11:00 PM IST',
      dateLabel: 'Sat 20 Sep',
      partner: 'Adeeba Kishwar',
      partnerId: 'p-adeeba',
      role: 'You interview first',
      caseTitle: 'Kirana Quick-Commerce Margin Squeeze',
      status: 'Confirmed',
      duration: 45
    },
    recent: [
      { id: 's-06', date: '18 Sep', partner: 'Siddharth Goel', caseTitle: 'Regional Airline Route Rationalisation', role: 'Candidate', avg: 4.2, scores: { structuring: 4, hypothesis: 4, numeracy: 5, judgement: 4, synthesis: 4, composure: 4 } },
      { id: 's-05', date: '15 Sep', partner: 'Adeeba Kishwar', caseTitle: 'Apparel Retailer Discount Addiction', role: 'Interviewer', avg: null, scores: null },
      { id: 's-04', date: '12 Sep', partner: 'Shinjini Dasgupta', caseTitle: 'Cab Aggregator Driver Churn', role: 'Candidate', avg: 3.8, scores: { structuring: 4, hypothesis: 3, numeracy: 5, judgement: 4, synthesis: 3, composure: 4 } },
      { id: 's-03', date: '09 Sep', partner: 'Aryan Manglik', caseTitle: 'Multiplex Chain Weekday Occupancy', role: 'Candidate', avg: 3.7, scores: { structuring: 4, hypothesis: 3, numeracy: 4, judgement: 4, synthesis: 3, composure: 4 } },
      { id: 's-02', date: '05 Sep', partner: 'Titiksha Handique', caseTitle: 'Textile Exporter Loses a Key Buyer', role: 'Candidate', avg: 3.5, scores: { structuring: 4, hypothesis: 3, numeracy: 4, judgement: 3, synthesis: 3, composure: 4 } },
      { id: 's-01', date: '01 Sep', partner: 'Bharath M', caseTitle: 'Cold Chain for a Dairy Co-operative', role: 'Candidate', avg: 3.3, scores: { structuring: 3, hypothesis: 3, numeracy: 4, judgement: 3, synthesis: 3, composure: 4 } }
    ]
  };

  /* Overall average across the last six graded sessions, oldest first. */
  var TREND = [
    { label: '01 Sep', value: 3.3 },
    { label: '05 Sep', value: 3.5 },
    { label: '09 Sep', value: 3.7 },
    { label: '12 Sep', value: 3.8 },
    { label: '15 Sep', value: 4.0 },
    { label: '18 Sep', value: 4.2 }
  ];

  /* Feedback the candidate receives after the airline case. */
  var FEEDBACK = {
    sessionId: 's-06',
    caseTitle: 'Regional Airline Route Rationalisation',
    date: '18 Sep 2026',
    interviewer: 'Siddharth Goel',
    interviewerInitials: 'SG',
    interviewerTier: 'Advanced',
    role: 'Candidate',
    scores: { structuring: 4, hypothesis: 4, numeracy: 5, judgement: 4, synthesis: 4, composure: 4 },
    previousAverage: { structuring: 3.8, hypothesis: 3.0, numeracy: 4.3, judgement: 3.5, synthesis: 3.0, composure: 4.0 },
    comments: {
      strength: 'The route-level P&L you built in the first four minutes was the best structure I have seen this month. You separated fixed aircraft cost from variable turn cost before I gave you a single number, and that is exactly why the Exhibit 2 reveal did not throw you. Your mental math on load factor break-even (68.4%) was fast, you rounded in the right direction, and you said which direction you had rounded.',
      growth: 'You buried the recommendation. At minute 38 you had the answer - cut the two sub-60% load factor routes and redeploy to the Coimbatore corridor - but you walked me through six minutes of analysis before saying it. Lead with the answer, then support it. Second thing: when I pushed back on the redeployment you defended the number instead of hearing the slot constraint I was hinting at. Treat pushback as a new input, not an attack.'
    },
    growthAreas: [
      { title: 'Answer-first synthesis', dimension: 'Synthesis', detail: 'Your synthesis score has sat at 3 for four of the last five sessions while every other dimension climbed. Close the last five minutes of every case with a 30-second recommendation before any supporting detail.' },
      { title: 'Absorbing pushback', dimension: 'Executive Composure', detail: 'Composure holds at 4 but dips in the final third when challenged. In your next three cases, ask your interviewer to push back twice on purpose.' }
    ]
  };

  var LEDGER = [
    { id: 'l-09', date: '18 Sep 2026', time: '11:47 PM', type: 'Interviewed', description: 'Candidate - Regional Airline Route Rationalisation with Siddharth Goel', delta: -1, balance: 3, reliability: 96, reliabilityDelta: 0 },
    { id: 'l-08', date: '17 Sep 2026', time: '10:12 PM', type: 'Conducted', description: 'Interviewer - Warehouse Pick-Path Redesign with Bharath M', delta: 1, balance: 4, reliability: 96, reliabilityDelta: 0 },
    { id: 'l-07', date: '15 Sep 2026', time: '11:30 PM', type: 'Conducted', description: 'Interviewer - Apparel Retailer Discount Addiction with Adeeba Kishwar', delta: 1, balance: 3, reliability: 96, reliabilityDelta: 0 },
    { id: 'l-06', date: '14 Sep 2026', time: '09:02 PM', type: 'Freeze Pass', description: 'Syndicate Freeze Pass used - rescheduled with 106 minutes notice', delta: 0, balance: 2, reliability: 96, reliabilityDelta: 0, badge: 'freeze' },
    { id: 'l-05', date: '12 Sep 2026', time: '11:52 PM', type: 'Interviewed', description: 'Candidate - Cab Aggregator Driver Churn with Shinjini Dasgupta', delta: -1, balance: 2, reliability: 96, reliabilityDelta: 0 },
    { id: 'l-04', date: '10 Sep 2026', time: '10:41 PM', type: 'Penalty', description: 'Cancelled 38 minutes before start - Cement Player Buys a Grinding Unit', delta: -2, balance: 3, reliability: 96, reliabilityDelta: -3, badge: 'penalty' },
    { id: 'l-03', date: '09 Sep 2026', time: '11:15 PM', type: 'Conducted', description: 'Interviewer - Multiplex Chain Weekday Occupancy with Aryan Manglik', delta: 1, balance: 5, reliability: 99, reliabilityDelta: 1 },
    { id: 'l-02', date: '05 Sep 2026', time: '10:30 PM', type: 'Interviewed', description: 'Candidate - Textile Exporter Loses a Key Buyer with Titiksha Handique', delta: -1, balance: 4, reliability: 98, reliabilityDelta: 0 },
    { id: 'l-01', date: '01 Sep 2026', time: '11:05 PM', type: 'Joining grant', description: 'Calibration completed - three starter credits issued', delta: 3, balance: 5, reliability: 98, reliabilityDelta: 0 }
  ];

  var PRICING = {
    monthly: {
      name: 'Monthly',
      price: 'Rs. 499',
      unit: 'per month',
      note: 'Billed monthly. Cancel any time before the next cycle.',
      cta: 'Start monthly'
    },
    season: {
      name: 'Season Pass',
      price: 'Rs. 1,999',
      unit: 'for four months',
      note: 'Covers the full placement season, September through December.',
      cta: 'Get the season pass',
      badge: 'Saves Rs. 997',
      effective: 'Works out to Rs. 500 a month'
    },
    features: [
      { label: 'Peer case sessions per month', monthly: 'Unlimited', season: 'Unlimited' },
      { label: 'Case library access', monthly: 'All 40 cases', season: 'All 40 cases' },
      { label: 'Structured rubric feedback', monthly: true, season: true },
      { label: 'Rubric trend analytics', monthly: 'Last 6 sessions', season: 'Full season history' },
      { label: 'Priority matching inside your window', monthly: false, season: true },
      { label: 'Syndicate Freeze Pass', monthly: 'One per 14 days', season: 'One per 14 days' },
      { label: 'Cross-tier shadowing (observe only)', monthly: false, season: true },
      { label: 'Placement-week surge slots', monthly: false, season: true },
      { label: 'Interviewer calibration report', monthly: false, season: true },
      { label: 'Credit rollover between months', monthly: false, season: true }
    ],
    faq: [
      { q: 'What happens to my credits if I stop paying?', a: 'Credits stay on your account for 90 days. You cannot book a session without an active plan, but nothing is deleted.' },
      { q: 'Is the season pass refundable?', a: 'In full within the first 14 days, as long as you have used fewer than three sessions.' },
      { q: 'Do I need credits as well as a plan?', a: 'Yes. The plan gives you access; credits govern the give and take. Conducting a case earns one, being interviewed spends one.' }
    ]
  };

  var QUEUE = {
    onlineInTier: 14,
    matchOn: { track: 'Consulting', tier: 'Advanced', window: '10:30 PM - 1:30 AM' },
    match: {
      partnerId: 'p-adeeba',
      caseId: 'cs-06',
      caseTitle: 'Kirana Quick-Commerce Margin Squeeze',
      firstInterviewer: 'You',
      startsIn: '2 minutes'
    }
  };

  var TIERS = [
    { name: 'Novice', range: '0 to 5 cases', min: 0, max: 5 },
    { name: 'Intermediate', range: '6 to 15 cases', min: 6, max: 15 },
    { name: 'Advanced', range: '16 or more cases', min: 16, max: 9999 }
  ];

  var CREDIT_RULES = [
    { label: 'Conduct a case as interviewer', delta: '+1', tone: 'pos' },
    { label: 'Be interviewed as candidate', delta: '−1', tone: 'neg' },
    { label: 'Cancel within 60 minutes of start', delta: '−2', tone: 'penalty', note: 'Reliability score drops as well.' },
    { label: 'Syndicate Freeze Pass, 90 minutes notice', delta: '0', tone: 'neutral', note: 'One penalty-free reschedule every 14 days.' }
  ];

  global.CASEGRID_DATA = {
    user: USER,
    peers: PEERS,
    cases: CASES,
    caseTypes: CASE_TYPES,
    typeBriefs: TYPE_BRIEFS,
    difficulties: DIFFICULTIES,
    activeCase: ACTIVE_CASE,
    sessions: SESSIONS,
    trend: TREND,
    feedback: FEEDBACK,
    ledger: LEDGER,
    pricing: PRICING,
    queue: QUEUE,
    tiers: TIERS,
    creditRules: CREDIT_RULES,
    rubric: RUBRIC_DIMENSIONS
  };
})(window);
