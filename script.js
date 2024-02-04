'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnLearnMore = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const section2 = document.getElementById('section--2');
const section3 = document.getElementById('section--3');
const navMenu = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const navMenuSection = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');

// functions
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////
// learn more scrolling
btnLearnMore.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////
// navigation menu scrolling ( with event delegation through navMenu section )
navMenu.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    // matching strategy
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////////////
// Tabs component
tabsContainer.addEventListener('click', function (e) {
  // using closesed parent method to always select the button
  const clickedEl = e.target.closest('.operations__tab');

  // check if the click wasoutside of the buttons
  if (!clickedEl) return;

  // make clicked button active and rest of the buttons not
  tabs.forEach(tab => {
    if (tab === clickedEl) tab.classList.add('operations__tab--active');
    else tab.classList.remove('operations__tab--active');
  });

  // make clicked content active and rest of the contents not
  const clickedElDataValue = clickedEl.dataset.tab;
  tabsContent.forEach(function (content) {
    if (
      content.classList.contains(`operations__content--${clickedElDataValue}`)
    )
      content.classList.add('operations__content--active');
    else content.classList.remove('operations__content--active');
  });
});

/////////////////////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  const hoveredOver = e.target;
  const siblingLinks = hoveredOver
    .closest('.nav')
    .querySelectorAll('.nav__link');
  const logo = hoveredOver.closest('.nav').querySelector('.nav__logo');
  if (hoveredOver.classList.contains('nav__link')) {
    siblingLinks.forEach(el => {
      if (el !== hoveredOver) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

navMenuSection.addEventListener('mouseover', handleHover.bind(0.5));
navMenuSection.addEventListener('mouseout', handleHover.bind(1));

//////////////////////////////////////////////////////////
// sticky navigation menu bar
// window.addEventListener('scroll', function () {
//   const section1Pos = section1.getBoundingClientRect();
//   if (section1Pos.top < 0) {
//     navMenuSection.classList.add('sticky');
//   } else {
//     navMenuSection.classList.remove('sticky');
//   }
// });

// with intersection observer API
const obsCallback = function (entries) {
  if (!entries[0].isIntersecting) navMenuSection.classList.add('sticky');
  else navMenuSection.classList.remove('sticky');
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navMenuSection.getBoundingClientRect().height}px`,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);

//////////////////////////////////////////////////////////
// reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  entries.forEach(e => console.log(e));
  const entry = entries[0];
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//////////////////////////////////////////////////////////
// revealing features images
const featuresImgs = document.querySelectorAll('img[data-src]');

const loadFeatureImgs = function (entries) {
  entries.forEach(entry => console.log(entry));
  const entry = entries[0];
  if (entry.isIntersecting) {
    entry.target.setAttribute('src', entry.target.dataset.src);
    // remove the blur only when img is loaded (JS triggering 'load' event automaticaly behind the scenes)
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    });
    imgObserver.unobserve(entry.target);
  }
};

const imgObserver = new IntersectionObserver(loadFeatureImgs, {
  root: null,
  threshold: 0,
  rootMargin: '-10px',
});

featuresImgs.forEach(img => {
  imgObserver.observe(img);
});

//////////////////////////////////////////////////////////
// slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const sliderBtnLeft = document.querySelector('.slider__btn--left');
  const sliderBtnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const createDots = function () {
    slides.forEach((_, i) =>
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class = "dots__dot" data-slide="${i}" title="sliderButton"></button>`
      )
    );
  };
  createDots();
  const sliderDots = document.querySelectorAll('.dots__dot');

  const activeDot = function (slide) {
    sliderDots.forEach(eachDot =>
      eachDot.classList.remove('dots__dot--active')
    );
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  let currentSlide = 0;
  const maxSlide = slides.length;
  goToSlide(currentSlide);
  activeDot(currentSlide);

  // arrow buttons sliding
  sliderBtnLeft.addEventListener('click', prevSlide);
  sliderBtnRight.addEventListener('click', nextSlide);

  document.addEventListener('keydown', function (e) {
    if (
      sliderBtnLeft.getBoundingClientRect().y > 0 &&
      sliderBtnLeft.getBoundingClientRect().y < 800
    ) {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    }
  });

  // dots sliding
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slideNumber = e.target.dataset.slide;
      goToSlide(slideNumber);
      activeDot(slideNumber);
    }
  });
};
slider();

//////////////////////////////////////////////////////////
// page close confirmation
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
///////////////////////////LECTURES/////////////////////////////

// DOM triversing
// const h1 = document.querySelector('h1');
// const highlights = h1.querySelectorAll('.highlight');
// console.log(highlights);
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// // get all the siblings of H1 element and add red background to all of them but h1 itself
// const allChildElements = h1.parentElement.children;
// console.log(allChildElements);
// [...allChildElements].forEach(function (el) {
//   if (el !== h1) {
//     el.style.background = 'red';
//   }
// });

// btnLearnMore.addEventListener('click', function (e) {
//   const s1coordinates = section1.getBoundingClientRect();
//   //scrolling
//   // window.scrollTo({
//   //   left: s1coordinates.left + window.pageXOffset,
//   //   top: s1coordinates.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });
//   section1.scrollIntoView({ behavior: 'smooth' }); // modern method to scroll
// });

// /// LECTURES
// // selecting elements
// // console.log(document.getElementsByClassName('btn')); // returns HTML collection

// // programatically creating adding and removing element
// const cookieMessage = document.createElement('div');
// cookieMessage.classList.add('cookie-message');
// cookieMessage.innerHTML =
//   'We use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';
// header.append(cookieMessage);
// // header.prepend(cookieMessage.cloneNode(true));
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     cookieMessage.remove();
//   });

// // styling element
// cookieMessage.style.backgroundColor = '#37383d';
// cookieMessage.style.width = '120%';
// console.log(getComputedStyle(cookieMessage).height);
// cookieMessage.style.height =
//   Number.parseFloat(getComputedStyle(cookieMessage).height, 10) + 30 + 'px';

// // document.documentElement.style.setProperty('--color-primary', 'orangered');

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// console.log(logo.id);

// console.log(logo.dataset.qa);

// const mouseEnterAlert = function () {
//   alert('addEventListener: great! you are reading the heading :D');
// };
// const h1 = document.querySelector('h1');
// // h1.addEventListener('mouseenter', mouseEnterAlert);
// // h1.removeEventListener('mouseenter', mouseEnterAlert);

// //older way to listen to events
// // h1.onmouseenter = function () {
// //   alert('onmouseenter: great! you are reading the heading :D');
// // };

// // setTimeout(() => h1.removeEventListener('mouseenter', mouseEnterAlert), 5000);

// // bubling
// const randomColor = () =>
//   `rgb(${Math.trunc(Math.random() * 255 + 1)}, ${Math.trunc(
//     Math.random() * 255 + 1
//   )}, ${Math.trunc(Math.random() * 255 + 1)})`;

// const navLink = document.querySelector('.nav__link');
// const navLinks = document.querySelector('.nav__links');
// const navSection = document.querySelector('.nav');

// navLink.addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   e.stopPropagation();
// });
// navLinks.addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
// navSection.addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
