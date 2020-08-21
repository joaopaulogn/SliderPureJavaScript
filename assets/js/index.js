// CONSTANTS NEEDED TO WORK

// For elements
const carousel = document.querySelector('.carousel');
const carouselGallery = document.querySelector('.carousel__gallery');
const carouselImages = document.querySelectorAll('.carousel__img');
const btnPrev = document.querySelector('.btn--prev');
const btnNext = document.querySelector('.btn--next');
const carouselControls = document.querySelector('.carousel__controls');
const carouselIndicators = carouselControls.querySelectorAll('.carousel__indicator');

// For functionalities
const numberOfImages = carouselImages.length;
let imageIndex = 0;
const events = ['click', 'touchstart'];

// For manipulate by CSS
const activeClass = 'activeImg';
const activeIndicator = 'activeIndicator';

// Function that creates spans automatically
function createIndicators(element, amount) {
    const _indicatorClass = 'carousel__indicator';
    for (i = 1; i <= amount; i++) {
        carouselControls.innerHTML += `<${element} class="${_indicatorClass}"></${element}`;
    }

    if (amount > 10) {
        document.querySelectorAll(`.${_indicatorClass}`).forEach(i => {
            i.style.width = '1.2rem';
            i.style.height = '1.2rem';
        })
    }
}
window.onload = createIndicators('span', numberOfImages);

// Function that manages an element's class
function managerClass(elements, classe, index) {
    elements.forEach(element => {
        element.classList.remove(classe)
    })
    elements[index].classList.add(classe);
}

// Function that shows the current image through the indicator
function currentElement(index) {
    slider(index);
    imageIndex = index;
    managerClass(carouselControls.childNodes, activeIndicator, index);
}

// Initial state of the carousel
carouselImages[0].classList.add(activeClass);
carouselControls.firstElementChild.classList.add(activeIndicator);

// Function that activate carousel
function slider(index) {
    managerClass(carouselImages, activeClass, index);
    managerClass(carouselControls.childNodes, activeIndicator, index);
}

// Function of the button next
function nextImg() {
    imageIndex++;
    if (imageIndex === numberOfImages) {
        imageIndex = 0;
    }
    slider(imageIndex);
}

// Function of the button previous
function prevImg() {
    if (imageIndex === 0) {
        imageIndex = numberOfImages;
    }
    slider(--imageIndex);
}

// Events that activate the buttons and indicators functions
events.forEach(event => {
    btnNext.addEventListener(event, nextImg);
    btnPrev.addEventListener(event, prevImg);
    carouselControls.childNodes.forEach((indicator, index) => {
        indicator.addEventListener(event, () => {
            currentElement(index)
        });
    })
})