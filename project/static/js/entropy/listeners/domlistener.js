goog.provide('entropy.interaction.DomListener');

goog.require('goog.events');
goog.require('goog.fx');
goog.require('goog.fx.DragEvent');
goog.require('goog.events.EventType');


/**
 * Object that is mapping every dom events in the app.
 * (Object that has the movement physically calculed.)
 * @classdesc
 * @constructor
 */
entropy.interaction.DomListener =
    function(renderer) {

  /**
    * @type {entropy.renderer.Renderer}
    * @private
    */
  this.renderer_ = renderer;

  /**
    * @type {entropy.renderer.Renderer}
    * @private
    */
  this.interactionsMap_ = [];

  this.createListeners_();

};


/**
 * Create the DOM Listeners into the app.
 */
entropy.interaction.DomListener.prototype.createListeners_ =
     function() {
  this.addInteraction_(goog.dom.getElement('event-slide'),
      goog.events.EventType.CLICK, new entropy.interaction.SlideCorpMenuInteraction());

  //goog.events.listen(window, goog.events.EventType.KEYUP, this.handleKeyUp_, false, this);
  this.interactionsMap_.forEach(function(listener) {
    var interaction = listener['interaction'];
    goog.events.listen(listener['element'],
        listener['eventType'],
        interaction.run, false, interaction);
  }, this);
};


/**
 * Add an interaction into the dom listener interaction map.
 */
entropy.interaction.DomListener.prototype.addInteraction_ =
     function(element, eventType, interaction) {
  this.interactionsMap_.push({
    'element': element,
    'eventType': eventType,
    'interaction': interaction
  });

};
