// Back to top button
const backToTopButton = document.querySelector('.back-to-top')

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add('active')
  } else {
    backToTopButton.classList.remove('active')
  }
})

backToTopButton.addEventListener('click', e => {
  e.preventDefault()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    })
  })
})

// Navbar background change on scroll
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar')
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)'
  } else {
    navbar.style.boxShadow = 'none'
  }
})

// Responsive adjustments with more granular control
function handleResponsiveElements() {
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  const isMobile = windowWidth < 768
  const isTablet = windowWidth >= 768 && windowWidth <= 1024
  const isDesktop = windowWidth > 1024

  // Adjust navbar padding based on screen size
  const navbar = document.querySelector('.navbar')
  if (isMobile) {
    navbar.style.padding = '10px 0'
  } else if (isTablet) {
    navbar.style.padding = '12px 0'
  } else {
    navbar.style.padding = '15px 0'
  }

  // Adjust hero section padding
  const hero = document.querySelector('.hero')
  if (windowHeight < 600) {
    hero.style.padding = '40px 0'
  } else if (isMobile) {
    hero.style.padding = '60px 0'
  } else if (isTablet) {
    hero.style.padding = '90px 0'
  } else {
    hero.style.padding = '100px 0'
  }

  // Adjust project card margins for different devices
  const projectCards = document.querySelectorAll('.project-card')
  projectCards.forEach(card => {
    if (isMobile) {
      card.style.marginBottom = '20px'
    } else if (isTablet) {
      card.style.marginBottom = '25px'
    } else {
      card.style.marginBottom = '30px'
    }
  })

  // Adjust font sizes for ultra-wide screens
  if (windowWidth > 2000) {
    document.querySelector('.hero h1').style.fontSize = '4rem'
    document.querySelector('.hero p').style.fontSize = '1.5rem'
    document.querySelectorAll('.section-title').forEach(title => {
      title.style.fontSize = '2.5rem'
    })
  } else {
    document.querySelector('.hero h1').style.fontSize = ''
    document.querySelector('.hero p').style.fontSize = ''
    document.querySelectorAll('.section-title').forEach(title => {
      title.style.fontSize = ''
    })
  }
}

// Initialize responsive elements on load
window.addEventListener('DOMContentLoaded', handleResponsiveElements)

// Update on resize with debounce
let resizeTimeout
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(handleResponsiveElements, 100)
})

// Mobile menu close on click
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse')
    if (navbarCollapse.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse)
      bsCollapse.hide()
    }
  })
})

// Detect device type and orientation changes
function checkOrientation() {
  const isPortrait = window.innerHeight > window.innerWidth
  document.body.classList.toggle('portrait', isPortrait)
  document.body.classList.toggle('landscape', !isPortrait)
}

window.addEventListener('DOMContentLoaded', checkOrientation)
window.addEventListener('resize', checkOrientation)
