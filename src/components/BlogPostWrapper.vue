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

// Use shallowRef to avoid reactivity overhead on Vue components
const componentToRender = shallowRef(props.postComponent);
</script>

<template>
  <div class="pg-post-page">
    <div class="pg-container">
      
      <!-- Minimalist Header Banner -->
      <header class="pg-header">
        <div class="header-title">Sooraj Parakkattil Ravi</div>
        <div class="header-nav">
          <router-link to="/" class="pg-nav-link">Portfolio Workspace</router-link>
          <span class="nav-sep">|</span>
          <router-link to="/blog" class="pg-nav-link">Essays</router-link>
        </div>
      </header>

      <!-- Main Essay Content -->
      <main class="pg-main">
        <article class="essay-article">
          <h1 class="essay-title">{{ frontmatter.title }}</h1>
          
          <div class="essay-meta">
            {{ frontmatter.date }}
          </div>

          <div class="essay-body-content">
            <component :is="componentToRender" class="pg-markdown-body" />
          </div>
        </article>

        <!-- Back Navigation Link -->
        <div class="back-link-container">
          <router-link to="/blog" class="essay-link">&larr; Back to Essays</router-link>
        </div>
      </main>

      <footer class="pg-footer">
        <p>&copy; {{ new Date().getFullYear() }} Sooraj Parakkattil Ravi.</p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.pg-post-page {
  background-color: #fafaf9;
  color: #111111;
  min-height: 100vh;
  font-family: Georgia, serif;
  padding: 40px 20px;
  line-height: 1.6;
}

.pg-container {
  max-width: 650px; /* optimal line width for readability */
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

.nav-sep {
  color: #cbd5e0;
  margin: 0 10px;
}

.essay-article {
  margin-bottom: 48px;
}

.essay-title {
  font-size: 2.1rem;
  font-weight: normal;
  line-height: 1.25;
  margin-bottom: 10px;
  color: #000000;
}

.essay-meta {
  font-family: monospace;
  font-size: 0.85rem;
  color: #718096;
  margin-bottom: 30px;
}

.back-link-container {
  margin: 40px 0;
  border-top: 1px dashed #e3e3e0;
  padding-top: 20px;
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

/* Deep selection for Markdown compilation output styling overrides */
:deep(.pg-markdown-body) {
  font-family: Georgia, serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #111111;
}

:deep(.pg-markdown-body h1) {
  font-size: 1.8rem;
  font-weight: normal;
  margin-top: 1.8rem;
  margin-bottom: 1rem;
  color: #000000;
}

:deep(.pg-markdown-body h1:first-of-type) {
  display: none;
}


:deep(.pg-markdown-body h2) {
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 1.8rem;
  margin-bottom: 0.8rem;
  color: #111111;
}

:deep(.pg-markdown-body h3) {
  font-size: 1.15rem;
  font-weight: bold;
  margin-top: 1.4rem;
  margin-bottom: 0.6rem;
  color: #111111;
}

:deep(.pg-markdown-body p) {
  margin-bottom: 1.4rem;
  color: #111111;
  text-align: justify;
}

:deep(.pg-markdown-body ul, .pg-markdown-body ol) {
  margin-bottom: 1.4rem;
  padding-left: 1.5rem;
}

:deep(.pg-markdown-body li) {
  margin-bottom: 0.4rem;
}

:deep(.pg-markdown-body a) {
  color: #2b6cb0;
  text-decoration: none;
}

:deep(.pg-markdown-body a:hover) {
  text-decoration: underline;
}

:deep(.pg-markdown-body code) {
  font-family: monospace;
  font-size: 0.9em;
  background: #f1f1ef;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  color: #c7254e;
}

:deep(.pg-markdown-body pre) {
  background: #f6f6f4;
  border: 1px solid #e3e3e0;
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  margin-bottom: 1.4rem;
}

:deep(.pg-markdown-body pre code) {
  background: transparent;
  padding: 0;
  border-radius: 0;
  color: #333333;
  font-size: 0.9rem;
}

:deep(.pg-markdown-body blockquote) {
  border-left: 3px solid #2b6cb0;
  padding-left: 1rem;
  margin: 1.4rem 0;
  font-style: italic;
  color: #4a5568;
}
</style>
