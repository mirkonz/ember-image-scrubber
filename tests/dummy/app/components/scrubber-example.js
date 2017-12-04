import Component from '@ember/component';
import layout from '../templates/components/scrubber-example';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function createImages() {
  const images = shuffle([1,2,3,4,5,6,7,8,9,10]);
  const url = 'https://placeimg.com/200/200/people/';
  let urls = [];
  images.forEach(image => {
    urls.push(url + image);
  });
  return urls;
}

export default Component.extend({
  layout,
  didInsertElement() {
    let scrubbers = [];
    for(let i = 0; i < 8; i++) {
      scrubbers.push({images: createImages()});
    }
    this.set('scrubbers', scrubbers);
  }
});
