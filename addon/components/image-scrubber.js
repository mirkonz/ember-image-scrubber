import Ember from 'ember';
import layout from '../templates/components/image-scrubber';

const { $ } = Ember;
let currentSlide;
let previousSlide;

let scrubberAction = function(e) {
  const scrubber = $(this);
  const scrubberWidth = scrubber.innerWidth();
  const numSlides = $('.image-scrubber-inner', scrubber).children().length;
  if (numSlides) {
    if (e.type == 'mousemove') {
      const x = e.pageX - scrubber.offset().left;
      currentSlide = Math.floor(x / (scrubberWidth / numSlides)) + 1;
      if (currentSlide !== previousSlide) {
        previousSlide = currentSlide;
        setClasses(scrubber, currentSlide);
      }
    } else if (e.type === 'mouseleave') {
      if (currentSlide !== 1) {
        currentSlide = 1;
        previousSlide = 1;
        setClasses(scrubber, currentSlide);
      }
    }
  }
};

function setClasses(element, currentSlide) {
  $('.image-scrubber-inner > .image-slide-current', element).removeClass('image-slide-current');
  $('.image-scrubber-inner > :nth-child(' + currentSlide + ')', element).addClass('image-slide-current');
}

export default Ember.Component.extend({
  layout,
  classNames: ['image-scrubber'],

  didRender() {
    const scrubber = this.$();

    scrubber.on('mousemove', scrubberAction);
    scrubber.on('mouseleave', scrubberAction);

    $('.image-scrubber-inner', scrubber).children().first().addClass('image-slide-current');
  },

  willDestroyElement() {
    const scrubber = this.$();

    scrubber.off('mousemove');
    scrubber.off('mouseleave');
  }
});
