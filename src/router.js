import { createRouter, createWebHistory } from 'vue-router';
import Portfolio from './pages/Portfolio.vue';
import BlogIndex from './pages/blog/index.vue';
import BlogPostWrapper from './components/BlogPostWrapper.vue';

// Eager load all markdown files to extract frontmatter metadata for the index list
const markdownModules = import.meta.glob('./pages/blog/*.md', { eager: true });

export const blogPosts = Object.keys(markdownModules).map((path) => {
  const match = path.match(/\/blog\/(.+)\.md$/);
  const slug = match ? match[1] : '';
  const mod = markdownModules[path];
  
  return {
    slug,
    path: `/blog/${slug}`,
    component: mod.default,
    frontmatter: {
      title: mod.title || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      date: mod.date || new Date().toISOString().split('T')[0],
      author: mod.author || 'Sooraj Parakkattil Ravi',
      summary: mod.summary || '',
      tags: mod.tags || []
    }
  };
});



const routes = [
  {
    path: '/',
    name: 'portfolio',
    component: Portfolio
  },
  {
    path: '/blog',
    name: 'blog-index',
    component: BlogIndex
  },
  ...blogPosts.map(post => ({
    path: post.path,
    name: `blog-${post.slug}`,
    component: BlogPostWrapper,
    props: {
      postComponent: post.component,
      frontmatter: post.frontmatter
    }
  }))
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});
