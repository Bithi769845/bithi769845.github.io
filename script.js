/* ==========================================================================
   Academic Portfolio & CV Web Logic
   Inspired by redoyakanda.github.io for MS BITHI
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Tabs
  const navLinks = document.querySelectorAll('.nav-link');
  const cvViewerContainer = document.getElementById('full-cv-container');
  const cvIframe = document.getElementById('cv-iframe');
  
  // PDF Download / Print Triggers
  const downloadCvBtn = document.getElementById('download-cv-btn');
  const sidebarCvBtn = document.getElementById('sidebar-cv-btn');
  const cvPrintTrigger = document.getElementById('cv-print-trigger');
  
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  
  // Modal & Toast
  const bibtexModal = document.getElementById('bibtex-modal');
  const modalClose = document.getElementById('modal-close');
  const bibtexCode = document.getElementById('bibtex-code');
  const modalCopyBtn = document.getElementById('modal-copy-btn');
  const toast = document.getElementById('toast');

  // BibTeX Citation Database
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

  // 1. Navigation Active State
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetTab = link.getAttribute('data-tab');
      if (targetTab === 'full-cv' || link.id === 'view-cv-tab') {
        e.preventDefault();
        showFullCv();
      } else {
        if (cvViewerContainer.classList.contains('active')) {
          cvViewerContainer.classList.remove('active');
        }
      }

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  function showFullCv() {
    cvViewerContainer.classList.add('active');
    cvViewerContainer.scrollIntoView({ behavior: 'smooth' });
    
    // Inject printable LaTeX CV format into iframe
    if (cvIframe && cvIframe.src === 'about:blank') {
      const cvHtml = generatePrintableCvHtml();
      const doc = cvIframe.contentDocument || cvIframe.contentWindow.document;
      doc.open();
      doc.write(cvHtml);
      doc.close();
    }
  }

  // 2. Download CV / Print Actions
  function triggerCvPrintOrDownload() {
    showFullCv();
    setTimeout(() => {
      if (cvIframe.contentWindow) {
        cvIframe.contentWindow.focus();
        cvIframe.contentWindow.print();
      } else {
        window.print();
      }
    }, 400);
  }

  if (downloadCvBtn) downloadCvBtn.addEventListener('click', (e) => { e.preventDefault(); triggerCvPrintOrDownload(); });
  if (sidebarCvBtn) sidebarCvBtn.addEventListener('click', (e) => { e.preventDefault(); triggerCvPrintOrDownload(); });
  if (cvPrintTrigger) cvPrintTrigger.addEventListener('click', () => { triggerCvPrintOrDownload(); });

  // 3. Theme Toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      themeToggle.innerHTML = newTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
  }

  // 4. BibTeX Modal Handling
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

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2500);
  }

  // 5. Generate Printable LaTeX CV Document HTML inside Iframe
  function generatePrintableCvHtml() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MS BITHI - Curriculum Vitae</title>
  <style>
    @import url('https://cdn.jsdelivr.net/gh/ars2017/computer-modern-web-font/fonts.css');
    body { font-family: "Computer Modern Serif", "Latin Modern Roman", Georgia, serif; line-height: 1.5; color: #111; padding: 30px; margin: 0; }
    h1 { font-size: 2rem; color: #003366; text-transform: uppercase; margin-bottom: 4px; text-align: center; }
    .subtitle { font-size: 1.1rem; font-weight: bold; text-align: center; margin-bottom: 10px; }
    .contact { font-size: 0.9rem; text-align: center; color: #444; margin-bottom: 20px; }
    .contact a { color: #0050a0; text-decoration: none; }
    h2 { font-size: 1.1rem; color: #003366; text-transform: uppercase; border-bottom: 1.5px solid #003366; padding-bottom: 3px; margin-top: 20px; margin-bottom: 10px; }
    p, li { font-size: 0.95rem; }
    ul { padding-left: 20px; margin-top: 4px; }
    .entry-header { display: flex; justify-content: space-between; font-weight: bold; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <h1>MS BITHI</h1>
  <div class="subtitle">AI Security Researcher | Federated Learning & Cybersecurity</div>
  <div class="contact">
    <a href="https://orcid.org/0009-0008-0719-7869">ORCID</a> • 
    <a href="https://www.kaggle.com/msbithi">Kaggle</a> • 
    <a href="https://www.researchgate.net/profile/Ms-Bithi">ResearchGate</a> • 
    <a href="https://scholar.google.com/citations?user=-YTxVAsAAAAJ&hl=en">Google Scholar</a> • 
    <a href="mailto:bithimony01904@gmail.com">bithimony01904@gmail.com</a> • 
    +880 1903643742
  </div>

  <h2>Profile Summary</h2>
  <p>Specializing in Federated Learning for privacy-preserving security systems with non-IID-robust aggregation algorithms across UAV, IoT, and maritime radar systems. Published two first-author papers in <strong>Scientific Reports (Nature Portfolio, Q1)</strong>.</p>

  <h2>Education</h2>
  <div class="entry-header">
    <span>Prime University &bull; B.Sc. in Computer Science & Engineering</span>
    <span>Feb 2020 – May 2024</span>
  </div>
  <p><strong>CGPA: 3.83 / 4.00</strong> (Merit Scholarships from 7th semester onward)</p>

  <h2>Research Publications</h2>
  <p><strong>[P1] Scientific Reports (Nature Q1 2026):</strong> A federated learning-benchmarking framework for privacy-preserving UAV intrusion detection.</p>
  <p><strong>[P2] Scientific Reports (Nature Q1 2026):</strong> Non-IID-robust federated learning framework for maritime radar intrusion detection.</p>
  <p><strong>[C1] IEEE ICEEICT 2024:</strong> Ensemble Machine Learning Approach for DDoS Detection in SDN.</p>

  <h2>Professional Experience</h2>
  <div class="entry-header">
    <span>Save the Children International &bull; Junior Software Engineer (Promoted)</span>
    <span>Sep 2024 – Present</span>
  </div>
  <p>Developing enterprise applications using ASP.NET Core MVC and Blazor. Initial role: Trainee .NET Developer.</p>

  <h2>Technical Skills</h2>
  <p>Python, C/C++, SQL, PyTorch, TensorFlow, Flower, ASP.NET Core, Blazor, Network Intrusion Detection, Federated Learning, DDoS Defense.</p>
</body>
</html>
    `;
  }
});
