document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const menuToggle = document.getElementById('menu-toggle')
  const nav = document.getElementById('nav')
  const overlay = document.getElementById('overlay')
  const toggleNav = document.getElementById('toggle-nav')
  const themeToggle = document.getElementById('theme-toggle')
  const navLinks = document.querySelectorAll('.nav-link[data-activity]')
  const activityFrame = document.getElementById('activity-frame')
  const activityTitle = document.getElementById('activity-title')
  const viewSourceBtn = document.getElementById('view-source')
  let currentActivity = 'mpc-history/index.html'

  // Toggle mobile menu
  menuToggle.addEventListener('click', function () {
    nav.classList.toggle('active')
    overlay.classList.toggle('active')
    document.body.classList.toggle('no-scroll')
  })

  overlay.addEventListener('click', function () {
    nav.classList.remove('active')
    overlay.classList.remove('active')
    document.body.classList.remove('no-scroll')
  })

  // Toggle navigation
  toggleNav.addEventListener('click', function () {
    document.body.classList.toggle('nav-collapsed')
    // Save preference to localStorage
    localStorage.setItem('navCollapsed', document.body.classList.contains('nav-collapsed'))
  })

  // Check for saved navigation preference
  if (localStorage.getItem('navCollapsed') === 'true') {
    document.body.classList.add('nav-collapsed')
  }

  // Dark mode toggle
  themeToggle.addEventListener('click', function () {
    const isDark = document.body.getAttribute('data-theme') === 'dark'
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark')
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>'
    // Save preference to localStorage
    localStorage.setItem('darkMode', !isDark)
  })

  // Check for saved theme preference
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.setAttribute('data-theme', 'dark')
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }

  // Load activity content
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault()

      // Update active state
      navLinks.forEach(l => l.classList.remove('active'))
      this.classList.add('active')

      // Load new activity
      currentActivity = this.getAttribute('data-activity')
      const activityName = this.querySelector('span').textContent

      activityFrame.src = currentActivity
      activityTitle.textContent = activityName

      // Update view source button
      viewSourceBtn.onclick = function () {
        window.open(currentActivity, '_blank')
      }

      // Close mobile menu if open
      if (window.innerWidth <= 768) {
        nav.classList.remove('active')
        overlay.classList.remove('active')
        document.body.classList.remove('no-scroll')
      }

      // Recalculate iframe height after content loads
      setTimeout(calculateIframeHeight, 100)
    })
  })

  // Initialize view source button
  viewSourceBtn.onclick = function () {
    window.open(currentActivity, '_blank')
  }

  // Dynamic iframe height calculation
  function calculateIframeHeight() {
    const headerHeight = document.querySelector('header').offsetHeight
    const footerHeight = document.querySelector('footer').offsetHeight
    const pageHeaderHeight = document.querySelector('.page-header').offsetHeight
    const padding = 32 // Total vertical padding

    let newHeight

    if (window.innerWidth <= 768) {
      // Mobile devices
      newHeight = window.innerHeight - headerHeight - footerHeight - pageHeaderHeight - padding
    } else if (window.innerWidth <= 1024) {
      // Tablets
      newHeight = window.innerHeight - headerHeight - footerHeight - pageHeaderHeight - padding - 20
    } else {
      // Desktops
      newHeight = window.innerHeight - headerHeight - footerHeight - pageHeaderHeight - padding - 40
    }

    activityFrame.style.height = `${Math.max(newHeight, 400)}px`
  }

  // Window resize handler
  function handleResize() {
    // Close mobile menu when resizing to larger screens
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
      nav.classList.remove('active')
      overlay.classList.remove('active')
      document.body.classList.remove('no-scroll')
    }

    calculateIframeHeight()
  }

  // Event listeners
  window.addEventListener('resize', handleResize)
  activityFrame.addEventListener('load', calculateIframeHeight)

  // Initial calculations
  calculateIframeHeight()

  // Prevent body scroll when menu is open (add to CSS)
  document.head.insertAdjacentHTML(
    'beforeend',
    `
    <style>
      body.no-scroll {
        overflow: hidden;
        position: fixed;
        width: 100%;
      }
    </style>
  `
  )
})
