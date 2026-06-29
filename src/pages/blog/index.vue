<script setup>
import { computed } from 'vue';
import { blogPosts } from '../../router';

// Sort posts by date descending
const sortedPosts = computed(() => {
  return [...blogPosts].sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
  });
});

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};
</script>

<template>
  <div class="pg-index-page">
    <div class="pg-container">
      
      <!-- Minimalist Header Banner -->
      <header class="pg-header">
        <div class="header-title">Sooraj Parakkattil Ravi</div>
        <div class="header-nav">
          <router-link to="/" class="pg-nav-link">Portfolio Workspace</router-link>
          <span class="nav-sep">|</span>
          <router-link to="/blog" class="pg-nav-link active">Essays</router-link>
        </div>
      </header>

      <!-- Essays List -->
      <main class="pg-main">
        <h1 class="page-title">Essays</h1>
        
        <ul class="essay-list">
          <li v-for="post in sortedPosts" :key="post.slug" class="essay-item">
            <span class="essay-date">{{ formatDate(post.frontmatter.date) }}</span>
            <router-link :to="post.path" class="essay-link">{{ post.frontmatter.title }}</router-link>
          </li>
        </ul>
      </main>

      <footer class="pg-footer">
        <p>&copy; {{ new Date().getFullYear() }} Sooraj Parakkattil Ravi.</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.pg-index-page {
  background-color: #fafaf9;
  color: #111111;
  min-height: 100vh;
  font-family: Georgia, serif;
  padding: 40px 20px;
  line-height: 1.5;
}

.pg-container {
  max-width: 680px;
  margin: 0 auto;
}

.pg-header {
  border-bottom: 1px solid #e3e3e0;
  padding-bottom: 16px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: -0.01em;
}

.header-nav {
  font-size: 0.9rem;
}

.pg-nav-link {
  color: #2b6cb0;
  text-decoration: none;
}

.pg-nav-link:hover {
  text-decoration: underline;
}

.pg-nav-link.active {
  color: #111111;
  font-weight: bold;
  pointer-events: none;
}

.nav-sep {
  color: #cbd5e0;
  margin: 0 10px;
}

.page-title {
  font-size: 1.8rem;
  font-weight: normal;
  margin-bottom: 24px;
  color: #111111;
}

.essay-list {
  list-style-type: none;
  padding: 0;
  margin: 0 0 60px 0;
}

.essay-item {
  margin-bottom: 14px;
  display: flex;
  align-items: baseline;
  font-size: 1.05rem;
}

.essay-date {
  font-family: monospace;
  font-size: 0.85rem;
  color: #718096;
  width: 90px;
  flex-shrink: 0;
}

.essay-link {
  color: #2b6cb0;
  text-decoration: none;
}

.essay-link:hover {
  text-decoration: underline;
}

.pg-footer {
  border-top: 1px solid #e3e3e0;
  padding-top: 20px;
  font-size: 0.8rem;
  color: #718096;
  text-align: center;
}
</style>
