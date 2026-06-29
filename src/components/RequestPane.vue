<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'sendRequest']);

const methods = ['GET', 'POST', 'PUT', 'DELETE'];
const selectedMethod = ref('GET');
const displayUrl = ref('https://api.sooparkr.com' + props.modelValue);

// Sync displayUrl when prop changes
watch(() => props.modelValue, (newVal) => {
  displayUrl.value = 'https://api.sooparkr.com' + newVal;
});

// Update parents when user edits path
const onUrlChange = () => {
  const pathPart = displayUrl.value.replace('https://api.sooparkr.com', '').replace('http://api.sooparkr.com', '');
  emit('update:modelValue', pathPart);
};

const activeTab = ref('params'); // 'params', 'headers', 'body'

const queryParams = ref([
  { key: 'format', value: 'json', description: 'Response payload structure' },
  { key: 'ref', value: 'portfolio', description: 'Traffic source tracker' }
]);

const headers = ref([
  { key: 'Accept', value: 'application/json', enabled: true },
  { key: 'Authorization', value: 'Bearer cv_token_sooraj_ravi_2026', enabled: true },
  { key: 'Content-Type', value: 'application/json', enabled: true }
]);

const requestBody = ref(`{\n  "purpose": "Hiring Sooraj Ravi",\n  "message": "Hello from the portfolio simulator!"\n}`);

const triggerSend = () => {
  if (props.isLoading) return;
  // Clean endpoint path
  const endpoint = props.modelValue;
  emit('sendRequest', {
    method: selectedMethod.value,
    endpoint,
    queryParams: queryParams.value,
    headers: headers.value,
    body: requestBody.value
  });
};
</script>

<template>
  <div class="request-pane glass-panel">
    <!-- URL Request Bar -->
    <div class="request-bar">
      <div class="method-selector">
        <select v-model="selectedMethod" class="method-select" :class="selectedMethod.toLowerCase()">
          <option v-for="m in methods" :key="m" :value="m">{{ m }}</option>
        </select>
      </div>
      <div class="url-input-container">
        <input 
          v-model="displayUrl" 
          @change="onUrlChange" 
          type="text" 
          class="url-input" 
          placeholder="Enter request URL"
        />
      </div>
      <button 
        @click="triggerSend" 
        class="send-btn" 
        :class="{ loading: isLoading }"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="spinner"></span>
        <span class="btn-text">{{ isLoading ? 'SENDING' : 'SEND' }}</span>
      </button>
    </div>

    <!-- Request Configuration Tabs -->
    <div class="config-section">
      <div class="config-tabs">
        <button 
          @click="activeTab = 'params'" 
          class="tab-btn" 
          :class="{ active: activeTab === 'params' }"
        >
          Params <span class="tab-badge" v-if="queryParams.length">{{ queryParams.length }}</span>
        </button>
        <button 
          @click="activeTab = 'headers'" 
          class="tab-btn" 
          :class="{ active: activeTab === 'headers' }"
        >
          Headers <span class="tab-badge" v-if="headers.length">{{ headers.length }}</span>
        </button>
        <button 
          @click="activeTab = 'body'" 
          class="tab-btn" 
          :class="{ active: activeTab === 'body', disabled: selectedMethod === 'GET' }"
        >
          Body
        </button>
      </div>

      <div class="tab-content">
        <!-- Parameters Tab -->
        <div v-if="activeTab === 'params'" class="config-table-container">
          <table class="config-table">
            <thead>
              <tr>
                <th width="30%">Key</th>
                <th width="40%">Value</th>
                <th width="30%">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, i) in queryParams" :key="i">
                <td><input v-model="p.key" type="text" class="table-input" /></td>
                <td><input v-model="p.value" type="text" class="table-input" /></td>
                <td><input v-model="p.description" type="text" class="table-input text-muted" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Headers Tab -->
        <div v-if="activeTab === 'headers'" class="config-table-container">
          <table class="config-table">
            <thead>
              <tr>
                <th width="35%">Header Key</th>
                <th width="55%">Value</th>
                <th width="10%" style="text-align: center;">Active</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(h, i) in headers" :key="i">
                <td><input v-model="h.key" type="text" class="table-input" /></td>
                <td><input v-model="h.value" type="text" class="table-input" /></td>
                <td style="text-align: center;">
                  <input type="checkbox" v-model="h.enabled" class="checkbox-input" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Body Tab (for non-GET requests) -->
        <div v-if="activeTab === 'body'" class="body-editor-container">
          <div v-if="selectedMethod === 'GET'" class="body-disabled-overlay">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <p>GET Requests cannot contain body payloads. Switch to POST or PUT to edit.</p>
          </div>
          <textarea 
            v-else
            v-model="requestBody" 
            class="body-textarea" 
            spellcheck="false"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.request-pane {
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  height: 100%;
}

@media (max-width: 768px) {
  .request-pane {
    height: auto;
  }
}


.request-bar {
  display: flex;
  align-items: stretch;
  gap: 8px;
  background: var(--bg-secondary);
  border: 2px solid var(--text-primary);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 4px;
}

.method-selector {
  display: flex;
  align-items: center;
}

.method-select {
  background: transparent;
  border: none;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 800;
  color: var(--text-primary);
  padding: 8px 12px;
  outline: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
}

.method-select.get { color: var(--accent-cyan); }
.method-select.post { color: var(--accent-amber); }
.method-select.put { color: var(--accent-purple); }
.method-select.delete { color: var(--accent-rose); }

.method-select option {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.url-input-container {
  flex: 1;
  display: flex;
  align-items: center;
}

.url-input {
  width: 100%;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  padding: 8px;
  outline: none;
  font-weight: 600;
}

.send-btn {
  background: var(--accent-cyan);
  color: var(--text-primary);
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  border: 2px solid var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 0 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: var(--transition-smooth);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
}

.send-btn:hover:not(:disabled) {
  background: var(--accent-purple);
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px 0px var(--text-primary);
}

.send-btn:active:not(:disabled) {
  transform: translate(1px, 1px);
  box-shadow: 1px 1px 0px 0px var(--text-primary);
}

.send-btn:disabled {
  background: var(--bg-tertiary);
  color: var(--text-muted);
  cursor: not-allowed;
  box-shadow: none;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(30, 30, 30, 0.2);
  border-top-color: var(--text-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.config-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
  border: 2px solid var(--text-primary);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.config-tabs {
  display: flex;
  background: var(--bg-tertiary);
  border-bottom: 2px solid var(--text-primary);
}

.tab-btn {
  background: transparent;
  border: none;
  padding: 10px 16px;
  color: var(--text-primary);
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  border-right: 2px solid var(--text-primary);
  transition: var(--transition-smooth);
  display: flex;
  align-items: center;
  gap: 6px;
}

.tab-btn:hover:not(.disabled) {
  background: rgba(0, 0, 0, 0.05);
}

.tab-btn.active {
  color: var(--text-primary);
  background: var(--bg-secondary);
  font-weight: 800;
}

.tab-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.tab-badge {
  background: #FFFFFF;
  color: var(--text-primary);
  border: 1px solid var(--text-primary);
  font-size: 0.65rem;
  padding: 1px 5px;
  border-radius: 10px;
}

.tab-btn.active .tab-badge {
  background: var(--accent-cyan);
  color: var(--text-primary);
}

.tab-content {
  flex: 1;
  overflow-y: auto;
  background: #FFFFFF;
}

.config-table-container {
  padding: 8px;
}

.config-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;
}

.config-table th {
  text-align: left;
  color: var(--text-primary);
  font-weight: 800;
  padding: 8px;
  border-bottom: 2px solid var(--text-primary);
}

.config-table td {
  padding: 4px;
}

.table-input {
  width: 100%;
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  padding: 6px 8px;
  border-radius: 4px;
  outline: none;
}

.table-input:focus {
  background: var(--bg-primary);
  border-bottom: 1px dashed var(--text-primary);
  border-radius: 0;
}

.checkbox-input {
  cursor: pointer;
  accent-color: var(--accent-cyan);
}

.body-editor-container {
  position: relative;
  height: 100%;
  min-height: 120px;
}

.body-textarea {
  width: 100%;
  height: 100%;
  min-height: 120px;
  background: #FFFFFF;
  border: none;
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  padding: 12px;
  outline: none;
  resize: none;
  line-height: 1.5;
}

.body-disabled-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(245, 245, 245, 0.9);
  color: var(--text-muted);
  font-size: 0.8rem;
  text-align: center;
  padding: 20px;
  gap: 8px;
}
</style>
