goog.provide('entropy.interaction.ToggleViewInteraction');
goog.provide('entropy.interaction.ToggleViewKey');

goog.require('goog.style');


/**
 * @enum {number}
 * @api stable
 */
entropy.interaction.ToggleViewKey = {
  DEFAULT: 72
};

/**
 * Interaction
 * @classdesc
 * @constructor
 */
entropy.interaction.ToggleViewInteraction =
    function() {
  this.toggled_ = false;

  this.solarSystemMenuEl_ = goog.dom.getElement('solarsystemmenu');
  this.headerMenuEl_ = goog.dom.getElement('header-menu');
  this.menuCorpEl_ = goog.dom.getElement('corp-menu');

};
goog.inherits(entropy.interaction.Interaction, entropy.interaction.ToggleViewInteraction);


/**
 * Run interaction
 * @return {element}
 * @param {number} keyCode
 * @inheritDoc
 */
entropy.interaction.ToggleViewInteraction.prototype.run =
    function(keyCode) {
  if (this.toggled_){
    this.changeDisplayEl_(this.solarSystemMenuEl_, 1);
    this.changeDisplayEl_(this.headerMenuEl_ , 1);
    this.changeDisplayEl_(this.menuCorpEl_, 1);
    this.toggled_ = false;
  } else {
    this.changeDisplayEl_(this.solarSystemMenuEl_, 0);
    this.changeDisplayEl_(this.headerMenuEl_ , 0);
    this.changeDisplayEl_(this.menuCorpEl_, 0);
    this.toggled_ = true;
  }
}


/**
 */
entropy.interaction.ToggleViewInteraction.prototype.changeDisplayEl_ =
    function(element, opacity) {
  goog.style.setOpacity(element, opacity);
}