// CONSTANTS NEEDED TO WORK

// For elements
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
    for(i = 1; i <= amount; i++) {
        carouselControls.innerHTML += `<${element} class="carousel__indicator"></${element}`;
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

    managerClass(carouselControls.childNodes, activeIndicator, index);
}

// Events that activate the indicator function
events.forEach(event => {
    carouselControls.childNodes.forEach((indicator, index) => {
        indicator.addEventListener(event, () => {
            currentElement(index)
        });
    })
})

// Initial state of the carousel
carouselImages[0].classList.add(activeClass);
carouselControls.firstElementChild.classList.add(activeIndicator);

// Function that activate carousel
function slider(index) {
    managerClass(carouselControls.childNodes, activeIndicator, index); 
    managerClass(carouselImages, activeClass, index);
}

// Function of the button next
function nextImg() {
    if (imageIndex === numberOfImages) {
        imageIndex = 0;
    }

    slider(imageIndex);
    imageIndex++;
}

// Function of the button previous
function prevImg() {
    if (imageIndex === 0) {
        imageIndex = numberOfImages;
    }
    imageIndex--;
    slider(imageIndex);
}

// Events that activate the buttons functions
events.forEach(event => {
    btnNext.addEventListener(event, nextImg);
    btnPrev.addEventListener(event, prevImg);
})