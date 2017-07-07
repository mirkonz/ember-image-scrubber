/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-image-scrubber',

  included: function(app) {
    this._super.included.apply(this, arguments);
    // app.import(app.bowerDirectory + '/x-button/vendor/css/x-button.css');
    app.import('vendor/ember-image-scrubber.css');
  }

};
