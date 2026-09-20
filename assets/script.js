/**
 * commingling.github.io - Theme, Navigation & Advanced Interactive Engine
 */

(function () {
  'use strict';

  // 1. Theme Management
  const STORAGE_KEY = 'commingling_theme';
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    } else {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    }
  }

  // Initialize Theme immediately
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, newTheme);
      applyTheme(newTheme);
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // 2. Clipboard Copy & Toast Feedback
  window.copyText = function (text, message) {
    if (!navigator.clipboard) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showToast(message || '已复制到剪贴板');
      } catch (err) {
        console.error('Copy fallback failed', err);
      }
      document.body.removeChild(textArea);
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      showToast(message || '已复制到剪贴板');
    }).catch(err => {
      console.error('Failed to copy', err);
    });
  };

  function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // 3. Interactive Architecture Pipeline Inspector
  const pipeNodes = document.querySelectorAll('.pipe-node');
  const pipeTitle = document.getElementById('inspector-title');
  const pipeRole = document.getElementById('inspector-role');
  const pipeTech = document.getElementById('inspector-tech');
  const pipeFail = document.getElementById('inspector-fail');
  const pipeSla = document.getElementById('inspector-sla');

  if (pipeNodes.length > 0) {
    pipeNodes.forEach(node => {
      node.addEventListener('click', () => {
        pipeNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');

        if (pipeTitle && node.dataset.title) pipeTitle.textContent = node.dataset.title;
        if (pipeRole && node.dataset.role) pipeRole.textContent = node.dataset.role;
        if (pipeTech && node.dataset.tech) pipeTech.textContent = node.dataset.tech;
        if (pipeFail && node.dataset.fail) pipeFail.textContent = node.dataset.fail;
        if (pipeSla && node.dataset.sla) pipeSla.textContent = node.dataset.sla;
      });
    });
  }

  // 4. Decision Matrix Tabs
  const decisionTabs = document.querySelectorAll('.tab-btn');
  const decisionPanels = document.querySelectorAll('.matrix-panel');

  if (decisionTabs.length > 0) {
    decisionTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        decisionTabs.forEach(t => t.classList.remove('active'));
        decisionPanels.forEach(p => (p.style.display = 'none'));

        tab.classList.add('active');
        const targetId = tab.dataset.target;
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.style.display = 'block';
        }
      });
    });
  }

  // 5. Project Category Filter Chips
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterChips.length > 0) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const filter = chip.dataset.filter;
        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // 6. ScrollSpy & Back-to-Top Button
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    // ScrollSpy
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollPos > 320) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
