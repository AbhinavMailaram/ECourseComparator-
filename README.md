const state = {
  courses: [],
  selected: [],
  search: '',
  category: 'all',
  level: 'all',
  sort: 'score-desc',
};

const elements = {
  coursesGrid: document.getElementById('coursesGrid'),
  categoryFilter: document.getElementById('categoryFilter'),
  levelFilter: document.getElementById('levelFilter'),
  sortSelect: document.getElementById('sortSelect'),
  searchInput: document.getElementById('searchInput'),
  comparisonTable: document.getElementById('comparisonTable'),
  selectionSummary: document.getElementById('selectionSummary'),
  coursesCount: document.getElementById('coursesCount'),
  avgPrice: document.getElementById('avgPrice'),
  avgRating: document.getElementById('avgRating'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
  focusCompareBtn: document.getElementById('focusCompareBtn'),
};

const formatCurrency = (value) => `$${value}`;

const getVisibleCourses = () => {
  const { courses, search, category, level, sort } = state;

  const filtered = courses.filter((course) => {
    const matchesSearch = [course.title, course.provider, course.description, ...course.skills]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === 'all' || course.category === category;
    const matchesLevel = level === 'all' || course.level === level;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sorted = [...filtered];

  sorted.sort((a, b) => {
    switch (sort) {
      case 'rating-desc':
        return b.rating - a.rating;
      case 'price-asc':
        return a.price - b.price;
      case 'duration-asc':
        return parseInt(a.duration, 10) - parseInt(b.duration, 10);
      case 'score-desc':
      default:
        return b.score - a.score;
    }
  });

  return sorted;
};

const populateFilters = () => {
  const categories = [...new Set(state.courses.map((course) => course.category))].sort();
  const levels = [...new Set(state.courses.map((course) => course.level))].sort();

  elements.categoryFilter.innerHTML = `
    <option value="all">All categories</option>
    ${categories.map((category) => `<option value="${category}">${category}</option>`).join('')}
  `;

  elements.levelFilter.innerHTML = `
    <option value="all">All levels</option>
    ${levels.map((level) => `<option value="${level}">${level}</option>`).join('')}
  `;

  elements.categoryFilter.value = state.category;
  elements.levelFilter.value = state.level;
  elements.sortSelect.value = state.sort;
};

const updateStats = (visibleCourses) => {
  const avgPrice = visibleCourses.length
    ? visibleCourses.reduce((total, course) => total + course.price, 0) / visibleCourses.length
    : 0;

  const avgRating = visibleCourses.length
    ? visibleCourses.reduce((total, course) => total + course.rating, 0) / visibleCourses.length
    : 0;

  elements.coursesCount.textContent = String(visibleCourses.length);
  elements.avgPrice.textContent = formatCurrency(Math.round(avgPrice));
  elements.avgRating.textContent = avgRating ? avgRating.toFixed(1) : '0.0';
};

const renderSelectionSummary = () => {
  if (!state.selected.length) {
    elements.selectionSummary.innerHTML = '<span>No courses selected</span>';
    return;
  }

  const selectedNames = state.selected
    .map((courseId) => state.courses.find((course) => course.id === courseId)?.title)
    .filter(Boolean)
    .join(', ');

  elements.selectionSummary.innerHTML = `
    <span>Selected: <strong>${selectedNames}</strong></span>
  `;
};

const toggleCourseSelection = (courseId) => {
  const isSelected = state.selected.includes(courseId);

  if (isSelected) {
    state.selected = state.selected.filter((id) => id !== courseId);
  } else {
    if (state.selected.length >= 3) {
      state.selected = [...state.selected.slice(1), courseId];
    } else {
      state.selected = [...state.selected, courseId];
    }
  }

  renderSelectionSummary();
  renderCourses();
  renderComparison();
};

const renderCourses = () => {
  const visibleCourses = getVisibleCourses();
  updateStats(visibleCourses);

  if (!visibleCourses.length) {
    elements.coursesGrid.innerHTML = `
      <div class="course-card">
        <h3>No matching courses</h3>
        <p class="course-description">Try clearing your filters or searching for a different skill.</p>
      </div>
    `;
    return;
  }

  elements.coursesGrid.innerHTML = visibleCourses
    .map((course) => {
      const selected = state.selected.includes(course.id);
      return `
        <article class="course-card ${selected ? 'selected' : ''}">
          <div class="course-top">
            <div>
              <div class="badge">${course.level}</div>
              <h3>${course.title}</h3>
              <div class="course-provider">${course.provider}</div>
            </div>
            <span class="meta-pill">${course.score}/100</span>
          </div>

          <p class="course-description">${course.description}</p>

          <div class="meta-row">
            <span class="meta-pill">★ ${course.rating} (${course.reviews})</span>
            <span class="meta-pill">${course.duration}</span>
            <span class="meta-pill">${course.mode}</span>
          </div>

          <div class="skill-list">
            ${course.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join('')}
          </div>

          <div class="card-footer">
            <div class="price-group">
              <strong>${formatCurrency(course.price)}</strong>
              <span>${course.category}</span>
            </div>
            <button class="select-btn" data-course-id="${course.id}" type="button">
              ${selected ? 'Selected' : 'Select'}
            </button>
          </div>
        </article>
      `;
    })
    .join('');

  document.querySelectorAll('[data-course-id]').forEach((button) => {
    button.addEventListener('click', () => toggleCourseSelection(button.dataset.courseId));
  });
};

const renderComparison = () => {
  if (!state.selected.length) {
    elements.comparisonTable.innerHTML = '<p class="placeholder-text">Select up to 3 courses to compare.</p>';
    return;
  }

  const selectedCourses = state.selected
    .map((courseId) => state.courses.find((course) => course.id === courseId))
    .filter(Boolean);

  elements.comparisonTable.innerHTML = selectedCourses
    .map(
      (course) => `
        <div class="compare-card">
          <h3>${course.title}</h3>
          <div class="compare-body">
            <div class="metric-row"><span>Provider</span><strong>${course.provider}</strong></div>
            <div class="metric-row"><span>Level</span><strong>${course.level}</strong></div>
            <div class="metric-row"><span>Rating</span><strong>${course.rating} / 5</strong></div>
            <div class="metric-row"><span>Price</span><strong>${formatCurrency(course.price)}</strong></div>
            <div class="metric-row"><span>Duration</span><strong>${course.duration}</strong></div>
            <div class="metric-row"><span>Career fit</span><strong>${course.careerFit}%</strong></div>
            <div class="metric-row"><span>Popularity</span><strong>${course.popularity}%</strong></div>
            <div class="metric-row"><span>Skills</span><strong>${course.skills.join(', ')}</strong></div>
          </div>
        </div>
      `,
    )
    .join('');
};

const bindEvents = () => {
  elements.searchInput.addEventListener('input', (event) => {
    state.search = event.target.value;
    renderCourses();
  });

  elements.categoryFilter.addEventListener('change', (event) => {
    state.category = event.target.value;
    renderCourses();
  });

  elements.levelFilter.addEventListener('change', (event) => {
    state.level = event.target.value;
    renderCourses();
  });

  elements.sortSelect.addEventListener('change', (event) => {
    state.sort = event.target.value;
    renderCourses();
  });

  elements.resetFiltersBtn.addEventListener('click', () => {
    state.search = '';
    state.category = 'all';
    state.level = 'all';
    state.sort = 'score-desc';
    elements.searchInput.value = '';
    populateFilters();
    renderCourses();
  });

  elements.focusCompareBtn.addEventListener('click', () => {
    document.querySelector('.comparison-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

const init = async () => {
  try {
    const response = await fetch('/api/courses');
    const payload = await response.json();
    state.courses = payload.courses || [];
    populateFilters();
    renderSelectionSummary();
    renderCourses();
    renderComparison();
    bindEvents();
  } catch (error) {
    console.error('Failed to load courses', error);
    elements.coursesGrid.innerHTML = `
      <div class="course-card">
        <h3>Unable to load courses</h3>
        <p class="course-description">Please check the server and try again.</p>
      </div>
    `;
  }
};

init();
