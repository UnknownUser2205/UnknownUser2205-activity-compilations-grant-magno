// Simple confetti effect on Send Wish button click
document.getElementById('wishBtn').addEventListener('click', function () {
  alert('Thank you for your birthday wishes! 🎉')

  // Create confetti elements
  for (let i = 0; i < 50; i++) {
    createConfetti()
  }
})

function createConfetti() {
  const confetti = document.createElement('div')
  confetti.className = 'confetti'
  document.body.appendChild(confetti)

  // Random position
  const startX = Math.random() * window.innerWidth
  const endX = startX + (Math.random() - 0.5) * 200

  // Random color
  const colors = ['#6c5ce7', '#a29bfe', '#fd79a8', '#00cec9', '#ffeaa7']
  confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]

  // Animation
  confetti.style.left = startX + 'px'
  confetti.style.top = '-10px'
  confetti.style.opacity = '1'

  // Animate
  const animation = confetti.animate(
    [
      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
      {
        transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`,
        opacity: 0,
      },
    ],
    {
      duration: 2000 + Math.random() * 3000,
      easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)',
    }
  )

  // Remove after animation
  animation.onfinish = () => confetti.remove()
}
