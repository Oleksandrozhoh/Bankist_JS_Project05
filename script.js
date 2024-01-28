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

btnLearnMore.addEventListener('click', function (e) {
  const s1coordinates = section1.getBoundingClientRect();
  //scrolling
  // window.scrollTo({
  //   left: s1coordinates.left + window.pageXOffset,
  //   top: s1coordinates.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' }); // modern method to scroll
});

/// LECTURES
// selecting elements
// console.log(document.getElementsByClassName('btn')); // returns HTML collection

// programatically creating adding and removing element
const cookieMessage = document.createElement('div');
cookieMessage.classList.add('cookie-message');
cookieMessage.innerHTML =
  'We use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';
header.append(cookieMessage);
// header.prepend(cookieMessage.cloneNode(true));
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    cookieMessage.remove();
  });

// styling element
cookieMessage.style.backgroundColor = '#37383d';
cookieMessage.style.width = '120%';
console.log(getComputedStyle(cookieMessage).height);
cookieMessage.style.height =
  Number.parseFloat(getComputedStyle(cookieMessage).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
console.log(logo.id);

console.log(logo.dataset.qa);

const mouseEnterAlert = function () {
  alert('addEventListener: great! you are reading the heading :D');
};
const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', mouseEnterAlert);
// h1.removeEventListener('mouseenter', mouseEnterAlert);

//older way to listen to events
// h1.onmouseenter = function () {
//   alert('onmouseenter: great! you are reading the heading :D');
// };

// setTimeout(() => h1.removeEventListener('mouseenter', mouseEnterAlert), 5000);

// bubling
const randomColor = () =>
  `rgb(${Math.trunc(Math.random() * 255 + 1)}, ${Math.trunc(
    Math.random() * 255 + 1
  )}, ${Math.trunc(Math.random() * 255 + 1)})`;

const navLink = document.querySelector('.nav__link');
const navLinks = document.querySelector('.nav__links');
const navSection = document.querySelector('.nav');

navLink.addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  e.stopPropagation();
});
navLinks.addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
navSection.addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
});
