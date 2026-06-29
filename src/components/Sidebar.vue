<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  history: {
    type: Array,
    default: () => []
  }
});

defineEmits(['update:modelValue', 'clearHistory']);

const endpoints = [
  { path: '/api/v1/profile', label: 'Profile' },
  { path: '/api/v1/skills', label: 'Skills' },
  { path: '/api/v1/experience', label: 'Experience' },
  { path: '/api/v1/projects', label: 'Projects' },
  { path: '/api/v1/education', label: 'Education' },
  { path: '/api/v1/certifications', label: 'Certifications' }
];
</script>

<template>
  <aside class="sidebar-pane">
    <div class="collection-header">
      <div class="header-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
      </div>
      <h2>SOOPARKR COLLECTION</h2>
    </div>

    <!-- Active API Endpoints -->
    <div class="endpoint-list">
      <div class="section-title">ENDPOINTS</div>
      <button 
        v-for="ep in endpoints" 
        :key="ep.path"
        @click="$emit('update:modelValue', ep.path)"
        class="endpoint-item"
        :class="{ active: modelValue === ep.path }"
      >
        <span class="method-tag get">GET</span>
        <span class="endpoint-path">{{ ep.path }}</span>
      </button>
    </div>

    <!-- Simulated History -->
    <div class="history-list">
      <div class="history-header">
        <div class="section-title">HISTORY</div>
        <button 
          v-if="history.length > 0" 
          @click="$emit('clearHistory')" 
          class="clear-history-btn"
          title="Clear recent requests"
        >
          Clear
        </button>
      </div>

      <div v-if="history.length === 0" class="history-empty">
        No recent requests
      </div>
      <div v-else class="history-items">
        <div 
          v-for="(item, idx) in history" 
          :key="idx" 
          class="history-item"
          @click="$emit('update:modelValue', item.endpoint)"
        >
          <div class="history-meta">
            <span class="method-tag get mini">GET</span>
            <span class="history-path">{{ item.endpoint }}</span>
          </div>
          <div class="history-details">
            <span class="history-status" :class="item.status === 200 ? 'status-ok' : 'status-err'">
              {{ item.status }}
            </span>
            <span class="history-time">{{ item.time }}ms</span>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-pane {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 2px solid var(--text-primary);
  background: var(--bg-secondary);
}

.collection-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 16px;
  border-bottom: 2px solid var(--text-primary);
  background: var(--bg-secondary);
}

.header-icon {
  color: var(--text-primary);
  display: flex;
  align-items: center;
}

.collection-header h2 {
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--text-primary);
}

.section-title {
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: 0.1em;
  padding: 16px 16px 8px;
}

.endpoint-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 8px;
}

.endpoint-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  background: var(--bg-secondary);
  border: 2px solid transparent;
  border-radius: var(--radius-sm);
  text-align: left;
  cursor: pointer;
  font-weight: 700;
  transition: var(--transition-smooth);
}

.endpoint-item:hover {
  background: var(--bg-tertiary);
  border-color: var(--text-primary);
}

.endpoint-item.active {
  background: var(--accent-cyan);
  border-color: var(--text-primary);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
}

.method-tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 800;
  padding: 2px 6px;
  border: 1px solid var(--text-primary);
  border-radius: 2px;
}

.method-tag.get {
  background: #FFFFFF;
  color: var(--text-primary);
}

.method-tag.get.mini {
  font-size: 0.6rem;
  padding: 1px 4px;
}

.endpoint-path {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.endpoint-item.active .endpoint-path {
  color: var(--text-primary);
}

.history-list {
  margin-top: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top: 2px solid var(--text-primary);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
}

.clear-history-btn {
  background: var(--bg-secondary);
  border: 2px solid var(--text-primary);
  color: var(--text-primary);
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 4px;
  transition: var(--transition-smooth);
}

.clear-history-btn:hover {
  background: var(--accent-rose);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
  transform: translate(-1px, -1px);
}

.history-empty {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-align: center;
  padding: 24px;
  font-style: italic;
}

.history-items {
  flex: 1;
  overflow-y: auto;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.history-item {
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  background: var(--bg-secondary);
  border: 2px solid var(--text-primary);
  cursor: pointer;
  transition: var(--transition-smooth);
}

.history-item:hover {
  background: var(--bg-tertiary);
  transform: translate(-2px, -2px);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
}

.history-meta {
  display: flex;
  align-items: center;
  gap: 6px;
}

.history-path {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.history-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  font-size: 0.7rem;
}

.history-status {
  font-weight: 800;
  font-family: var(--font-mono);
}

.status-ok {
  color: var(--accent-emerald);
}

.status-err {
  color: var(--accent-rose);
}

.history-time {
  color: var(--text-muted);
  font-family: var(--font-mono);
}
</style>
