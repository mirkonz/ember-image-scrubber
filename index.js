/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-image-scrubber',

  included: function(app) {
    this._super.included(app);
    app.import('vendor/ember-image-scrubber.css');
  }

};
