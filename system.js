// Portfolio in JavaScript

// Data structure for navigation links
const navLinks = [
    { href: "index.html", label: "Home" },
    { href: "projects-compact-grid.html", label: "Projects" },
    { href: "projecttable.html", label: "Project List" },
    { href: "contact.html", label: "Contact" },
    { href: "hire-me.html", label: "Hire Me" },
  ];
  
  // Data structure for portfolio projects
  const projects = [
    {
      imgSrc: "assets/img/nature/manufacturing1.jpg",
      alt: "Manufacturing Project",
      description: "Manufacturing Database System",
    },
    {
      imgSrc: "assets/img/nature/web.webp",
      alt: "Web Project",
      description: "Website Portfolio",
    },
    {
      imgSrc: "assets/img/tech/linux.png",
      alt: "Linux Project",
      description: "Linux Expertise",
    },
  ];
  
  // Function to generate navigation bar
  function createNavBar() {
    const navBar = document.createElement("nav");
    navBar.classList.add("white");
  
    const container = document.createElement("div");
    container.classList.add("nav-wrapper", "container");
    
    const logo = document.createElement("a");
    logo.id = "logo-container";
    logo.href = "#";
    logo.classList.add("brand-logo", "black-text");
    logo.textContent = "Mansib";
    
    const navList = document.createElement("ul");
    navList.classList.add("right", "hide-on-med-and-down");
    
    navLinks.forEach(link => {
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.label;
      anchor.classList.add("black-text");
      listItem.appendChild(anchor);
      navList.appendChild(listItem);
    });
  
    container.appendChild(logo);
    container.appendChild(navList);
    navBar.appendChild(container);
    document.body.prepend(navBar);
  }
  
  // Function to create project cards
  function createProjectCards() {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("row");
  
    projects.forEach(project => {
      const col = document.createElement("div");
      col.classList.add("col", "s12", "m6", "l4");
  
      const card = document.createElement("div");
      card.classList.add("card", "hoverable");
  
      const cardImage = document.createElement("div");
      cardImage.classList.add("card-image");
  
      const img = document.createElement("img");
      img.src = project.imgSrc;
      img.alt = project.alt;
      img.loading = "lazy";
  
      cardImage.appendChild(img);
      card.appendChild(cardImage);
  
      const cardContent = document.createElement("div");
      cardContent.classList.add("card-content");
      cardContent.textContent = project.description;
  
      card.appendChild(cardContent);
      col.appendChild(card);
      projectContainer.appendChild(col);
    });
  
    const mainContainer = document.querySelector("main");
    if (mainContainer) {
      mainContainer.appendChild(projectContainer);
    }
  }
  
  // Function to enable dark mode toggle
  function enableDarkModeToggle() {
    const darkModeSwitch = document.getElementById("darkModeSwitch");
  
    function setDarkMode(isDark) {
      if (isDark) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    }
  
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  
    if (darkModeSwitch) {
      darkModeSwitch.checked = savedMode;
      darkModeSwitch.addEventListener("change", () => {
        const isChecked = darkModeSwitch.checked;
        setDarkMode(isChecked);
        localStorage.setItem("darkMode", isChecked);
      });
    }
  }
  
  // Initialize everything
  function initializePortfolio() {
    createNavBar();
    createProjectCards();
    enableDarkModeToggle();
  }
  
  document.addEventListener("DOMContentLoaded", initializePortfolio);
  