goog.provide('entropy.interaction.CameraMoveInteraction');



/**
 * @enum {number}
 * @api stable
 */
entropy.interaction.CameraMoveKey = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

/**
 * Interaction
 * (Object that has the movement physically calculed.)
 * @classdesc
 * @constructor
 */
entropy.interaction.CameraMoveInteraction =
    function(renderer) {
  this.renderer_ = renderer;

};
goog.inherits(entropy.interaction.Interaction, entropy.interaction.CameraMoveInteraction);


/**
 * Switch through 4 arrows defined for moving interactions.
 * @return {element}
 * @param {number} keyCode
 * @inheritDoc
 */
entropy.interaction.CameraMoveInteraction.prototype.run =
    function(keyCode) {
  var renderer = this.renderer_;
  var polarAngle = renderer.controls.getPolarAngle();
  console.log('polar', polarAngle);
  var azimuthalAngle = renderer.controls.getAzimuthalAngle();
  console.log('azimuthal', azimuthalAngle);
  var movingInterval = 2;
  console.log(this.renderer_);
  switch(keyCode) {
    case entropy.interaction.CameraMoveKey.LEFT:
        renderer.moveCamera(
            new THREE.Vector3(-movingInterval, 0, 0 ));
        break;
    case entropy.interaction.CameraMoveKey.UP:
        renderer.moveCamera(
            new THREE.Vector3(0, 0, -movingInterval ));
        break;
    case entropy.interaction.CameraMoveKey.RIGHT:
        renderer.moveCamera(
            new THREE.Vector3(movingInterval, 0, 0 ));
        break;
    case entropy.interaction.CameraMoveKey.DOWN:
        renderer.moveCamera(
            new THREE.Vector3(0, 0, movingInterval ));
        break;
    default:
        break;
  }
}