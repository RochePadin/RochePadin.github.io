document.addEventListener("DOMContentLoaded", () => {
  /* 0. Initialize Lucide Icons */
  lucide.createIcons();

  /* 1. Preloader Curtain Animation */
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    if (preloader) preloader.style.transform = "translateY(-100%)";
  }, 1200);

  /* 2. Dark / Light Theme Toggle with Dynamic Icon Update */
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");

      // Swap Lucide sun/moon icon dynamically
      themeToggleBtn.innerHTML = `<i data-lucide="${isLight ? "sun" : "moon"}"></i>`;
      lucide.createIcons();
    });
  }

  /* 3. Interactive 5-Photo Cycle with Arcade Selector Button */
  const photoArch = document.getElementById("photoArch");
  const arcadePhotoBtn = document.getElementById("arcadePhotoBtn");
  const currentArchPhoto = document.getElementById("currentArchPhoto");
  const photoCounter = document.getElementById("photoCounter");

  const heroPhotos = [
    "images/hero-1.png",
    "images/hero-2.png",
    "images/hero-3.png",
    "images/hero-4.png",
    "images/hero-5.png",
  ];
  let photoIndex = 0;

  function cyclePhoto() {
    if (!currentArchPhoto) return;
    photoIndex = (photoIndex + 1) % heroPhotos.length;

    // Glitch/Fade transition
    currentArchPhoto.style.opacity = "0";
    currentArchPhoto.style.transform = "translateX(-50%) scale(0.95)";

    setTimeout(() => {
      currentArchPhoto.src = heroPhotos[photoIndex];
      currentArchPhoto.style.opacity = "1";
      currentArchPhoto.style.transform = "translateX(-50%) scale(1)";
      if (photoCounter) {
        photoCounter.textContent = `[${photoIndex + 1}/5]`;
      }
    }, 200);
  }

  if (photoArch) {
    photoArch.addEventListener("click", cyclePhoto);
  }
  if (arcadePhotoBtn) {
    arcadePhotoBtn.addEventListener("click", cyclePhoto);
  }

  /* 4. Section Scroll-Dimming & Navbar Observer */
  const sections = document.querySelectorAll(".portfolio-section");
  const navLinks = document.querySelectorAll(".nav-link");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const targetId = entry.target.getAttribute("id");
        const correspondingLink = document.querySelector(
          `.nav-link[data-target="${targetId}"]`,
        );

        if (entry.isIntersecting) {
          entry.target.classList.add("active-section");
          if (correspondingLink) {
            navLinks.forEach((link) => link.classList.remove("active"));
            correspondingLink.classList.add("active");
          }
        } else {
          entry.target.classList.remove("active-section");
        }
      });
    },
    { threshold: 0.3 },
  );

  sections.forEach((section) => sectionObserver.observe(section));

  /* 5. Projects & Certificates Segmented Control Switcher */
  const btnShowProjects = document.getElementById("btnShowProjects");
  const btnShowCertificates = document.getElementById("btnShowCertificates");
  const projectsView = document.getElementById("projectsView");
  const certificatesView = document.getElementById("certificatesView");

  if (
    btnShowProjects &&
    btnShowCertificates &&
    projectsView &&
    certificatesView
  ) {
    btnShowProjects.addEventListener("click", () => {
      btnShowProjects.classList.add("active");
      btnShowCertificates.classList.remove("active");

      certificatesView.classList.remove("active-panel");
      setTimeout(() => {
        certificatesView.style.display = "none";
        projectsView.style.display = "grid";
        setTimeout(() => projectsView.classList.add("active-panel"), 50);
      }, 300);
    });

    btnShowCertificates.addEventListener("click", () => {
      btnShowCertificates.classList.add("active");
      btnShowProjects.classList.remove("active");

      projectsView.classList.remove("active-panel");
      setTimeout(() => {
        projectsView.style.display = "none";
        certificatesView.style.display = "grid";
        setTimeout(() => certificatesView.classList.add("active-panel"), 50);
      }, 300);
    });
  }

  /* 6. Mobile Timeline Segmented Tab Switcher */
  const tabShowExp = document.getElementById("tabShowExp");
  const tabShowEdu = document.getElementById("tabShowEdu");
  const experienceColumn = document.getElementById("experienceColumn");
  const educationColumn = document.getElementById("educationColumn");

  if (tabShowExp && tabShowEdu && experienceColumn && educationColumn) {
    tabShowExp.addEventListener("click", () => {
      tabShowExp.classList.add("active");
      tabShowEdu.classList.remove("active");
      experienceColumn.style.display = "block";
      educationColumn.style.display = "none";
    });

    tabShowEdu.addEventListener("click", () => {
      tabShowEdu.classList.add("active");
      tabShowExp.classList.remove("active");
      educationColumn.style.display = "block";
      experienceColumn.style.display = "none";
    });
  }

  /* 7. EmailJS Form Integration */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    emailjs.init("MAHK8R803BWd6bheA");

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("submitBtn");
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i data-lucide="loader" class="btn-icon"></i> Sending...';
      lucide.createIcons();

      emailjs.sendForm("service_1othgcn", "template_ycmi1oo", contactForm).then(
        () => {
          if (formStatus) {
            formStatus.style.color = "var(--accent-color)";
            formStatus.textContent = "Message successfully transmitted!";
          }
          submitBtn.innerHTML =
            '<i data-lucide="check" class="btn-icon"></i> Sent Successfully';
          lucide.createIcons();
          contactForm.reset();

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML =
              '<i data-lucide="send" class="btn-icon"></i> Send Message';
            lucide.createIcons();
            if (formStatus) formStatus.textContent = "";
          }, 4000);
        },
        (error) => {
          console.error("EmailJS Error:", error);
          if (formStatus) {
            formStatus.style.color = "#ef4444";
            formStatus.textContent = "Transmission failed. Please try again.";
          }
          submitBtn.disabled = false;
          submitBtn.innerHTML =
            '<i data-lucide="send" class="btn-icon"></i> Send Message';
          lucide.createIcons();
        },
      );
    });
  }
});
