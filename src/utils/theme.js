import { ref, watch } from 'vue';

const STORAGE_KEY = 'theme';
const media = window.matchMedia('(prefers-color-scheme: dark)');

const readStored = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
};

// index.html sets data-theme before first paint; start from whatever it chose
export const theme = ref(
  document.documentElement.dataset.theme || readStored() || (media.matches ? 'dark' : 'light')
);

watch(theme, (value) => {
  document.documentElement.dataset.theme = value;
}, { immediate: true });

// Follow OS changes until the visitor picks a theme explicitly
media.addEventListener('change', (e) => {
  if (!readStored()) theme.value = e.matches ? 'dark' : 'light';
});

export const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  try {
    localStorage.setItem(STORAGE_KEY, theme.value);
  } catch {
    // storage unavailable (private mode etc.); theme still applies for this visit
  }
};
