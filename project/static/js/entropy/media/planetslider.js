goog.require('goog.events');
goog.require('goog.events.Event');

goog.provide('entropy.media.PlanetSlider');



/**
 * Menu that can set properties of a corp dynamcally
 * (Object that has the movement physically calculed.)
 * @classdesc
 * @constructor
 */
entropy.media.PlanetSlider = function(medias) {

  this.medias_ = medias;

  this.currentSlideId_ = 0;


  this.slide = this.createSlide_(medias[this.currentSlideId_]);
}


/**
 * Get the element of the media Image
 * @return {element}
 */
entropy.media.PlanetSlider.prototype.createSlide_ =
    function(media) {
  var el = goog.dom.createDom('div', {
    'class': 'planet-slider'
  });


  var img = new entropy.media.Image(media.image_path);

  goog.dom.append(el, img.getElement());
  var title = goog.dom.createDom('h3');
  goog.dom.append(title, media.title);
  goog.dom.append(el, title);
  var p = goog.dom.createElement('p');
  goog.dom.append(p, media.text);
  goog.dom.append(el, p);

  this.createArrows_(el);

  return el;
}


/**
 * Create arrows depending on the
 * index of the the current slide
 * @return {element}
 */
entropy.media.PlanetSlider.prototype.createArrows_ =
    function(el) {

  var currentSlideId = this.currentSlideId_;
  var length = this.medias_.length;

  var arrows = goog.dom.createDom('div', {
    'class': 'arrows'
  });

  if (currentSlideId != 0) {
    var leftArrow = goog.dom.createDom('span', {
      'class': 'glyphicon glyphicon-chevron-left'
    });
    goog.events.listen(
        leftArrow, 'click', this.handleLeftArrow_,
        false, this);

    goog.dom.append(arrows, leftArrow);
  }

  if(currentSlideId != length - 1) {
    var rightArrow = goog.dom.createDom('span', {
      'class': 'glyphicon glyphicon-chevron-right'
    });
    goog.dom.append(arrows, rightArrow);
    goog.events.listen(
        rightArrow, 'click', this.handleRightArrow_,
        false, this);
    //TODO : UNREGISTER THIS STUFF
  }

  goog.dom.append(el, arrows);

}


/**
 * Fired when left arrow is clicked.
 * @param {mgi.result.ListEvent} event event object
 * @private
 */
entropy.media.PlanetSlider.prototype.handleLeftArrow_ =
    function(event) {
  this.currentSlideId_ -= 1;
  this.updateSlide_();
};


/**
 * Fired when right arrow is clicked.
 * @param {mgi.result.ListEvent} event event object
 * @private
 */
entropy.media.PlanetSlider.prototype.handleRightArrow_ =
    function(event) {
  this.currentSlideId_ += 1;

  this.updateSlide_();
};


/**
 * Fired when right arrow is clicked.
 * @param {mgi.result.ListEvent} event event object
 * @private
 */
entropy.media.PlanetSlider.prototype.updateSlide_ =
    function() {

  var element =
      goog.dom.getElementsByTagNameAndClass('planet-slider')[0];

  var corpMenu = goog.dom.getElement('corp-menu');
  corpMenu.children[0] = this.slide;

  goog.dom.removeChildren(corpMenu, this.slide);
  this.slide = this.createSlide_(
      this.medias_[this.currentSlideId_]);
  goog.dom.append(corpMenu, this.slide);

  //TODO: Dispatch event correctly...

};
