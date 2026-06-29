<script setup>
import { ref } from 'vue';

const props = defineProps({
  endpoint: {
    type: String,
    required: true
  },
  response: {
    type: Object,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const hoveredSkill = ref(null);
const expandedJob = ref(0); // Default expand first job
</script>

<template>
  <div class="visualizer-pane glass-panel">
    <div class="visualizer-header">
      <div class="header-left">
        <span class="pulse-dot" :class="{ loading: isLoading }"></span>
        <h3>LIVE VISUALIZER</h3>
      </div>
      <span class="preview-tag">UI View</span>
    </div>

    <div class="visualizer-content">
      <!-- Loading State -->
      <div v-if="isLoading" class="visualizer-loading">
        <div class="mesh-loader">
          <div></div><div></div><div></div>
        </div>
        <p>Parsing API response to build visual interface...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!response" class="visualizer-empty">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
        <p>Send a successful GET request to render the dashboard preview</p>
      </div>

      <!-- Rendered Contents based on Endpoint -->
      <div v-else class="render-area animate-fade-in">
        
        <!-- PROFILE VISUALIZER -->
        <div v-if="endpoint === '/api/v1/profile'" class="profile-card">
          <div class="profile-header">
            <div class="avatar-glow">
              <span class="avatar-initials">SR</span>
            </div>
            <div class="profile-title-block">
              <h2>{{ response.data.name }}</h2>
              <p class="role-subtitle">{{ response.data.title }}</p>
              <div class="location-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {{ response.data.location }}
              </div>
            </div>
          </div>

          <div class="profile-summary">
            <p>{{ response.data.summary }}</p>
          </div>

          <div class="contact-grid">
            <a :href="'mailto:' + response.data.email" class="contact-card">
              <div class="contact-icon text-cyan">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div class="contact-info">
                <span class="label">Email</span>
                <span class="val">{{ response.data.email }}</span>
              </div>
            </a>

            <a :href="'tel:' + response.data.phone" class="contact-card">
              <div class="contact-icon text-emerald">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <div class="contact-info">
                <span class="label">Phone</span>
                <span class="val">{{ response.data.phone }}</span>
              </div>
            </a>

            <a :href="response.data.links.linkedin" target="_blank" class="contact-card">
              <div class="contact-icon text-cyan">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </div>
              <div class="contact-info">
                <span class="label">LinkedIn</span>
                <span class="val">Connect on LinkedIn</span>
              </div>
            </a>

            <a :href="response.data.links.portfolio" class="contact-card">
              <div class="contact-icon text-emerald">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>
              <div class="contact-info">
                <span class="label">Portfolio</span>
                <span class="val">sooparkr.com</span>
              </div>
            </a>
          </div>
        </div>

        <!-- SKILLS VISUALIZER -->
        <div v-else-if="endpoint === '/api/v1/skills'" class="skills-showcase">
          <div v-for="(list, category) in response.data" :key="category" class="skill-category-block">
            <h4 class="category-title">{{ category.toUpperCase() }}</h4>
            <div class="tags-container">
              <span 
                v-for="skill in list" 
                :key="skill"
                class="skill-badge"
                @mouseenter="hoveredSkill = skill"
                @mouseleave="hoveredSkill = null"
                :class="{ active: hoveredSkill === skill }"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>

        <!-- EXPERIENCE VISUALIZER -->
        <div v-else-if="endpoint === '/api/v1/experience'" class="timeline-container">
          <div 
            v-for="(job, index) in response.data" 
            :key="index"
            class="timeline-item"
            :class="{ active: expandedJob === index }"
          >
            <div class="timeline-line"></div>
            <div class="timeline-dot"></div>
            
            <div class="timeline-main" @click="expandedJob = expandedJob === index ? null : index">
              <div class="timeline-header">
                <div>
                  <h4 class="job-role">{{ job.role }}</h4>
                  <span class="job-company">{{ job.company }}</span>
                </div>
                <div class="job-meta">
                  <span class="job-period">{{ job.period }}</span>
                  <span class="job-location">{{ job.location }}</span>
                </div>
              </div>

              <!-- Accordion highlights -->
              <div v-show="expandedJob === index" class="job-details animate-slide-down">
                <ul class="highlights-list">
                  <li v-for="(h, hi) in job.highlights" :key="hi">{{ h }}</li>
                </ul>
              </div>
              
              <div class="expand-indicator">
                <span>{{ expandedJob === index ? 'Click to collapse' : 'Click to read full accomplishments' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- PROJECTS VISUALIZER -->
        <div v-else-if="endpoint === '/api/v1/projects'" class="projects-grid">
          <div v-for="(proj, pi) in response.data" :key="pi" class="project-card-ui">
            <div class="project-header-ui">
              <div>
                <span class="project-tag" :class="proj.type.toLowerCase()">{{ proj.type }}</span>
                <h4>{{ proj.name }}</h4>
              </div>
              <span class="project-period">{{ proj.period }}</span>
            </div>
            
            <p class="project-desc">{{ proj.description }}</p>
            
            <ul class="project-bullet-list">
              <li v-for="(b, bi) in proj.highlights" :key="bi">{{ b }}</li>
            </ul>
          </div>
        </div>

        <!-- EDUCATION VISUALIZER -->
        <div v-else-if="endpoint === '/api/v1/education'" class="education-grid">
          <div v-for="(edu, ei) in response.data" :key="ei" class="edu-card-ui">
            <div class="edu-header-ui">
              <div class="edu-title-group">
                <h4>{{ edu.degree }}</h4>
                <span class="edu-inst">{{ edu.institution }}</span>
              </div>
              <div class="edu-meta-group">
                <span class="edu-date">{{ edu.period }}</span>
                <span v-if="edu.location" class="edu-loc">{{ edu.location }}</span>
              </div>
            </div>
            
            <div v-if="edu.grade" class="edu-grade-tag">{{ edu.grade }}</div>
            
            <ul v-if="edu.highlights && edu.highlights.length" class="edu-bullet-list">
              <li v-for="(h, hi) in edu.highlights" :key="hi">{{ h }}</li>
            </ul>
          </div>
        </div>

        <!-- CERTIFICATIONS VISUALIZER -->
        <div v-else-if="endpoint === '/api/v1/certifications'" class="certs-grid">
          <div v-for="(cert, ci) in response.data" :key="ci" class="cert-card-ui">
            <div class="cert-shield-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div class="cert-info">
              <h4>{{ cert.name }}</h4>
              <p>{{ cert.issuer }}</p>
            </div>
            <div class="badge-verified">Verified</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.visualizer-pane {
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  height: 100%;
}

@media (max-width: 768px) {
  .visualizer-pane {
    height: auto;
  }
  .visualizer-content {
    height: auto;
    overflow: visible;
  }
}


.visualizer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--text-primary);
  padding-bottom: 12px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: var(--text-muted);
  border-radius: 50%;
}

.pulse-dot.loading {
  background: var(--accent-cyan);
  animation: pulse-ring 1.25s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(6, 182, 212, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(6, 182, 212, 0); }
}

.visualizer-header h3 {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.preview-tag {
  font-size: 0.65rem;
  background: var(--accent-cyan-glow);
  color: var(--accent-cyan);
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
}

.visualizer-content {
  flex: 1;
  overflow-y: auto;
  min-height: 250px;
}

.visualizer-loading {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-size: 0.8rem;
  gap: 20px;
  text-align: center;
}

.mesh-loader {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 20px;
}

.mesh-loader div {
  position: absolute;
  top: 0;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--accent-cyan);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.mesh-loader div:nth-child(1) {
  left: 8px;
  animation: mesh-1 0.6s infinite;
}
.mesh-loader div:nth-child(2) {
  left: 8px;
  animation: mesh-2 0.6s infinite;
}
.mesh-loader div:nth-child(3) {
  left: 32px;
  animation: mesh-2 0.6s infinite;
}

@keyframes mesh-1 {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}
@keyframes mesh-2 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(24px, 0); }
}

.visualizer-empty {
  height: 100%;
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

.render-area {
  height: 100%;
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Profile Visualizer Styles */
.profile-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar-glow {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-emerald) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
}

.avatar-initials {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--bg-primary);
  letter-spacing: -0.05em;
}

.profile-title-block h2 {
  font-size: 1.25rem;
  font-weight: 700;
}

.role-subtitle {
  font-size: 0.85rem;
  color: var(--accent-cyan);
  font-weight: 500;
}

.location-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 4px;
}

.profile-summary {
  background: #FFFFFF;
  border: 2px solid var(--text-primary);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 14px;
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--text-primary);
  font-weight: 500;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #FFFFFF;
  border: 2px solid var(--text-primary);
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: inherit;
  transition: var(--transition-smooth);
}

.contact-card:hover {
  background: var(--bg-tertiary);
  transform: translate(-1px, -1px);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
}

.contact-icon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: var(--bg-tertiary);
  border: 1px solid var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-cyan { color: var(--accent-cyan); }
.text-emerald { color: var(--accent-emerald); }

.contact-info {
  display: flex;
  flex-direction: column;
}

.contact-info .label {
  font-size: 0.65rem;
  color: var(--text-muted);
  text-transform: uppercase;
}

.contact-info .val {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.contact-card:hover .contact-info .val {
  color: var(--text-primary);
}

/* Skills Visualizer Styles */
.skills-showcase {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.skill-category-block {
  background: #FFFFFF;
  border: 2px solid var(--text-primary);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
}

.category-title {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--accent-cyan);
  margin-bottom: 10px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-badge {
  font-size: 0.75rem;
  background: #FFFFFF;
  color: var(--text-primary);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--text-primary);
  cursor: default;
  font-weight: 700;
  transition: var(--transition-smooth);
}

.skill-badge:hover, .skill-badge.active {
  background: var(--accent-purple);
  color: #FFFFFF;
  transform: translate(-1px, -1px);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
}

/* Experience Visualizer Styles */
.timeline-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 20px;
}

.timeline-item {
  position: relative;
}

.timeline-line {
  position: absolute;
  top: 15px;
  bottom: -31px;
  left: -15px;
  width: 3px;
  background: var(--text-primary);
}

.timeline-item:last-child .timeline-line {
  display: none;
}

.timeline-dot {
  position: absolute;
  left: -20px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 2px solid var(--text-primary);
  transition: var(--transition-smooth);
}

.timeline-item.active .timeline-dot {
  background: var(--accent-cyan);
  border-color: var(--text-primary);
  box-shadow: none;
}

.timeline-main {
  background: #FFFFFF;
  border: 2px solid var(--text-primary);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 14px;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.timeline-main:hover {
  background: var(--bg-tertiary);
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px 0px var(--text-primary);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
}

.job-role {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-primary);
}

.job-company {
  font-size: 0.8rem;
  color: var(--accent-purple);
  font-weight: 700;
}

.job-meta {
  text-align: right;
  font-size: 0.75rem;
}

.job-period {
  display: block;
  font-weight: 800;
  color: var(--text-primary);
}

.job-location {
  color: var(--text-muted);
  font-weight: 600;
}

.job-details {
  margin-top: 14px;
  border-top: 2px dashed var(--text-primary);
  padding-top: 12px;
}

.highlights-list {
  padding-left: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.highlights-list li {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.expand-indicator {
  margin-top: 10px;
  font-size: 0.65rem;
  color: var(--text-muted);
  text-align: right;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.timeline-main:hover .expand-indicator {
  color: var(--accent-cyan);
}

.animate-slide-down {
  animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Projects Visualizer Styles */
.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.project-card-ui {
  background: #FFFFFF;
  border: 2px solid var(--text-primary);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 16px;
  transition: var(--transition-smooth);
}

.project-card-ui:hover {
  background: var(--bg-tertiary);
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px 0px var(--text-primary);
}

.project-header-ui {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.project-tag {
  font-size: 0.6rem;
  text-transform: uppercase;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 2px;
  border: 1px solid var(--text-primary);
  margin-right: 8px;
}

.project-tag.professional {
  background: var(--accent-cyan);
  color: var(--text-primary);
}

.project-tag.personal {
  background: var(--accent-amber);
  color: var(--text-primary);
}

.project-header-ui h4 {
  display: inline-block;
  font-size: 0.95rem;
  font-weight: 800;
}

.project-period {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.project-desc {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.5;
}

.project-bullet-list {
  padding-left: 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.project-bullet-list li {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.4;
}

/* Education Visualizer Styles */
.education-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.edu-card-ui {
  background: #FFFFFF;
  border: 2px solid var(--text-primary);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 14px;
}

.edu-header-ui {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.edu-title-group h4 {
  font-size: 0.9rem;
  font-weight: 800;
}

.edu-inst {
  font-size: 0.75rem;
  color: var(--accent-purple);
  font-weight: 700;
  display: block;
}

.edu-meta-group {
  text-align: right;
  font-size: 0.75rem;
}

.edu-date {
  display: block;
  font-weight: 700;
  color: var(--text-primary);
}

.edu-loc {
  color: var(--text-muted);
}

.edu-grade-tag {
  display: inline-block;
  font-size: 0.7rem;
  background: var(--accent-cyan);
  color: var(--text-primary);
  border: 1px solid var(--text-primary);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-weight: 700;
  margin-bottom: 10px;
}

.edu-bullet-list {
  padding-left: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.edu-bullet-list li {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Certifications Visualizer Styles */
.certs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.cert-card-ui {
  background: #FFFFFF;
  border: 2px solid var(--text-primary);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
  border-radius: var(--radius-sm);
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  transition: var(--transition-smooth);
}

.cert-card-ui:hover {
  background: var(--bg-tertiary);
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0px 0px var(--text-primary);
}

.cert-shield-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg-tertiary);
  border: 2px solid var(--text-primary);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cert-info h4 {
  font-size: 0.8rem;
  font-weight: 800;
  line-height: 1.3;
}

.cert-info p {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.badge-verified {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 0.6rem;
  color: var(--accent-cyan);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.9;
}
</style>
