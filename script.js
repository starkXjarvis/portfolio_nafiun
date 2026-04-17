/* ============================================================
   IPE PORTFOLIO — script.js
   All interactive behaviour lives here.
   You should NOT need to edit this file to change content.
   ============================================================ */

/* ── Add proj-tag style dynamically (keeps CSS clean) ── */
const tagStyle = document.createElement('style');
tagStyle.textContent = `.proj-tag {
  font-size: 0.7rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: #707974;
}`;
document.head.appendChild(tagStyle);

/* ── Nav: add shadow on scroll ── */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── Mobile hamburger menu ── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
const h1 = document.getElementById('h1');
const h2 = document.getElementById('h2');
const h3 = document.getElementById('h3');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  // Animate hamburger → X
  h1.style.transform = menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  h2.style.opacity   = menuOpen ? '0' : '1';
  h3.style.transform = menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

function closeMobile() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  h1.style.transform = '';
  h2.style.opacity   = '1';
  h3.style.transform = '';
}

/* ── Scroll reveal (fade + slide up) ── */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ── Contact form: basic validation + toast ── */
function sendMessage() {
  const name  = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const msg   = document.getElementById('f-msg').value.trim();

  if (!name || !email || !msg) {
    alert('Please fill in all fields before sending.');
    return;
  }

  // Clear fields
  document.getElementById('f-name').value  = '';
  document.getElementById('f-email').value = '';
  document.getElementById('f-msg').value   = '';

  // Show toast
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ── Project gallery data: replace src values with your project photo file paths later ── */
const projectGalleryData = {
  'project-1': {
    title: 'Swift Cleaner: All in One Cleaning Tool',
    desc: 'Overview of the swift cleaner which we developed in our Product design course.',
    photos: [
      {
        src: 'assets/swift_cleaner.jpg',
        alt: 'Swift Cleaner device',
        caption: 'Swift Cleaner in action'
      },
      {
        src: 'assets/Swift Cleaner 2.jpg',
        alt: 'Swift Cleaner',
        caption: 'Swift Cleaner in action'
      }
    ]
  },
  'project-2': {
    title: 'Real Time Vibration and Temperature Monitoring system for Predictive Maintenance',
    desc: 'We had a hands on experience in designing IoT based system where we used Arduino IDE to program the microcontroller and used various sensors to monitor the vibration and temperature of the machine. We also designed a dashboard using Node-Red to visualize the data collected from the sensors in real-time. This project provided us with valuable insights into the practical applications of IoT in industrial settings and enhanced our skills in programming, data visualization, and system design.',
    photos: [
      {
        src: 'assets/IoT.jpg',
        alt: 'IOT',
        caption: 'Real Time Vibration and Temperature Monitoring system for Predictive Maintenance'
      },
      {
        src: 'assets/IoT 2.jpg',
        alt: 'IOT',
        caption: 'Information Flow'
      },
      {
        src: 'assets/IoT 3.jpg',
        alt: 'IOT',
        caption: 'Poster presentation'
      }
    ]
  },
  'project-3': {
    title: 'Structural Analysis of Swift CLeaner',
    desc: 'Here is a collection of structural analysis results for the Swift Cleaner which i have done using Ansys, showcasing the use of Ansys to evaluate and optimize the design. Each image highlights key findings from the analysis, demonstrating how potential stress points were identified and addressed to enhance the durability and performance of the product.',
    photos: [
      {
        src: 'assets/ansys_1.jpg',
        alt: 'Ansys stress analysis',
        caption: 'Ansys stress analysis results showing potential stress points'
      },
      {
        src: 'assets/ansys_2.jpg',
        alt: 'Ansys stress analysis',
        caption: 'Ansys stress analysis results showing potential stress points'
      },
      {
        src: 'assets/ansys_3.jpg',
        alt: 'Ansys stress analysis',
        caption: 'Ansys stress analysis results showing potential stress points'
      }
    ]
  },
  'project-4': {
    title: 'Solidworks Design Gallery',
    desc: 'Here is a collection of my SolidWorks designs, showcasing a range of projects from mechanical components to complex assemblies. Each design demonstrates my proficiency in 3D modeling, simulation, and product development, reflecting my commitment to engineering excellence and innovation.',
    photos: [
      {
        src: 'assets/Front View.JPG',
        alt: 'SolidWorks design',
        caption: 'Front view of the SolidWorks model Helicopter'
      },
      {
        src: 'assets/Top View 2.JPG',
        alt: 'SolidWorks design',
        caption: 'Top view of the SolidWorks model Helicopter'
      },
      {
        src: 'assets/swift_cleaner.jpg',
        alt: 'SolidWorks design',
        caption: 'Swift Cleaner design in SolidWorks'
      },
      {
        src: 'assets/1.png',
        alt: 'SolidWorks design',
        caption: 'Scissor in SolidWorks'
      }
    ]
  },
  'project-5': {
    title: 'Floor planning in Autocad',
    desc: 'Here are some floor plans I have designed using AutoCAD, showcasing my skills in architectural drafting and spatial planning. Each plan demonstrates my ability to create detailed and accurate representations of building layouts, reflecting my proficiency in AutoCAD and my understanding of design principles.',
    photos: [
      {
        src: 'assets/Autocad 1.jpg',
        alt: 'AutoCAD design',
        caption: 'AutoCAD floor plan'
      },
      {
        src: 'assets/Autocad 2.jpg',
        alt: 'AutoCAD design',
        caption: 'AutoCAD floor plan'
      }
    ]
  }
};

const modalOverlay = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-project-title');
const modalDesc = document.getElementById('modal-project-desc');
const modalPhotoGrid = document.getElementById('modal-photo-grid');
const modalClose = document.querySelector('.modal-close');

function openProjectGallery(projectId) {
  const project = projectGalleryData[projectId];
  if (!project) return;

  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;
  modalPhotoGrid.innerHTML = project.photos.map(photo => `
    <div class="photo-card">
      <img src="${photo.src}" alt="${photo.alt}" loading="lazy" />
      <div class="photo-caption">${photo.caption}</div>
    </div>
  `).join('');

  modalOverlay.classList.add('open');
  modalOverlay.setAttribute('aria-hidden', 'false');
}

function closeProjectGallery() {
  modalOverlay.classList.remove('open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  modalPhotoGrid.innerHTML = '';
}

modalClose.addEventListener('click', closeProjectGallery);
modalOverlay.addEventListener('click', event => {
  if (event.target === modalOverlay) {
    closeProjectGallery();
  }
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const projectId = card.dataset.project;
    if (projectId) {
      openProjectGallery(projectId);
    }
  });
});

function animateHeroLabel() {
  const label = document.getElementById('hero-animated-label');
  if (!label) return;

  const lines = ['A learner', 'A Researcher', 'An Engineer'];
  const wordDelay = 150;
  const holdDelay = 1200;
  const exitDelay = 350;
  let index = 0;

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function showLine() {
    label.classList.remove('exit');
    label.innerHTML = '';

    const words = lines[index].split(' ');
    words.forEach(word => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      label.appendChild(span);
    });

    const wordEls = label.querySelectorAll('.word');
    for (const wordEl of wordEls) {
      await sleep(wordDelay);
      wordEl.classList.add('visible');
    }

    await sleep(holdDelay);
    label.classList.add('exit');
    await sleep(exitDelay);

    index = (index + 1) % lines.length;
    showLine();
  }

  showLine();
}

animateHeroLabel();
