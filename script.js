/* ==========================================================================
   LaTeX PhD CV Interactive Logic
   Designed for MS BITHI
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Theme & Font Controls
  const themeToggle = document.getElementById('theme-toggle');
  const fontToggle = document.getElementById('font-toggle');
  const printBtn = document.getElementById('print-btn');
  const searchInput = document.getElementById('search-input');

  // BibTeX Modal Elements
  const modalBackdrop = document.getElementById('bibtex-modal');
  const modalClose = document.getElementById('modal-close');
  const modalPre = document.getElementById('bibtex-code');
  const modalCopyBtn = document.getElementById('modal-copy');
  const toast = document.getElementById('toast');

  // BibTeX Dictionary for Ms. Bithi's Publications
  const bibtexData = {
    'p1': `@article{bithi2026uav,
  title={A federated learning-benchmarking framework for privacy-preserving UAV intrusion detection using adaptive aggregation algorithms},
  author={Bithi, Ms. and Alsubait, T. and Ibraheem, A. and Masud, M. E. and Hossain, M. A.},
  journal={Scientific Reports},
  volume={16},
  pages={21664},
  year={2026},
  publisher={Nature Portfolio},
  doi={10.1038/s41598-026-50865-9}
}`,
    'p2': `@article{bithi2026maritime,
  title={Non-IID-robust federated learning framework for maritime radar intrusion detection using dynamic weighting aggregation},
  author={Bithi, Ms. and Masud, M. E. and Alsubait, T. and Hossain, M. A.},
  journal={Scientific Reports},
  volume={16},
  pages={19842},
  year={2026},
  publisher={Nature Portfolio},
  doi={10.1038/s41598-026-48912-4}
}`,
    'c1': `@inproceedings{bithi2024ddos,
  title={Ensemble Machine Learning Approach for DDoS Detection in Software-Defined Networking using RFE Feature Selection},
  author={Bithi, Ms. and Mamun, A. A. and Rahman, M. S.},
  booktitle={2024 IEEE 6th International Conference on Electrical Engineering and Information & Communication Technology (ICEEICT)},
  pages={1--6},
  year={2024},
  organization={IEEE},
  doi={10.1109/ICEEICT62016.2024.10534483}
}`
  };

  // 1. Theme Toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      themeToggle.innerHTML = newTheme === 'dark' 
        ? '☀️ Light Mode' 
        : '🌙 Dark Mode';
    });
  }

  // 2. Font Toggle
  if (fontToggle) {
    fontToggle.addEventListener('click', () => {
      const currentFont = document.documentElement.getAttribute('data-font');
      const newFont = currentFont === 'sans' ? 'serif' : 'sans';
      document.documentElement.setAttribute('data-font', newFont);
      fontToggle.innerHTML = newFont === 'sans' 
        ? '📜 LaTeX Serif Font' 
        : '🔤 Modern Sans Font';
    });
  }

  // 3. Print / PDF Export
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 4. BibTeX Modal Handling
  document.querySelectorAll('.bibtex-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pubId = btn.getAttribute('data-id');
      if (bibtexData[pubId]) {
        modalPre.textContent = bibtexData[pubId];
        modalBackdrop.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }

  if (modalCopyBtn) {
    modalCopyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(modalPre.textContent).then(() => {
        showToast('BibTeX citation copied to clipboard!');
        modalBackdrop.classList.remove('active');
      });
    });
  }

  // Toast Function
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // 5. Live Search / Filter Keyword Highlighting
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      const mainCv = document.getElementById('cv-content');
      
      // Clear previous highlights
      removeHighlights(mainCv);

      if (query.length > 1) {
        highlightMatches(mainCv, query);
      }
    });
  }

  function removeHighlights(element) {
    const highlights = element.querySelectorAll('.highlight');
    highlights.forEach(span => {
      const parent = span.parentNode;
      parent.replaceChild(document.createTextNode(span.textContent), span);
      parent.normalize();
    });
  }

  function highlightMatches(element, query) {
    if (!element) return;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const nodesToReplace = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentNode.tagName === 'SCRIPT' || node.parentNode.tagName === 'STYLE' || node.parentNode.classList.contains('highlight')) {
        continue;
      }
      const val = node.nodeValue;
      if (val && val.toLowerCase().includes(query)) {
        nodesToReplace.push(node);
      }
    }

    nodesToReplace.forEach(node => {
      const parent = node.parentNode;
      const text = node.nodeValue;
      const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
      const frag = document.createDocumentFragment();
      let lastIdx = 0;
      let match;

      while ((match = regex.exec(text)) !== null) {
        const matchIdx = match.index;
        if (matchIdx > lastIdx) {
          frag.appendChild(document.createTextNode(text.substring(lastIdx, matchIdx)));
        }
        const span = document.createElement('span');
        span.className = 'highlight';
        span.textContent = match[0];
        frag.appendChild(span);
        lastIdx = regex.lastIndex;
      }

      if (lastIdx < text.length) {
        frag.appendChild(document.createTextNode(text.substring(lastIdx)));
      }

      parent.replaceChild(frag, node);
    });
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
});
