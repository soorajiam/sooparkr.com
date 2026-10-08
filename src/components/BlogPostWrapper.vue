<script setup>
import { shallowRef, ref, onMounted, watch } from 'vue';
import { theme } from '../utils/theme';

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

const bodyRef = ref(null);

// Render ```mermaid fenced blocks as diagrams; mermaid is only loaded when a post uses it
let mermaidNodes = [];

const renderMermaid = async () => {
  if (!mermaidNodes.length) return;
  const { default: mermaid } = await import('mermaid');
  mermaid.initialize({
    startOnLoad: false,
    theme: theme.value === 'dark' ? 'dark' : 'neutral',
    fontFamily: 'Georgia, serif'
  });
  // Reset to source so already-rendered diagrams can be redrawn in the new theme
  mermaidNodes.forEach((node) => {
    node.removeAttribute('data-processed');
    node.textContent = node.dataset.source;
  });
  await mermaid.run({ nodes: mermaidNodes });
};

onMounted(() => {
  const blocks = bodyRef.value?.querySelectorAll('pre > code.language-mermaid') ?? [];
  mermaidNodes = [...blocks].map((code) => {
    const div = document.createElement('div');
    div.className = 'mermaid';
    div.dataset.source = code.textContent;
    code.parentElement.replaceWith(div);
    return div;
  });
  renderMermaid();
});

watch(theme, renderMermaid);
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

          <div class="essay-body-content" ref="bodyRef">
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
  background-color: var(--essay-bg);
  color: var(--essay-text);
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
  border-bottom: 1px solid var(--essay-border);
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
  color: var(--essay-link);
  text-decoration: none;
}

.pg-nav-link:hover {
  text-decoration: underline;
}

.nav-sep {
  color: var(--essay-sep);
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
  color: var(--essay-heading);
}

.essay-meta {
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--essay-muted);
  margin-bottom: 30px;
}

.back-link-container {
  margin: 40px 0;
  border-top: 1px dashed var(--essay-border);
  padding-top: 20px;
}

.essay-link {
  color: var(--essay-link);
  text-decoration: none;
}

.essay-link:hover {
  text-decoration: underline;
}

.pg-footer {
  border-top: 1px solid var(--essay-border);
  padding-top: 20px;
  font-size: 0.8rem;
  color: var(--essay-muted);
  text-align: center;
}

/* Deep selection for Markdown compilation output styling overrides */
:deep(.pg-markdown-body) {
  font-family: Georgia, serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--essay-text);
}

:deep(.pg-markdown-body h1) {
  font-size: 1.8rem;
  font-weight: normal;
  margin-top: 1.8rem;
  margin-bottom: 1rem;
  color: var(--essay-heading);
}

:deep(.pg-markdown-body h1:first-of-type) {
  display: none;
}


:deep(.pg-markdown-body h2) {
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 1.8rem;
  margin-bottom: 0.8rem;
  color: var(--essay-text);
}

:deep(.pg-markdown-body h3) {
  font-size: 1.15rem;
  font-weight: bold;
  margin-top: 1.4rem;
  margin-bottom: 0.6rem;
  color: var(--essay-text);
}

:deep(.pg-markdown-body p) {
  margin-bottom: 1.4rem;
  color: var(--essay-text);
  text-align: justify;
}

:deep(.pg-markdown-body ul),
:deep(.pg-markdown-body ol) {
  margin-bottom: 1.4rem;
  padding-left: 1.5rem;
  color: var(--essay-text);
}

:deep(.pg-markdown-body li) {
  margin-bottom: 0.4rem;
}

:deep(.pg-markdown-body img) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto 1rem;
}

:deep(.pg-markdown-body table) {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
  margin-bottom: 1.4rem;
  font-size: 0.85rem;
  line-height: 1.4;
}

:deep(.pg-markdown-body th),
:deep(.pg-markdown-body td) {
  border: 1px solid var(--essay-border);
  padding: 0.4rem 0.6rem;
  text-align: left;
  vertical-align: top;
}

:deep(.pg-markdown-body th) {
  background: var(--essay-code-bg);
}

:deep(.pg-markdown-body a) {
  color: var(--essay-link);
  text-decoration: none;
}

:deep(.pg-markdown-body a:hover) {
  text-decoration: underline;
}

:deep(.pg-markdown-body code) {
  font-family: monospace;
  font-size: 0.9em;
  background: var(--essay-code-bg);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  color: var(--essay-code);
}

:deep(.pg-markdown-body pre) {
  background: var(--essay-pre-bg);
  border: 1px solid var(--essay-border);
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  margin-bottom: 1.4rem;
}

:deep(.pg-markdown-body pre code) {
  background: transparent;
  padding: 0;
  border-radius: 0;
  color: var(--essay-pre-text);
  font-size: 0.9rem;
}

:deep(.pg-markdown-body .mermaid p) {
  text-align: left; /* essay paragraphs are justified; diagram labels shouldn't be */
  margin: 0;
}

:deep(.pg-markdown-body .mermaid) {
  display: flex;
  justify-content: center;
  margin-bottom: 1.4rem;
  overflow-x: auto;
}

:deep(.pg-markdown-body blockquote) {
  border-left: 3px solid var(--essay-link);
  padding-left: 1rem;
  margin: 1.4rem 0;
  font-style: italic;
  color: var(--essay-quote);
}
</style>
