<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import RequestPane from '../components/RequestPane.vue';
import ResponsePane from '../components/ResponsePane.vue';
import VisualizerPane from '../components/VisualizerPane.vue';
import { simulateFetch } from '../utils/apiSimulator';

const activeEndpoint = ref('/api/v1/profile');
const isLoading = ref(false);
const responsePayload = ref(null);
const errorPayload = ref(null);
const requestTime = ref(null);
const historyList = ref([]);

// Mobile States
const isSidebarOpen = ref(false);
const activeOutputTab = ref('visualizer'); // 'visualizer' or 'response'

onMounted(() => {
  try {
    const saved = localStorage.getItem('api_history');
    if (saved) {
      historyList.value = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load history from localStorage', e);
  }
});

const handleSendRequest = async (config) => {
  if (isLoading.value) return;
  isLoading.value = true;
  responsePayload.value = null;
  errorPayload.value = null;
  requestTime.value = null;

  const startTime = performance.now();
  
  try {
    let endpoint = config.endpoint;
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    
    const res = await simulateFetch(endpoint);
    const endTime = performance.now();
    requestTime.value = Math.round(endTime - startTime);
    responsePayload.value = res;

    // Add to history list
    const historyItem = {
      endpoint,
      method: config.method,
      status: res.status,
      time: requestTime.value,
      timestamp: new Date().toLocaleTimeString()
    };
    
    historyList.value.unshift(historyItem);
    if (historyList.value.length > 8) historyList.value.pop();
    localStorage.setItem('api_history', JSON.stringify(historyList.value));
    
    // Automatically switch to visualizer tab on request finish if on mobile
    activeOutputTab.value = 'visualizer';
  } catch (err) {
    const endTime = performance.now();
    requestTime.value = Math.round(endTime - startTime);
    errorPayload.value = err;

    const historyItem = {
      endpoint: config.endpoint,
      method: config.method,
      status: err.status || 500,
      time: requestTime.value,
      timestamp: new Date().toLocaleTimeString()
    };
    
    historyList.value.unshift(historyItem);
    localStorage.setItem('api_history', JSON.stringify(historyList.value));
    
    // On error, show the JSON response tab on mobile to let them see the error details
    activeOutputTab.value = 'response';
  } finally {
    isLoading.value = false;
  }
};

const handleClearHistory = () => {
  historyList.value = [];
  localStorage.removeItem('api_history');
};
</script>

<template>
  <div class="portfolio-page">
    <div class="workspace-container">
      
      <!-- Mobile Drawer Backdrop -->
      <div v-if="isSidebarOpen" class="drawer-backdrop" @click="isSidebarOpen = false"></div>

      <!-- Left Sidebar Collections (Slides in on mobile) -->
      <div class="sidebar-wrapper" :class="{ 'drawer-open': isSidebarOpen }">
        <Sidebar 
          v-model="activeEndpoint" 
          :history="historyList"
          @clearHistory="handleClearHistory"
          @update:modelValue="isSidebarOpen = false"
        />
      </div>

      <!-- Right Main Workspace -->
      <main class="workspace-main">
        
        <!-- Mobile/Tablet Collection Toggle Bar -->
        <div class="mobile-nav-bar">
          <button @click="isSidebarOpen = !isSidebarOpen" class="mobile-toggle-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="folder-icon"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            Endpoints Collection
          </button>
          <span class="active-endpoint-pill">GET {{ activeEndpoint }}</span>
        </div>

        <!-- Request Section -->
        <div class="request-wrapper">
          <RequestPane 
            v-model="activeEndpoint"
            :isLoading="isLoading"
            @sendRequest="handleSendRequest"
          />
        </div>

        <!-- Mobile/Tablet Output Pane Tabs (Visible only under 1024px) -->
        <div class="mobile-output-tabs" v-if="responsePayload || errorPayload || isLoading">
          <button 
            @click="activeOutputTab = 'visualizer'" 
            class="output-tab-btn" 
            :class="{ active: activeOutputTab === 'visualizer' }"
          >
            Visualizer Dashboard
          </button>
          <button 
            @click="activeOutputTab = 'response'" 
            class="output-tab-btn" 
            :class="{ active: activeOutputTab === 'response' }"
          >
            Raw JSON Response
          </button>
        </div>

        <!-- Output Display Section -->
        <div class="workspace-output">
          <!-- Raw JSON view -->
          <div 
            class="output-column" 
            :class="{ 'mobile-hidden': activeOutputTab !== 'response' && (responsePayload || errorPayload || isLoading) }"
          >
            <ResponsePane 
              :response="responsePayload"
              :error="errorPayload"
              :time="requestTime"
              :isLoading="isLoading"
            />
          </div>

          <!-- Parsed visual dashboard -->
          <div 
            class="output-column" 
            :class="{ 'mobile-hidden': activeOutputTab !== 'visualizer' && (responsePayload || errorPayload || isLoading) }"
          >
            <VisualizerPane 
              :endpoint="activeEndpoint"
              :response="responsePayload"
              :isLoading="isLoading"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.portfolio-page {
  height: 100%;
  background: radial-gradient(circle at top right, rgba(6, 182, 212, 0.03), transparent 600px);
  overflow: hidden;
}

.workspace-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  height: 100%;
  position: relative;
}

.sidebar-wrapper {
  height: 100%;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
}

.workspace-main {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 16px;
  gap: 16px;
  position: relative;
}

.mobile-nav-bar {
  display: none;
}

.mobile-output-tabs {
  display: none;
}

.request-wrapper {
  flex-shrink: 0;
}

.workspace-output {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: 16px;
  min-height: 0; /* Important for scroll container overflow prevention */
}

.output-column {
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

/* Mobile Sidebar Drawer and Responsiveness */
@media (max-width: 1024px) {
  .workspace-output {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }

  .mobile-output-tabs {
    display: flex;
    background: var(--bg-secondary);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-sm);
    padding: 3px;
    gap: 4px;
    flex-shrink: 0;
  }

  .output-tab-btn {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--text-secondary);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .output-tab-btn.active {
    background: var(--bg-tertiary);
    color: var(--accent-cyan);
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.05);
  }

  .mobile-hidden {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .portfolio-page {
    height: auto;
    overflow: visible;
  }

  .workspace-container {
    grid-template-columns: 1fr;
    height: auto;
  }

  .workspace-main {
    height: auto;
    overflow: visible;
    padding: 12px;
  }

  .workspace-output {
    height: auto;
    display: block;
  }

  .output-column {
    height: auto;
    overflow: visible;
  }


  .sidebar-wrapper {
    position: fixed;
    top: 70px;
    bottom: 0;
    left: -280px;
    width: 280px;
    background: var(--bg-primary);
    box-shadow: 15px 0 30px rgba(0, 0, 0, 0.7);
    border-right: 1px solid var(--border-light);
    z-index: 50;
  }

  .sidebar-wrapper.drawer-open {
    transform: translateX(280px);
  }

  .drawer-backdrop {
    position: fixed;
    top: 70px;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(5, 8, 17, 0.7);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 40;
  }

  .mobile-nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--bg-secondary);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-sm);
    padding: 8px 12px;
    flex-shrink: 0;
  }

  .mobile-toggle-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--accent-cyan-glow);
    color: var(--accent-cyan);
    border: 1px solid rgba(6, 182, 212, 0.2);
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-smooth);
  }

  .mobile-toggle-btn:hover {
    background: rgba(6, 182, 212, 0.15);
  }

  .folder-icon {
    flex-shrink: 0;
  }

  .active-endpoint-pill {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--accent-emerald);
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.15);
    padding: 3px 8px;
    border-radius: 10px;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
