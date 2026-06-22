<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="app-layout">
    <!-- Header Navigation -->
    <header class="app-header">
      <div class="header-content glass-panel">
        <router-link to="/" class="logo-area">
          <span class="logo-icon">&lt;SPR /&gt;</span>
          <span class="logo-text">sooparkr<span class="dot">.</span>com</span>
        </router-link>
        
        <nav class="navigation">
          <router-link to="/" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            API Workspace
          </router-link>
          
          <router-link to="/blog" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="nav-icon"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            Journals
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Page Content View -->
    <div class="app-body">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
}

.app-header {
  height: 70px;
  padding: 8px 16px;
  flex-shrink: 0;
  z-index: 100;
  position: relative;
}

.header-content {
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
}

.logo-icon {
  font-family: var(--font-mono);
  font-weight: 800;
  font-size: 0.95rem;
  color: var(--accent-cyan);
  background: var(--accent-cyan-glow);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(6, 182, 212, 0.2);
}

.logo-text {
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.01em;
}

.logo-text .dot {
  color: var(--accent-cyan);
}

.navigation {
  display: flex;
  gap: 6px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: var(--transition-smooth);
}

.nav-link:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.02);
}

.nav-link.router-link-active {
  color: var(--accent-cyan);
  background: var(--accent-cyan-glow);
  border-color: rgba(6, 182, 212, 0.15);
}

.nav-icon {
  opacity: 0.8;
}

.app-body {
  flex: 1;
  overflow-y: auto;
}


/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 768px) {
  .app-layout {
    height: auto;
    min-height: 100vh;
    display: block;
  }
  .app-body {
    overflow: visible;
  }
}

@media (max-width: 640px) {
  .logo-text {
    display: none; /* Only show icon logo on small mobile */
  }
}
</style>

