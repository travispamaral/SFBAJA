function anchorLinkHandler(e) {
  const distanceToTop = el => Math.floor(el.getBoundingClientRect().top)

  e.preventDefault()
  const targetID = this.getAttribute('href')
  const targetAnchor = document.querySelector(targetID)

  if (!targetAnchor) return

  const originalTop = distanceToTop(targetAnchor)

  window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' })

  const checkIfDone = setInterval(function() {
    const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2

    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      targetAnchor.tabIndex = '-1'
      targetAnchor.focus()
      window.history.pushState('', '', targetID)

      clearInterval(checkIfDone)
    }
  }, 500)
}

async function fetchImages () {
  const config = {
    headers: { Authorization: 'Bearer cee724132c12752ed782e14d0273c9fdde4972ab' }
  }
  const images = await axios.get('https://api.imgur.com/3/account/travisamaral/images', config).then(res => res.data.data)
  const gridContainer = document.querySelector('#gallery > .grid')

  images.map(i => {
    const gridItem = document.createElement('div')
    const img = document.createElement('img')

    img.src = i.link

    gridItem.classList.add('grid-item')
    gridItem.appendChild(img)
    gridContainer.appendChild(gridItem)
  })
}

function toggleMenu(e) {
  const hamburger = document.querySelector('.hamburger')
  const menu = document.querySelector('.menu')

  if (hamburger.classList.contains('is-active')) {
    hamburger.classList.remove('is-active')
    menu.classList.remove('is-open')
  } else {
    hamburger.classList.add('is-active')
    menu.classList.add('is-open')
  }
}

function closePopup() {
  const popup = document.querySelector('.popup')

  popup.classList.remove('is-active')
}

function openImage(item) {
  const imgsrc = item.target.src
  const popup = document.querySelector('.popup')
  const popupImg = document.querySelector('.popup > img')

  popupImg.src = imgsrc
  popup.classList.add('is-active')
}

function setupListeners() {
  const hamburger = document.querySelector('.hamburger')
  const popupClose = document.querySelector('.popup > .close')
  const linksToAnchors = document.querySelectorAll('a[href^="#"]')

  setTimeout(() => {
    const gridImages = document.querySelectorAll('#gallery .grid-item')

    gridImages.forEach(item => (item.addEventListener('click', openImage)))
  }, 500)

  // Open/Close nav
  hamburger.addEventListener('click', toggleMenu)
  // Close image popup
  popupClose.addEventListener('click', closePopup)
  // Smooth scroll anchors
  linksToAnchors.forEach(item => (item.addEventListener('click', anchorLinkHandler)))
}

// Kick it off and go get images
fetchImages()

// Setup listeners
setupListeners()
