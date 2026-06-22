<script setup>
import { shallowRef } from 'vue';

const props = defineProps({
  postComponent: {
    type: Object,
    required: true
  },
  frontmatter: {
    type: Object,
    required: true
  }
});

// Use shallowRef for component instances to prevent reactivity overhead
const componentToRender = shallowRef(props.postComponent);
</script>

<template>
  <div class="blog-post-page">
    <div class="container">
      <router-link to="/blog" class="back-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Blog
      </router-link>

      <article class="post-card glass-panel">
        <header class="post-header">
          <div class="post-meta">
            <span class="post-date">{{ frontmatter.date }}</span>
            <span class="divider">•</span>
            <span class="post-author">By {{ frontmatter.author || 'Sooraj Parakkattil Ravi' }}</span>
          </div>
          
          <h1 class="post-title">{{ frontmatter.title }}</h1>
          
          <div class="post-tags" v-if="frontmatter.tags">
            <span v-for="tag in frontmatter.tags" :key="tag" class="tag-badge">
              {{ tag }}
            </span>
          </div>
        </header>

        <div class="post-body">
          <component :is="componentToRender" class="markdown-body" />
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
.blog-post-page {
  padding: 40px 20px;
  min-height: calc(100vh - 70px);
  background: radial-gradient(circle at top right, rgba(6, 182, 212, 0.05), transparent 400px);
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 24px;
  transition: var(--transition-smooth);
}

.back-btn:hover {
  color: var(--accent-cyan);
  transform: translateX(-4px);
}

.post-card {
  padding: 40px;
  border-radius: var(--radius-lg);
}

.post-header {
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 24px;
  margin-bottom: 32px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.post-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-badge {
  font-size: 0.75rem;
  background: var(--bg-tertiary);
  color: var(--accent-cyan);
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 500;
}

.post-body {
  color: var(--text-secondary);
}

@media (max-width: 640px) {
  .post-card {
    padding: 24px 16px;
  }
  .post-title {
    font-size: 1.8rem;
  }
}
</style>
