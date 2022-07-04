import './vendor';
import './helpers';
import './components/social';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';
import header from './components/header';
// import lazyLoading from './modules/lazyLoading';
// import scrollToAnchor from './modules/scrollToAnchor';

ieFix();
vhFix();
actualYear();
// scrollToAnchor.init();

header.init();
// lazyLoading.init();

const activeToggle = (e) => {
  let $this = $(e.currentTarget);

  $this.toggleClass('is-active');
}

const clickAnotherElement = (element) => {
  $(document).on('click', (e) => {
    if ($(e.target).closest(element).length) {
        return;
    }
    $(element).removeClass('is-active');
});
}

$('.location').on('click', activeToggle);
clickAnotherElement('.location');

$('.languages').on('click', activeToggle);
clickAnotherElement('.languages');

$('.header__hasmenu .header__link').on('click', (e) => {
  e.preventDefault();
  let current = $(e.currentTarget);

  current.parent().find('.submenu').addClass('is-active');
})

$('.header__back').on('click', (e) => {
  let current = $(e.currentTarget);
  current.closest('.submenu').removeClass('is-active');
});