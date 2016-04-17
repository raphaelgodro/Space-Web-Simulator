goog.provide('entropy.interaction.KeyListener');



/**
 * @enum {string}
 * @api stable
 */
/*entropy.media.ImageWidthType = {
  FULL: 'full',
  PX: 'pixel'
};*/

/**
 * Object that is mapping every keyboard events in the app.
 * (Object that has the movement physically calculed.)
 * @classdesc
 * @constructor
 */
entropy.interaction.KeyListener =
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
  goog.events.listen(window, goog.events.EventType.KEYUP, this.handleKeyUp_, false, this);

};


/**
 * Add an array of corps into the scene.
 * @param {Array<entropy.corp.Corp>}
 */
entropy.interaction.KeyListener.prototype.handleKeyUp_ =
     function(event) {
  var keyCode = event.keyCode;
  this.interactionsMap_.forEach(function(interactionMap){
    if (interactionMap['key'] == keyCode) {
      var interaction = interactionMap['interaction'];
      interaction.run(keyCode);
    }
  });
};


/**
 * Add an array of corps into the scene.
 * @param {Array<entropy.corp.Corp>}
 */
entropy.interaction.KeyListener.prototype.createListeners_ =
     function(event) {

  var renderer = this.renderer_;
  this.addInteraction_(
    entropy.interaction.CameraMoveKey.LEFT,
    new entropy.interaction.CameraMoveInteraction(
        renderer));
  this.addInteraction_(
    entropy.interaction.CameraMoveKey.UP,
    new entropy.interaction.CameraMoveInteraction(
        renderer));
  this.addInteraction_(
    entropy.interaction.CameraMoveKey.RIGHT,
    new entropy.interaction.CameraMoveInteraction(
        renderer));
  this.addInteraction_(
    entropy.interaction.CameraMoveKey.DOWN,
    new entropy.interaction.CameraMoveInteraction(
        renderer));

  this.addInteraction_(
    entropy.interaction.ToggleViewKey.DEFAULT,
    new entropy.interaction.ToggleViewInteraction());

};


/**
 * Add an array of corps into the scene.
 * @param {Array<entropy.corp.Corp>}
 */
entropy.interaction.KeyListener.prototype.addInteraction_ =
     function(key, interaction) {
  this.interactionsMap_.push({
    'key': key,
    'interaction': interaction
  });

};
