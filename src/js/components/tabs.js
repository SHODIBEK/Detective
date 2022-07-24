const eventClick = (target, block, lines) => {
  $(target).on('click', (e) => {
    let $this = $(e.currentTarget);
    let index = $this.index();
    let line = $(`.tabs .js-line`);

    if (line && lines) {
      let tabsOffset = $('.tabs').offset().top;
      let linkOffset = $this.offset().top;

      let totalOffset = Math.abs((tabsOffset - linkOffset) - 18);

      line.animate({top: totalOffset}, 200);
    }

    $this.addClass('is-active')
    .siblings()
    .removeClass('is-active');

    $(block)
    .eq(index)
    .addClass('is-active')
    .siblings()
    .removeClass('is-active');
  });
}

const init = () => {
  eventClick('.tabs__link', '.tabs__block', true);
  eventClick('.js-tab__link', '.js-tab__block', false);
}

export default {
  init
}