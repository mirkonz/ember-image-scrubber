import Ember from 'ember';
import layout from '../templates/components/image-scrubber';

const { $ } = Ember;

let scrubberAction;
let scrubber;

export default Ember.Component.extend({
  layout,
  classNames: ['image-scrubber'],

  didRender() {
    scrubber = this.$();
    let currentSlide;
    let previousSlide;

    scrubberAction = function(e) {
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

    $('.image-scrubber-inner', scrubber).children().first().addClass('image-slide-current');
    scrubber.on('mousemove.ember-image-scrubber', scrubberAction);
    scrubber.on('mouseleave.ember-image-scrubber', scrubberAction);
  },

  didDestroyElement() {
    scrubber.off('mousemove.ember-image-scrubber', scrubberAction);
    scrubber.off('mouseleave.ember-image-scrubber', scrubberAction);
  }
});
