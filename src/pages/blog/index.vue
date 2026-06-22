<script setup>
import { ref, computed } from 'vue';
import { blogPosts } from '../../router';

const searchQuery = ref('');
const selectedTag = ref('All');

// Extract all unique tags across all posts
const allTags = computed(() => {
  const tags = new Set();
  blogPosts.forEach(post => {
    if (post.frontmatter?.tags) {
      post.frontmatter.tags.forEach(t => tags.add(t));
    }
  });
  return ['All', ...Array.from(tags)];
});

// Filter posts by search query and tag selection
const filteredPosts = computed(() => {
  return blogPosts.filter(post => {
    const title = post.frontmatter?.title || '';
    const summary = post.frontmatter?.summary || '';
    const tags = post.frontmatter?.tags || [];
    
    const matchesSearch = title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          summary.toLowerCase().includes(searchQuery.value.toLowerCase());
                          
    const matchesTag = selectedTag.value === 'All' || tags.includes(selectedTag.value);
    
    return matchesSearch && matchesTag;
  });
});
</script>

<template>
  <div class="blog-index-page">
    <div class="container">
      <header class="blog-hero">
        <span class="category-indicator">Engineering Insights</span>
        <h1 class="gradient-text">Architectural Journals</h1>
        <p class="subtitle">Deep dives into microservices orchestration, cloud infrastructure, and modern reactivity patterns.</p>
      </header>

      <!-- Filter Controls -->
      <div class="filter-controls glass-panel">
        <div class="search-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search articles..." 
            class="search-input"
          />
        </div>
        
        <div class="tags-filter">
          <button 
            v-for="tag in allTags" 
            :key="tag"
            @click="selectedTag = tag"
            class="tag-filter-btn"
            :class="{ active: selectedTag === tag }"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- Articles Grid -->
      <div v-if="filteredPosts.length === 0" class="empty-results glass-panel">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
        <h3>No journals found</h3>
        <p>Try refining your search query or tag selection.</p>
      </div>

      <div v-else class="posts-grid">
        <div 
          v-for="post in filteredPosts" 
          :key="post.slug" 
          class="post-card glass-panel"
        >
          <div class="post-meta">
            <span class="post-date">{{ post.frontmatter.date }}</span>
            <span class="divider">•</span>
            <span class="post-author">{{ post.frontmatter.author || 'Sooraj Parakkattil Ravi' }}</span>
          </div>

          <h2 class="post-title">{{ post.frontmatter.title }}</h2>
          <p class="post-summary">{{ post.frontmatter.summary }}</p>

          <div class="post-footer">
            <div class="post-tags">
              <span v-for="t in post.frontmatter.tags" :key="t" class="post-tag">
                {{ t }}
              </span>
            </div>
            
            <router-link :to="post.path" class="read-link">
              Read Article
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-index-page {
  padding: 60px 20px;
  min-height: calc(100vh - 70px);
  background: radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.03), transparent 500px);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.blog-hero {
  text-align: center;
  margin-bottom: 48px;
}

.category-indicator {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--accent-cyan);
  text-transform: uppercase;
}

.blog-hero h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-top: 8px;
  margin-bottom: 16px;
  letter-spacing: -0.03em;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.filter-controls {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  padding: 8px 16px;
}

.search-icon {
  color: var(--text-muted);
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 0.9rem;
  outline: none;
}

.tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-filter-btn {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-light);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.tag-filter-btn:hover {
  border-color: var(--accent-cyan);
  color: var(--text-primary);
}

.tag-filter-btn.active {
  background: var(--accent-cyan);
  border-color: var(--accent-cyan);
  color: var(--bg-primary);
  box-shadow: 0 0 10px rgba(6, 182, 212, 0.2);
}

.empty-results {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

.empty-results svg {
  color: var(--text-muted);
  margin-bottom: 16px;
}

.empty-results h3 {
  color: var(--text-primary);
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

.post-card {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: var(--transition-smooth);
}

.post-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-focus);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(6, 182, 212, 0.05);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.post-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.post-summary {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  flex-wrap: wrap;
  gap: 16px;
}

.post-tags {
  display: flex;
  gap: 6px;
}

.post-tag {
  font-size: 0.7rem;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 2px 8px;
  border-radius: 4px;
}

.read-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--accent-cyan);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 700;
  transition: var(--transition-smooth);
}

.read-link svg {
  transition: var(--transition-smooth);
}

.read-link:hover {
  color: #22d3ee;
}

.read-link:hover svg {
  transform: translateX(4px);
}

@media (min-width: 768px) {
  .filter-controls {
    flex-direction: row;
    align-items: center;
  }
  
  .search-container {
    width: 300px;
  }
}
</style>
