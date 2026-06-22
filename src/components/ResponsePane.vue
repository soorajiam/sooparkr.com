<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  response: {
    type: Object,
    default: null
  },
  error: {
    type: Object,
    default: null
  },
  time: {
    type: Number,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const activeTab = ref('body'); // 'body', 'headers'
const copySuccess = ref(false);

const sizeInBytes = computed(() => {
  if (props.response) {
    return new Blob([JSON.stringify(props.response)]).size;
  }
  if (props.error) {
    return new Blob([JSON.stringify(props.error)]).size;
  }
  return 0;
});

const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  return (bytes / 1024).toFixed(2) + ' KB';
};

const syntaxHighlight = (json) => {
  if (!json) return '';
  if (typeof json !== 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, (match) => {
    let cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return `<span class="json-${cls}">${match}</span>`;
  });
};

const highlightedJson = computed(() => {
  if (props.response) return syntaxHighlight(props.response);
  if (props.error) return syntaxHighlight(props.error);
  return '';
});

const mockHeaders = computed(() => {
  if (!props.response && !props.error) return [];
  const dateStr = new Date().toUTCString();
  return [
    { key: 'Content-Type', value: 'application/json; charset=utf-8' },
    { key: 'Server', value: 'nginx/1.24.0 (Ubuntu)' },
    { key: 'Date', value: dateStr },
    { key: 'X-Powered-By', value: 'Django REST Framework' },
    { key: 'Access-Control-Allow-Origin', value: '*' },
    { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' }
  ];
});

const copyToClipboard = () => {
  const data = props.response || props.error;
  if (!data) return;
  
  navigator.clipboard.writeText(JSON.stringify(data, null, 2)).then(() => {
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  });
};
</script>

<template>
  <div class="response-pane glass-panel">
    <!-- Response Info Bar -->
    <div class="response-info-bar">
      <h3>RESPONSE</h3>
      <div v-if="response || error" class="meta-tags">
        <span 
          class="status-badge" 
          :class="response ? 'success' : 'error'"
        >
          {{ response ? '200 OK' : '404 NOT FOUND' }}
        </span>
        <span class="meta-tag" v-if="time">Time: {{ time }} ms</span>
        <span class="meta-tag">Size: {{ formatSize(sizeInBytes) }}</span>
      </div>
    </div>

    <!-- Active response interface -->
    <div class="response-content-container">
      <div v-if="isLoading" class="loader-container">
        <div class="api-loader">
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
        <p>Simulating network request latency...</p>
      </div>

      <div v-else-if="!response && !error" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        <p>Click "SEND" to fetch the portfolio data and see response JSON</p>
      </div>

      <div v-else class="response-body">
        <div class="tab-header">
          <div class="tabs">
            <button 
              @click="activeTab = 'body'" 
              class="tab-btn" 
              :class="{ active: activeTab === 'body' }"
            >
              Response JSON
            </button>
            <button 
              @click="activeTab = 'headers'" 
              class="tab-btn" 
              :class="{ active: activeTab === 'headers' }"
            >
              Headers <span class="tab-badge">{{ mockHeaders.length }}</span>
            </button>
          </div>
          <button 
            v-if="activeTab === 'body'" 
            @click="copyToClipboard" 
            class="copy-btn"
          >
            {{ copySuccess ? 'Copied!' : 'Copy JSON' }}
          </button>
        </div>

        <div class="response-tab-content">
          <!-- Raw JSON view -->
          <div v-if="activeTab === 'body'" class="code-editor">
            <pre class="json-code" v-html="highlightedJson"></pre>
          </div>

          <!-- Headers View -->
          <div v-if="activeTab === 'headers'" class="headers-list">
            <div v-for="h in mockHeaders" :key="h.key" class="header-row">
              <span class="header-name">{{ h.key }}</span>
              <span class="header-val">{{ h.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Global styles for dynamic syntax highlighting (needs to be un-scoped to apply to raw html) */
.json-key { color: #f43f5e; font-weight: 500; } /* red */
.json-string { color: #10b981; } /* emerald */
.json-number { color: #f59e0b; } /* amber */
.json-boolean { color: #06b6d4; font-weight: bold; } /* cyan */
.json-null { color: #64748b; font-style: italic; } /* gray */
</style>

<style scoped>
.response-pane {
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  height: 100%;
}

@media (max-width: 768px) {
  .response-pane {
    height: auto;
  }
  
  .response-tab-content {
    max-height: 380px;
    overflow-y: auto;
  }
}



.response-info-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 12px;
}

.response-info-bar h3 {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.meta-tags {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-badge {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

.status-badge.success {
  background: rgba(16, 185, 129, 0.15);
  color: var(--accent-emerald);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.1);
}

.status-badge.error {
  background: rgba(244, 63, 94, 0.15);
  color: var(--accent-rose);
  box-shadow: 0 0 10px rgba(244, 63, 94, 0.1);
}

.meta-tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

.response-content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 200px;
}

.loader-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: var(--text-secondary);
}

.api-loader {
  position: relative;
  width: 50px;
  height: 50px;
}

.api-loader .circle {
  position: absolute;
  border: 4px solid var(--accent-cyan);
  opacity: 0;
  border-radius: 50%;
  animation: ripple 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
}

.api-loader .circle:nth-child(2) {
  animation-delay: -0.6s;
}

@keyframes ripple {
  0% {
    top: 25px;
    left: 25px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 50px;
    height: 50px;
    opacity: 0;
  }
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: var(--text-muted);
  text-align: center;
  font-size: 0.8rem;
  padding: 40px 20px;
}

.empty-state svg {
  animation: pulse 2.5s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
}

.response-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-light);
  background: rgba(0, 0, 0, 0.1);
}

.tabs {
  display: flex;
}

.tab-btn {
  background: transparent;
  border: none;
  padding: 8px 16px;
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: var(--transition-smooth);
}

.tab-btn:hover {
  color: var(--text-primary);
}

.tab-btn.active {
  color: var(--accent-cyan);
  border-bottom-color: var(--accent-cyan);
}

.tab-badge {
  background: var(--bg-tertiary);
  color: var(--text-muted);
  font-size: 0.65rem;
  padding: 1px 4px;
  border-radius: 8px;
}

.copy-btn {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-light);
  color: var(--text-secondary);
  font-size: 0.7rem;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.copy-btn:hover {
  color: var(--text-primary);
  background: var(--text-muted);
}

.response-tab-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  background: #050811;
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
  border: 1px solid var(--border-light);
  border-top: none;
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

.code-editor {
  height: 100%;
}

.json-code {
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.6;
}

.headers-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.header-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  padding: 6px 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  font-size: 0.75rem;
}

.header-name {
  color: var(--accent-cyan);
  font-weight: 600;
}

.header-val {
  color: var(--text-secondary);
  word-break: break-all;
}
</style>
