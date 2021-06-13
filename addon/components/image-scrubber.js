/* eslint-disable ember/require-tagless-components */
/* eslint-disable ember/no-classic-classes */
/* eslint-disable ember/no-jquery */
import Component from '@ember/component'
import $ from 'jquery'
import layout from '../templates/components/image-scrubber'

let currentSlide
let previousSlide

let scrubberAction = function (e) {
  const scrubber = $(this)
  const scrubberWidth = scrubber.innerWidth()
  const numSlides = $('.image-scrubber-inner', scrubber).children().length
  if (numSlides) {
    if (e.type == 'mousemove') {
      const x = e.pageX - scrubber.offset().left
      currentSlide = Math.floor(x / (scrubberWidth / numSlides)) + 1
      if (currentSlide !== previousSlide) {
        previousSlide = currentSlide
        setClasses(scrubber, currentSlide)
      }
    } else if (e.type === 'mouseleave') {
      if (currentSlide !== 1) {
        currentSlide = 1
        previousSlide = 1
        setClasses(scrubber, currentSlide)
      }
    }
  }
}

function setClasses(element, currentSlide) {
  $('.image-scrubber-inner > .image-slide-current', element).removeClass(
    'image-slide-current'
  )
  $(
    '.image-scrubber-inner > :nth-child(' + currentSlide + ')',
    element
  ).addClass('image-slide-current')
}

export default Component.extend({
  layout,
  classNames: ['image-scrubber'],

  didRender() {
    this._super(...arguments)
    const scrubber = this.$()

    scrubber.on('mousemove', scrubberAction)
    scrubber.on('mouseleave', scrubberAction)

    $('.image-scrubber-inner', scrubber)
      .children()
      .first()
      .addClass('image-slide-current')
  },

  willDestroyElement() {
    this._super(...arguments)
    const scrubber = this.$()

    scrubber.off('mousemove')
    scrubber.off('mouseleave')
  },
})
