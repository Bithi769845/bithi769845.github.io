/* ==========================================================================
   Academic Portfolio & CV Web Logic
   Designed for MS BITHI - AI Security Researcher
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Tabs
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  
  // Modal & Toast
  const bibtexModal = document.getElementById('bibtex-modal');
  const modalClose = document.getElementById('modal-close');
  const bibtexCode = document.getElementById('bibtex-code');
  const modalCopyBtn = document.getElementById('modal-copy-btn');
  const toast = document.getElementById('toast');

  // BibTeX Citation Database (Matching MS-Bithi-CV.pdf)
  const bibtexEntries = {
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
    'p2': `@article{bithi2026uavanomaly,
  title={A new adaptive federated learning approach for privacy preserving UAV anomaly detection under non-IID distributions},
  author={Bithi, Ms. and Masud, M. E. and Hossain, M. A.},
  journal={Scientific Reports},
  volume={16},
  pages={8451},
  year={2026},
  publisher={Nature Portfolio},
  doi={10.1038/s41598-026-38732-z}
}`,
    'c1': `@inproceedings{bithi2024ddos,
  title={Enhanced DDoS Detection in Software Defined Networking Using Ensemble-Based Machine Learning},
  author={Bithi, Ms. and Hossain, M. A. and Ahmed, M. K. and Sultana, R. and Ahammad, I. and Islam, M. S.},
  booktitle={2024 6th International Conference on Electrical Engineering and Information \& Communication Technology (ICEEICT)},
  year={2024},
  organization={IEEE},
  doi={10.1109/ICEEICT62016.2024.10534483}
}`
  };

  // Mobile Hamburger Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // 1. Navigation Active Scroll handling & Mobile Menu Close
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        const icon = mobileMenuToggle?.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  });

  // 2. Theme Toggle (Dark/Light Mode)
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      themeToggle.innerHTML = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
  }

  // 3. BibTeX Modal Handling
  document.querySelectorAll('.bibtex-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pubId = btn.getAttribute('data-id');
      if (bibtexEntries[pubId]) {
        bibtexCode.textContent = bibtexEntries[pubId];
        bibtexModal.classList.add('active');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      bibtexModal.classList.remove('active');
    });
  }

  if (bibtexModal) {
    bibtexModal.addEventListener('click', (e) => {
      if (e.target === bibtexModal) bibtexModal.classList.remove('active');
    });
  }

  if (modalCopyBtn) {
    modalCopyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(bibtexCode.textContent).then(() => {
        showToast('BibTeX citation copied to clipboard!');
        bibtexModal.classList.remove('active');
      });
    });
  }

  // 4. Contact Copy to Clipboard Handling
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyPhoneBtn = document.getElementById('copy-phone-btn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('bithimony01904@gmail.com').then(() => {
        showToast('Email address copied to clipboard!');
      });
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('+8801903643742').then(() => {
        showToast('Phone number copied to clipboard!');
      });
    });
  }

  // 5. Publication Category Filter Tabs
  const filterBtns = document.querySelectorAll('.pub-filter-btn');
  const pubCards = document.querySelectorAll('.pub-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      pubCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2500);
  }
});
