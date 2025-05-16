document.addEventListener('DOMContentLoaded', function () {
  // Currency toggle functionality
  const currencyButtons = document.querySelectorAll('.toggle-btn')
  const priceElements = document.querySelectorAll('.pricing-price')

  currencyButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      currencyButtons.forEach(btn => btn.classList.remove('active'))

      // Add active class to clicked button
      this.classList.add('active')

      const currency = this.dataset.currency

      // Update all prices
      priceElements.forEach(priceElement => {
        const amount = priceElement.querySelector('.price-amount')
        const currencySymbol = priceElement.querySelector('span:first-child')

        // Update amount
        amount.textContent = priceElement.dataset[currency]

        // Update symbol
        if (currency === 'usd') {
          currencySymbol.textContent = '$'
        } else if (currency === 'eur') {
          currencySymbol.textContent = '€'
        } else if (currency === 'gbp') {
          currencySymbol.textContent = '£'
        }
      })
    })
  })

  // Education level toggle functionality
  const levelButtons = document.querySelectorAll('.level-btn')
  const programContainers = {
    preschool: document.getElementById('preschool-programs'),
    elementary: document.getElementById('elementary-programs'),
    juniorHigh: document.getElementById('junior-high-programs'),
    seniorHigh: document.getElementById('senior-high-programs'),
    undergrad: document.getElementById('undergrad-programs'),
    grad: document.getElementById('grad-programs'),
  }

  levelButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      levelButtons.forEach(btn => btn.classList.remove('active'))

      // Add active class to clicked button
      this.classList.add('active')

      const level = this.dataset.level

      // Hide all program containers
      Object.values(programContainers).forEach(container => {
        if (container) container.style.display = 'none'
      })

      // Show selected program container
      if (level === 'preschool' && programContainers.preschool) {
        programContainers.preschool.style.display = 'flex'
      } else if (level === 'elementary' && programContainers.elementary) {
        programContainers.elementary.style.display = 'flex'
      } else if (level === 'junior-high' && programContainers.juniorHigh) {
        programContainers.juniorHigh.style.display = 'flex'
      } else if (level === 'senior-high' && programContainers.seniorHigh) {
        programContainers.seniorHigh.style.display = 'flex'
      } else if (level === 'undergrad' && programContainers.undergrad) {
        programContainers.undergrad.style.display = 'flex'
      } else if (level === 'grad' && programContainers.grad) {
        programContainers.grad.style.display = 'flex'
      }
    })
  })

  // Enrollment button click handler
  const enrollButtons = document.querySelectorAll('.enroll-btn')
  enrollButtons.forEach(button => {
    button.addEventListener('click', function () {
      const program = this.closest('.pricing-card').querySelector('.pricing-title').textContent
      const price = this.closest('.pricing-card').querySelector('.price-amount').textContent
      const currency = document.querySelector('.toggle-btn.active').dataset.currency
      let symbol = '$'

      if (currency === 'eur') symbol = '€'
      if (currency === 'gbp') symbol = '£'

      alert(
        `You've selected the ${program} for ${symbol}${price} per month. Our admissions team will contact you shortly!`
      )
    })
  })

  // Animation on scroll
  const observerOptions = {
    threshold: 0.1,
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, observerOptions)

  const pricingCards = document.querySelectorAll('.pricing-card')
  pricingCards.forEach((card, index) => {
    card.style.opacity = 0
    card.style.transform = 'translateY(20px)'
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`
    observer.observe(card)
  })
})
