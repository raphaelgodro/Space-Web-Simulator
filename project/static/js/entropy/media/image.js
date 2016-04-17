goog.provide('entropy.media.Image');



/**
 * @enum {string}
 * @api stable
 */
entropy.media.ImageWidthType = {
  FULL: 'full',
  PX: 'pixel'
};

/**
 * Menu that can set properties of a corp dynamcally
 * (Object that has the movement physically calculed.)
 * @classdesc
 * @constructor
 */
entropy.media.Image = function(path, opt_width, opt_height) {

  this.el_ = goog.dom.createDom('img',{
      'src': path
    }
  );

  if (goog.isDef(opt_width)){
    this.el_.style.width = opt_width + "px";
  }
  if (goog.isDef(opt_height)){
    this.el_.style.height = opt_height + "px";
  }

}


/**
 * Get the element of the media Image
 * @return {element}
 */
entropy.media.Image.prototype.getElement = function() {
  return this.el_;
}