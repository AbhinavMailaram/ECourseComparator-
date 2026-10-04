* {
  box-sizing: border-box;
}

:root {
  --bg: #f5f7fb;
  --panel: #ffffff;
  --panel-alt: #eef3ff;
  --primary: #2d5df6;
  --primary-dark: #1d42c9;
  --secondary: #16a085;
  --text: #14213d;
  --muted: #6d7b93;
  --border: #e3e8f3;
  --accent: #f2b5a7;
  --shadow: 0 18px 38px rgba(16, 24, 40, 0.08);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(180deg, #eef4ff 0%, var(--bg) 80%);
  color: var(--text);
}

button,
input,
select {
  font: inherit;
}

.page-shell {
  max-width: 1500px;
  margin: 0 auto;
  padding: 32px 20px 48px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 22px;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--primary);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  font-weight: 700;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 2.4vw, 3rem);
}

.topbar-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

button {
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
}

button:hover {
  transform: translateY(-1px);
}

.primary-btn {
  background: linear-gradient(135deg, var(--primary) 0%, #5b7cff 100%);
  color: white;
  padding: 12px 18px;
  font-weight: 700;
  box-shadow: 0 10px 22px rgba(45, 93, 246, 0.25);
}

.ghost-btn {
  background: var(--panel);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 12px 18px;
  font-weight: 600;
}

.dashboard {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 390px;
  gap: 20px;
  align-items: start;
}

.filters-panel,
.comparison-panel,
.content-panel {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: var(--shadow);
}

.filters-panel,
.comparison-panel {
  padding: 20px;
}

.panel-block + .panel-block {
  margin-top: 20px;
}

.search-wrap {
  display: grid;
  gap: 8px;
  font-size: 0.82rem;
  color: var(--muted);
  font-weight: 600;
}

.search-wrap input,
.field-group select {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #f7f9ff;
  color: var(--text);
  padding: 12px 14px;
}

.field-group {
  display: grid;
  gap: 8px;
  font-size: 0.82rem;
  color: var(--muted);
  font-weight: 600;
}

.field-group + .field-group {
  margin-top: 16px;
}

h2 {
  margin: 0 0 12px;
  font-size: 1.1rem;
}

.stats-panel {
  padding-top: 8px;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.stat-grid div {
  background: var(--panel-alt);
  border-radius: 16px;
  padding: 14px 12px;
  text-align: center;
  border: 1px solid #dfe9ff;
}

.stat-grid span {
  display: block;
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--primary-dark);
}

.stat-grid small {
  color: var(--muted);
}

.content-panel {
  padding: 18px;
}

.selection-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #edf3ff 0%, #f3f7ff 100%);
  border: 1px solid #dfe8ff;
  border-radius: 14px;
  padding: 14px 16px;
  color: var(--muted);
  font-weight: 600;
  margin-bottom: 18px;
}

.selection-summary strong {
  color: var(--text);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 18px;
}

.course-card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 10px 20px rgba(4, 29, 79, 0.04);
}

.course-card.selected {
  border-color: rgba(45, 93, 246, 0.45);
  box-shadow: 0 14px 26px rgba(45, 93, 246, 0.12);
}

.course-top {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.badge {
  font-size: 0.7rem;
  background: #ebf7f3;
  color: #0e7a62;
  border-radius: 999px;
  padding: 6px 10px;
  font-weight: 700;
}

.course-card h3 {
  margin: 0;
  font-size: 1.1rem;
}

.course-provider {
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 600;
}

.course-description {
  color: var(--muted);
  line-height: 1.5;
  font-size: 0.92rem;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.meta-pill {
  background: #f1f5ff;
  border: 1px solid #dde6ff;
  color: var(--text);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.74rem;
  font-weight: 600;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: #f7f9ff;
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 5px 8px;
  font-size: 0.72rem;
  font-weight: 600;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: auto;
}

.price-group {
  display: grid;
  gap: 3px;
}

.price-group strong {
  font-size: 1.2rem;
}

.price-group span {
  color: var(--muted);
  font-size: 0.72rem;
}

.select-btn {
  background: rgba(45, 93, 246, 0.08);
  color: var(--primary-dark);
  border: 1px solid rgba(45, 93, 246, 0.2);
  padding: 10px 12px;
  font-weight: 700;
  border-radius: 10px;
}

.course-card.selected .select-btn {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.comparison-table {
  display: grid;
  gap: 18px;
}

.placeholder-text {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

.compare-card {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 18px;
  overflow: hidden;
}

.compare-card h3 {
  margin: 0;
  padding: 16px;
  background: linear-gradient(135deg, #edf3ff 0%, #f8faff 100%);
  border-bottom: 1px solid var(--border);
  font-size: 1rem;
}

.compare-body {
  display: grid;
  gap: 10px;
  padding: 16px;
}

.metric-row {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  font-size: 0.88rem;
  color: var(--muted);
  border-bottom: 1px dashed var(--border);
  padding-bottom: 8px;
}

.metric-row strong {
  color: var(--text);
}

@media (max-width: 1200px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .comparison-panel {
    order: 3;
  }
}

@media (max-width: 640px) {
  .page-shell {
    padding-inline: 14px;
  }

  .topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .topbar-actions {
    width: 100%;
  }

  .topbar-actions button {
    flex: 1;
  }
}
