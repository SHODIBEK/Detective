import './vendor';
import './helpers';
import './components/social';
import {ieFix} from './vendor/ie-fix';
import {vhFix} from './vendor/vh-fix';
import {actualYear} from './modules/actualYear';
import header from './components/header';
import tabs from './components/tabs';
import Swiper, { Navigation } from 'swiper';
import { Fancybox } from "@fancyapps/ui";
import ru from "@fancyapps/ui/src/Fancybox/l10n/ru";
// import lazyLoading from './modules/lazyLoading';
// import scrollToAnchor from './modules/scrollToAnchor';
import helpers from './helpers';

function openModal() {
  return new Promise((resolve) => {

    helpers.lockScroll(true, helpers.$body.find('.modal__wrapper'));

    helpers.$header.css('right', `${helpers.getScrollbarWidth()}px`);

    $('.modal').addClass('is-active');

			resolve();
	});
}

function closeModal() {
  helpers.lockScroll(false, helpers.$body.find('.modal__wrapper'));

  helpers.$header.css('right', '');

  $('.modal').removeClass('is-active');
}

function initModal() {
  $('.js-openModal').on('click', openModal);

  setTimeout(() => {
    $('.js-closeModal').on('click', closeModal);
  }, 500);

  helpers.$document
		.on('click', (e) => {
			let $container = $('.modal');

			if ($container.is(e.target) && $container.has(e.target).length === 0 && $container.hasClass('is-active')) {
				closeModal();
			}
		})
		.on('keyup.modal', (e) => {
			if ((e.key === 'Escape' || e.key === 'Esc') && $('.modal').hasClass('is-active')) {
				closeModal();
			}
		});
}

initModal();
ieFix();
vhFix();
actualYear();
// scrollToAnchor.init();
tabs.init();
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

// init Swiper:
const swiper = new Swiper('.tabs__slider .swiper', {
  modules: [Navigation],
  spaceBetween: 20,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 'auto'
    },
    1023: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    }
  }
});

const certificate = new Swiper('.certificate .swiper', {
  modules: [Navigation],
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      spaceBetween: 16,
      slidesPerView: 'auto'
    },
    1023: {
      spaceBetween: 50,
      slidesPerView: 4,
    },
    1200: {
      spaceBetween: 70,
      slidesPerView: 5,
    }
  }
});

// Fancyapps init
Fancybox.bind("[data-fancybox]", {
  l10n: ru
});

const faqsLine = () => {
  let line = $('.faqs .js-line-faqs');
  let block = $('.gray-block');

  if (line.length && block.length) {
    let offset = block.position();
    if($(window).width() > 1023) {
      line.css('top', (offset.top - 150)).show();
    } else {
      line.css('top', (offset.top - 50)).show();
    }
  }
};

faqsLine();

$(window).on('resize', faqsLine);