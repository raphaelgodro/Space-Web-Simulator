goog.provide('entropy.interaction.SlideCorpMenuInteraction');

goog.require('goog.style');

/**
 * Interaction of the sliding menu
 * @classdesc
 * @constructor
 */
entropy.interaction.SlideCorpMenuInteraction =
    function() {
  this.toggled_ = false;
  this.isToggling_ = false;

  this.menuCorpEl_ = goog.dom.getElement('corp-menu');
  this.eventSlideEl_ = goog.dom.getElement('event-slide');

};
goog.inherits(entropy.interaction.Interaction, entropy.interaction.SlideCorpMenuInteraction);


/**
 *
 */
entropy.interaction.SlideCorpMenuInteraction.prototype.run =
    function() {
  if(!this.isToggling_){
    this.isToggling_ = true;
    if (this.toggled_){
      this.displayMenu_();
      this.toggled_ = false;
    } else {
      this.hideMenu_();
      this.toggled_ = true;
    }
    this.isToggling_ = false;
  }
};


/**
 */
entropy.interaction.SlideCorpMenuInteraction.prototype.displayMenu_ =
    function() {
  var el = this.menuCorpEl_;
  var eventEl = this.eventSlideEl_;

  var i = 100;
  function time () {
    setTimeout(function () {
      goog.style.setStyle(el, 'margin-right', -i + '%');
      var j = Math.floor(i/4);
      goog.style.setStyle(eventEl, 'margin-right', -j + '%');
      i--;
      if (i > -1) {
         time();
      }
    }, 15)
  }
  time();
};


/**
 *
 */
entropy.interaction.SlideCorpMenuInteraction.prototype.hideMenu_ =
    function() {
  var el = this.menuCorpEl_;
  var eventEl = this.eventSlideEl_;

  var i = 0;
  function time () {
    setTimeout(function () {
      goog.style.setStyle(el, 'margin-right', -i + '%');
      var j = Math.floor(i/4);
      goog.style.setStyle(eventEl, 'margin-right', -j + '%');
      var j = Math.floor(i/4);
      i++;
      if (i < 101) {
         time();
      }
    }, 15)
    }
  time();
};

