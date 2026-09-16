// PrepPulse Interview Preparation Tracker - App Logic
(function () {
  'use strict';

  // --- Initial Seed Data ---
  const INITIAL_DSA = [
    {
      id: 'dsa-1',
      title: 'Two Sum',
      url: 'https://leetcode.com/problems/two-sum/',
      category: 'Arrays & Hashing',
      difficulty: 'Easy',
      status: 'Solved',
      confidence: 5,
      notes: 'Hash map complement lookup for O(N) time and O(N) space. Watch for duplicate elements.'
    },
    {
      id: 'dsa-2',
      title: 'Trapping Rain Water',
      url: 'https://leetcode.com/problems/trapping-rain-water/',
      category: 'Two Pointers',
      difficulty: 'Hard',
      status: 'Needs Review',
      confidence: 3,
      notes: 'Two pointer approach tracking left_max and right_max. O(1) extra space. Review pointer movement condition.'
    },
    {
      id: 'dsa-3',
      title: 'LRU Cache',
      url: 'https://leetcode.com/problems/lru-cache/',
      category: 'Stack & Queue',
      difficulty: 'Medium',
      status: 'Solved',
      confidence: 5,
      notes: 'Hash map + Doubly Linked List with dummy head/tail for O(1) get & put operations.'
    },
    {
      id: 'dsa-4',
      title: 'Binary Tree Maximum Path Sum',
      url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
      category: 'Trees & BST',
      difficulty: 'Hard',
      status: 'Solved',
      confidence: 4,
      notes: 'Post-order DFS returning max single-branch sum while updating global max with left+right+val.'
    },
    {
      id: 'dsa-5',
      title: 'Longest Substring Without Repeating Characters',
      url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      category: 'Sliding Window',
      difficulty: 'Medium',
      status: 'Solved',
      confidence: 4,
      notes: 'Sliding window with hash map storing character latest index; jump left pointer to max(left, prev_idx + 1).'
    },
    {
      id: 'dsa-6',
      title: 'Course Schedule II',
      url: 'https://leetcode.com/problems/course-schedule-ii/',
      category: 'Graphs & BFS/DFS',
      difficulty: 'Medium',
      status: 'Needs Review',
      confidence: 3,
      notes: 'Kahns algorithm for Topological Sort using in-degree array and queue. Detect cycle if output size != numCourses.'
    },
    {
      id: 'dsa-7',
      title: 'Coin Change',
      url: 'https://leetcode.com/problems/coin-change/',
      category: 'Dynamic Programming',
      difficulty: 'Medium',
      status: 'In Progress',
      confidence: 3,
      notes: 'Bottom-up DP table dp[i] = min(dp[i], dp[i - coin] + 1) initialized to amount + 1.'
    },
    {
      id: 'dsa-8',
      title: 'Search in Rotated Sorted Array',
      url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
      category: 'Binary Search',
      difficulty: 'Medium',
      status: 'Todo',
      confidence: 2,
      notes: 'Identify which half is strictly sorted (nums[low] <= nums[mid]), then check if target lies within that sorted half.'
    }
  ];

  const INITIAL_SYSTEM_DESIGN = [
    {
      id: 'sys-1',
      title: 'Distributed Rate Limiter',
      tag: 'High-Level Design',
      difficulty: 'Medium',
      status: 'Solved',
      summary: 'Throttling malicious/excessive client traffic before reaching internal microservices.',
      keyPoints: [
        'Sliding Window Counter algorithm using Redis Sorted Sets',
        'Distributed lock vs Token Bucket with Redis Lua script for atomicity',
        'Handling multi-region sync & client IP / API key fingerprinting'
      ],
      confidence: 4
    },
    {
      id: 'sys-2',
      title: 'URL Shortener (TinyURL)',
      tag: 'Data Modeling & Storage',
      difficulty: 'Easy',
      status: 'Solved',
      summary: 'High read-to-write ratio service generating unique 7-character aliases.',
      keyPoints: [
        'Base62 encoding of 64-bit auto-incrementing ID',
        'Distributed ID generator (Snowflake or pre-generated token range clusters)',
        'Redis cache with LRU eviction for top 20% viral URLs'
      ],
      confidence: 5
    },
    {
      id: 'sys-3',
      title: 'Real-Time Chat Messenger',
      tag: 'Streaming & WebSockets',
      difficulty: 'Hard',
      status: 'Needs Review',
      summary: '1-to-1 and group messaging with presence indicators and offline notifications.',
      keyPoints: [
        'WebSocket connection servers backed by Redis Pub/Sub for routing',
        'Cassandra / ScyllaDB for append-only sequential chat history',
        'Message ordering with vector clocks / sequence IDs'
      ],
      confidence: 3
    }
  ];

  const INITIAL_BEHAVIORAL = [
    {
      id: 'beh-1',
      title: 'P0 Production Outage & Root-Cause Fix',
      principle: 'Ownership & Bias for Action',
      status: 'Solved',
      situation: 'A sudden memory leak in the core checkout service caused 500 error spikes during a major campaign launch.',
      task: 'Identify the offending deployment, prevent customer loss, and prevent regressions without rollbacks that had database schema dependencies.',
      action: 'Isolated heap dump to identify unclosed HTTP connection pools in a third-party payment client. Wrote an emergency hotfix and applied connection limits.',
      result: 'Restored checkout availability in 22 minutes with zero double-billing. Authored post-mortem and added automated leak detection to the staging pipeline.'
    },
    {
      id: 'beh-2',
      title: 'Resolving Architectural Disagreement on Event Streaming',
      principle: 'Have Backbone; Disagree & Commit',
      status: 'Needs Review',
      situation: 'A senior teammate advocated for a complex Kafka multi-cluster setup for a low-throughput internal notification tool.',
      task: 'Align the team on a maintainable, cost-effective solution without causing friction or prolonged delays.',
      action: 'Built a 1-page trade-off matrix comparing operational overhead, latency, and AWS SQS/SNS pricing vs Kafka. Led a collaborative 30-min whiteboarding session.',
      result: 'Team agreed on SQS/SNS, cutting monthly infrastructure cost by $4,200 and shipping 2 weeks ahead of schedule.'
    }
  ];

  const INITIAL_PIPELINE = [
    {
      id: 'pipe-1',
      company: 'Google',
      role: 'Software Engineer III / L5',
      stage: 'Onsite',
      date: 'Sep 28, 2026',
      notes: 'Virtual onsite: 3 Coding rounds, 1 System Design, 1 Googliness & Leadership.'
    },
    {
      id: 'pipe-2',
      company: 'Meta',
      role: 'Production Engineer (E5)',
      stage: 'Technical',
      date: 'Oct 04, 2026',
      notes: 'Coding + Systems Internals Screen. Revise Linux debugging, epoll, and concurrency.'
    },
    {
      id: 'pipe-3',
      company: 'Stripe',
      role: 'Backend Engineer',
      stage: 'Screen',
      date: 'Oct 08, 2026',
      notes: 'Initial recruiter call complete. Next: practical bug squash & API design pair programming.'
    },
    {
      id: 'pipe-4',
      company: 'Datadog',
      role: 'Distributed Systems Eng',
      stage: 'Applied',
      date: 'Sep 12, 2026',
      notes: 'Referred via university alumni. Resume under review.'
    }
  ];

  // --- State Management ---
  const STORAGE_KEY = 'preppulse_tracker_state_v1';

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read localStorage:', e);
    }
    return {
      dsa: INITIAL_DSA,
      systemDesign: INITIAL_SYSTEM_DESIGN,
      behavioral: INITIAL_BEHAVIORAL,
      pipeline: INITIAL_PIPELINE
    };
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  const appState = loadState();

  // --- DOM Elements ---
  const dsaTableBody = document.getElementById('dsaTableBody');
  const dsaEmptyState = document.getElementById('dsaEmptyState');
  const dsaSearchInput = document.getElementById('dsaSearchInput');
  const dsaCategoryFilter = document.getElementById('dsaCategoryFilter');
  const dsaDifficultyFilter = document.getElementById('dsaDifficultyFilter');
  const dsaStatusFilter = document.getElementById('dsaStatusFilter');

  const systemDesignGrid = document.getElementById('systemDesignGrid');
  const behavioralGrid = document.getElementById('behavioralGrid');

  // Badges & Counters
  const dsaTabCount = document.getElementById('dsaTabCount');
  const sysTabCount = document.getElementById('sysTabCount');
  const behTabCount = document.getElementById('behTabCount');
  const pipelineTabCount = document.getElementById('pipelineTabCount');

  const dsaTotalBadge = document.getElementById('dsaTotalBadge');
  const easyCountEl = document.getElementById('easyCount');
  const medCountEl = document.getElementById('medCount');
  const hardCountEl = document.getElementById('hardCount');
  const easySeg = document.getElementById('easySeg');
  const medSeg = document.getElementById('medSeg');
  const hardSeg = document.getElementById('hardSeg');

  const radialPercent = document.getElementById('radialPercent');
  const radialCircle = document.getElementById('radialCircle');
  const solvedTargetCount = document.getElementById('solvedTargetCount');
  const sysDesignBadge = document.getElementById('sysDesignBadge');
  const sysMeterFill = document.getElementById('sysMeterFill');
  const behBadge = document.getElementById('behBadge');
  const activePipelineCount = document.getElementById('activePipelineCount');
  const needsReviewCount = document.getElementById('needsReviewCount');

  // Modal elements
  const entryModal = document.getElementById('entryModal');
  const entryForm = document.getElementById('entryForm');
  const openAddModalBtn = document.getElementById('openAddModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const modalTitle = document.getElementById('modalTitle');
  const entryTrackType = document.getElementById('entryTrackType');
  const entryTitle = document.getElementById('entryTitle');
  const entryCategory = document.getElementById('entryCategory');
  const entryDifficulty = document.getElementById('entryDifficulty');
  const entryStatus = document.getElementById('entryStatus');
  const entryConfidence = document.getElementById('entryConfidence');
  const entryNotes = document.getElementById('entryNotes');

  const addSysDesignBtn = document.getElementById('addSysDesignBtn');
  const addBehavioralBtn = document.getElementById('addBehavioralBtn');
  const addCompanyBtn = document.getElementById('addCompanyBtn');

  // --- Tab Navigation ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = {
    'dsa': document.getElementById('dsaTabContent'),
    'system-design': document.getElementById('systemDesignTabContent'),
    'behavioral': document.getElementById('behavioralTabContent'),
    'pipeline': document.getElementById('pipelineTabContent')
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      Object.keys(tabPanels).forEach(key => {
        if (key === target) {
          tabPanels[key].classList.add('active');
        } else {
          tabPanels[key].classList.remove('active');
        }
      });
    });
  });

  // --- Status & Difficulty Helpers ---
  function getStatusClass(status) {
    switch (status) {
      case 'Solved': return 'status-solved';
      case 'Needs Review': return 'status-review';
      case 'In Progress': return 'status-prog';
      default: return 'status-todo';
    }
  }

  function getDifficultyClass(diff) {
    switch (diff) {
      case 'Easy': return 'diff-easy';
      case 'Medium': return 'diff-med';
      case 'Hard': return 'diff-hard';
      default: return 'diff-med';
    }
  }

  function renderStars(rating) {
    const r = parseInt(rating, 10) || 3;
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < r ? '★' : '☆';
    }
    return `<span style="color: #f59e0b; letter-spacing: 1px;">${stars}</span>`;
  }

  // --- Render DSA Table ---
  function renderDSA() {
    const query = (dsaSearchInput.value || '').trim().toLowerCase();
    const category = dsaCategoryFilter.value;
    const difficulty = dsaDifficultyFilter.value;
    const status = dsaStatusFilter.value;

    const filtered = appState.dsa.filter(item => {
      const matchesQuery = !query ||
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        (item.notes && item.notes.toLowerCase().includes(query));

      const matchesCat = category === 'ALL' || item.category === category;
      const matchesDiff = difficulty === 'ALL' || item.difficulty === difficulty;
      const matchesStat = status === 'ALL' || item.status === status;

      return matchesQuery && matchesCat && matchesDiff && matchesStat;
    });

    dsaTableBody.innerHTML = '';

    if (filtered.length === 0) {
      dsaEmptyState.classList.remove('hidden');
    } else {
      dsaEmptyState.classList.add('hidden');

      filtered.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td style="color: var(--text-muted); font-size: 0.8rem;">${index + 1}</td>
          <td>
            <a href="${item.url || '#'}" target="_blank" rel="noopener noreferrer" class="prob-title">
              ${item.title}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </td>
          <td><span class="category-tag">${item.category}</span></td>
          <td><span class="diff-pill ${getDifficultyClass(item.difficulty)}">${item.difficulty}</span></td>
          <td>
            <button class="status-pill-toggle ${getStatusClass(item.status)}" data-id="${item.id}" title="Click to cycle status">
              ● ${item.status}
            </button>
          </td>
          <td>${renderStars(item.confidence)}</td>
          <td><div class="notes-snippet" title="${item.notes || ''}">${item.notes || '—'}</div></td>
          <td style="text-align: right;">
            <div class="table-actions">
              <button class="action-icon-btn delete-dsa-btn" data-id="${item.id}" title="Delete entry">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        `;
        dsaTableBody.appendChild(tr);
      });
    }

    // Attach row toggle listeners
    document.querySelectorAll('.status-pill-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        cycleDSAStatus(id);
      });
    });

    // Attach delete listeners
    document.querySelectorAll('.delete-dsa-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        deleteItem('dsa', id);
      });
    });

    updateMetrics();
  }

  function cycleDSAStatus(id) {
    const item = appState.dsa.find(x => x.id === id);
    if (!item) return;

    const cycle = ['Solved', 'Needs Review', 'In Progress', 'Todo'];
    const currIdx = cycle.indexOf(item.status);
    item.status = cycle[(currIdx + 1) % cycle.length];

    saveState(appState);
    renderDSA();
  }

  // --- Render System Design ---
  function renderSystemDesign() {
    systemDesignGrid.innerHTML = '';
    appState.systemDesign.forEach(item => {
      const card = document.createElement('div');
      card.className = 'sys-card';
      const bulletList = (item.keyPoints || []).map(pt => `<li>${pt}</li>`).join('');

      card.innerHTML = `
        <div>
          <div class="sys-card-header">
            <div>
              <h3 class="sys-title">${item.title}</h3>
              <span class="sys-tag">${item.tag}</span>
            </div>
            <span class="badge ${item.status === 'Solved' ? 'badge-success' : 'badge-accent'}">${item.status}</span>
          </div>
          <p class="sys-summary" style="margin-top: 10px;">${item.summary || ''}</p>
          <ul class="sys-bullets" style="margin-top: 12px;">
            ${bulletList}
          </ul>
        </div>
        <div class="sys-card-footer">
          <span>Confidence: ${renderStars(item.confidence)}</span>
          <button class="action-icon-btn delete-sys-btn" data-id="${item.id}" title="Remove">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      `;
      systemDesignGrid.appendChild(card);
    });

    document.querySelectorAll('.delete-sys-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        deleteItem('systemDesign', id);
      });
    });
  }

  // --- Render Behavioral STAR ---
  function renderBehavioral() {
    behavioralGrid.innerHTML = '';
    appState.behavioral.forEach(item => {
      const card = document.createElement('div');
      card.className = 'star-card';
      card.innerHTML = `
        <div class="star-card-header">
          <div>
            <h3 class="star-title">${item.title}</h3>
            <span class="star-principle">${item.principle}</span>
          </div>
          <button class="action-icon-btn delete-beh-btn" data-id="${item.id}" title="Remove story">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>

        <div class="star-steps">
          <div class="star-step">
            <div class="step-label">Situation</div>
            <div class="step-content">${item.situation || '—'}</div>
          </div>
          <div class="star-step">
            <div class="step-label">Task</div>
            <div class="step-content">${item.task || '—'}</div>
          </div>
          <div class="star-step">
            <div class="step-label">Action</div>
            <div class="step-content">${item.action || '—'}</div>
          </div>
          <div class="star-step">
            <div class="step-label">Result</div>
            <div class="step-content">${item.result || '—'}</div>
          </div>
        </div>
      `;
      behavioralGrid.appendChild(card);
    });

    document.querySelectorAll('.delete-beh-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        deleteItem('behavioral', id);
      });
    });
  }

  // --- Render Applications Pipeline (Kanban) ---
  function renderPipeline() {
    const stages = ['Applied', 'Screen', 'Technical', 'Onsite', 'Offer'];
    stages.forEach(stage => {
      const container = document.getElementById(`stage-${stage}`);
      const countEl = document.getElementById(`count-${stage}`);
      if (!container) return;

      container.innerHTML = '';
      const itemsInStage = appState.pipeline.filter(x => x.stage === stage);
      if (countEl) countEl.textContent = itemsInStage.length;

      itemsInStage.forEach(item => {
        const card = document.createElement('div');
        card.className = 'company-card';
        card.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div class="company-name">${item.company}</div>
            <button class="action-icon-btn delete-pipe-btn" data-id="${item.id}" title="Remove">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
          <div class="role-title">${item.role}</div>
          <p style="font-size: 0.76rem; color: var(--text-secondary); margin-bottom: 8px;">${item.notes || ''}</p>
          <div class="company-meta">
            <span>📅 ${item.date || 'Active'}</span>
            <select class="pipeline-stage-select filter-select" data-id="${item.id}" style="padding: 2px 6px; font-size: 0.72rem;">
              ${stages.map(s => `<option value="${s}" ${s === item.stage ? 'selected' : ''}>${s}</option>`).join('')}
            </select>
          </div>
        `;
        container.appendChild(card);
      });
    });

    document.querySelectorAll('.pipeline-stage-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const newStage = e.currentTarget.value;
        const target = appState.pipeline.find(x => x.id === id);
        if (target) {
          target.stage = newStage;
          saveState(appState);
          renderPipeline();
          updateMetrics();
        }
      });
    });

    document.querySelectorAll('.delete-pipe-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        deleteItem('pipeline', id);
      });
    });
  }

  // --- Global Delete Helper ---
  function deleteItem(track, id) {
    if (confirm('Are you sure you want to remove this item?')) {
      appState[track] = appState[track].filter(x => x.id !== id);
      saveState(appState);
      renderAll();
    }
  }

  // --- Metrics Calculation & Updates ---
  function updateMetrics() {
    // Badges on tabs
    dsaTabCount.textContent = appState.dsa.length;
    sysTabCount.textContent = appState.systemDesign.length;
    behTabCount.textContent = appState.behavioral.length;
    pipelineTabCount.textContent = appState.pipeline.length;

    // DSA stats
    const solvedDsa = appState.dsa.filter(x => x.status === 'Solved');
    const easySolved = solvedDsa.filter(x => x.difficulty === 'Easy').length;
    const medSolved = solvedDsa.filter(x => x.difficulty === 'Medium').length;
    const hardSolved = solvedDsa.filter(x => x.difficulty === 'Hard').length;
    const totalSolved = solvedDsa.length;

    dsaTotalBadge.textContent = `${totalSolved} Solved`;
    easyCountEl.textContent = easySolved;
    medCountEl.textContent = medSolved;
    hardCountEl.textContent = hardSolved;

    if (totalSolved > 0) {
      easySeg.style.width = `${Math.round((easySolved / totalSolved) * 100)}%`;
      medSeg.style.width = `${Math.round((medSolved / totalSolved) * 100)}%`;
      hardSeg.style.width = `${Math.round((hardSolved / totalSolved) * 100)}%`;
    } else {
      easySeg.style.width = '33%';
      medSeg.style.width = '33%';
      hardSeg.style.width = '34%';
    }

    // Readiness widget (Target: 120 total milestones)
    const targetMilestones = 120;
    const combinedCompleted = totalSolved + appState.systemDesign.filter(x => x.status === 'Solved').length * 2 + appState.behavioral.length * 2;
    const pct = Math.min(100, Math.round((combinedCompleted / targetMilestones) * 100));
    radialPercent.textContent = `${pct}%`;
    radialCircle.setAttribute('stroke-dasharray', `${pct}, 100`);
    solvedTargetCount.textContent = combinedCompleted;

    // System design
    const sysSolved = appState.systemDesign.filter(x => x.status === 'Solved').length;
    sysDesignBadge.textContent = `${sysSolved} / ${appState.systemDesign.length} Mastered`;
    const sysPct = appState.systemDesign.length > 0 ? Math.round((sysSolved / appState.systemDesign.length) * 100) : 0;
    sysMeterFill.style.width = `${sysPct}%`;

    // Behavioral & Pipeline
    behBadge.textContent = `${appState.behavioral.length} Stories`;
    activePipelineCount.textContent = `${appState.pipeline.length} Companies`;

    const needsReviewTotal = appState.dsa.filter(x => x.status === 'Needs Review').length +
      appState.systemDesign.filter(x => x.status === 'Needs Review').length;
    needsReviewCount.textContent = `${needsReviewTotal} Items`;
  }

  // --- Modal Logic ---
  function openModal(defaultTrack = 'dsa') {
    entryTrackType.value = defaultTrack;
    updateModalFormFields(defaultTrack);
    entryForm.reset();
    entryTrackType.value = defaultTrack;
    entryModal.classList.remove('hidden');
    entryTitle.focus();
  }

  function closeModal() {
    entryModal.classList.add('hidden');
  }

  function updateModalFormFields(track) {
    const labelTitle = document.getElementById('labelTitle');
    const labelCategory = document.getElementById('labelCategory');
    const labelNotes = document.getElementById('labelNotes');

    if (track === 'dsa') {
      modalTitle.textContent = 'Add New DSA Problem';
      labelTitle.textContent = 'Problem Name';
      entryTitle.placeholder = 'e.g. Trapping Rain Water';
      labelCategory.textContent = 'Topic / Category';
      entryCategory.placeholder = 'e.g. Two Pointers';
      labelNotes.textContent = 'Key Takeaways & Complexity';
    } else if (track === 'system-design') {
      modalTitle.textContent = 'Add System Design Topic';
      labelTitle.textContent = 'System / Concept Name';
      entryTitle.placeholder = 'e.g. Distributed Message Queue';
      labelCategory.textContent = 'Subsystem / Architecture';
      entryCategory.placeholder = 'e.g. Streaming & Storage';
      labelNotes.textContent = 'Key Components & Trade-offs';
    } else if (track === 'behavioral') {
      modalTitle.textContent = 'Add Behavioral / STAR Story';
      labelTitle.textContent = 'Story Title';
      entryTitle.placeholder = 'e.g. Navigating Team Technical Disagreement';
      labelCategory.textContent = 'Core Principle / Competency';
      entryCategory.placeholder = 'e.g. Disagree and Commit';
      labelNotes.textContent = 'STAR Summary (Situation, Task, Action, Result)';
    } else if (track === 'pipeline') {
      modalTitle.textContent = 'Add Company Application';
      labelTitle.textContent = 'Company Name';
      entryTitle.placeholder = 'e.g. Stripe';
      labelCategory.textContent = 'Role / Level';
      entryCategory.placeholder = 'e.g. Senior Backend Engineer';
      labelNotes.textContent = 'Upcoming Dates & Recruiter Notes';
    }
  }

  entryTrackType.addEventListener('change', (e) => {
    updateModalFormFields(e.target.value);
  });

  openAddModalBtn.addEventListener('click', () => openModal('dsa'));
  if (addSysDesignBtn) addSysDesignBtn.addEventListener('click', () => openModal('system-design'));
  if (addBehavioralBtn) addBehavioralBtn.addEventListener('click', () => openModal('behavioral'));
  if (addCompanyBtn) addCompanyBtn.addEventListener('click', () => openModal('pipeline'));

  closeModalBtn.addEventListener('click', closeModal);
  cancelModalBtn.addEventListener('click', closeModal);

  entryModal.addEventListener('click', (e) => {
    if (e.target === entryModal) closeModal();
  });

  // Handle Form Submit
  entryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const track = entryTrackType.value;
    const title = entryTitle.value.trim();
    const category = entryCategory.value.trim() || 'General';
    const difficulty = entryDifficulty.value;
    const status = entryStatus.value;
    const confidence = parseInt(entryConfidence.value, 10) || 3;
    const notes = entryNotes.value.trim();

    if (!title) return;

    const id = `${track}-${Date.now()}`;

    if (track === 'dsa') {
      appState.dsa.unshift({
        id,
        title,
        url: '#',
        category,
        difficulty,
        status,
        confidence,
        notes
      });
      // Switch tab to dsa
      document.querySelector('.tab-btn[data-tab="dsa"]').click();
    } else if (track === 'system-design') {
      appState.systemDesign.unshift({
        id,
        title,
        tag: category,
        difficulty,
        status: status === 'Solved' ? 'Solved' : 'Needs Review',
        summary: notes || 'Architecture overview and scalability bottlenecks.',
        keyPoints: [
          'High throughput & fault tolerance configuration',
          'Data consistency guarantees & caching strategy'
        ],
        confidence
      });
      document.querySelector('.tab-btn[data-tab="system-design"]').click();
    } else if (track === 'behavioral') {
      appState.behavioral.unshift({
        id,
        title,
        principle: category,
        status: 'Solved',
        situation: notes || 'Context and background of the project challenge.',
        task: 'Direct scope of responsibility and key blockers.',
        action: 'Steps taken to overcome obstacles and coordinate stakeholders.',
        result: 'Measurable impact, post-mortem takeaways, and business success.'
      });
      document.querySelector('.tab-btn[data-tab="behavioral"]').click();
    } else if (track === 'pipeline') {
      appState.pipeline.unshift({
        id,
        company: title,
        role: category,
        stage: 'Applied',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        notes
      });
      document.querySelector('.tab-btn[data-tab="pipeline"]').click();
    }

    saveState(appState);
    closeModal();
    renderAll();
  });

  // Filter Listeners
  dsaSearchInput.addEventListener('input', renderDSA);
  dsaCategoryFilter.addEventListener('change', renderDSA);
  dsaDifficultyFilter.addEventListener('change', renderDSA);
  dsaStatusFilter.addEventListener('change', renderDSA);

  // --- Initial Render ---
  function renderAll() {
    renderDSA();
    renderSystemDesign();
    renderBehavioral();
    renderPipeline();
    updateMetrics();
  }

  renderAll();
})();
