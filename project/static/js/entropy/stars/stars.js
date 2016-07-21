goog.provide('entropy.stars.Stars');



/**
 * Object containing and handling the background geometry.
 * (Stars)
 * @classdesc
 * @constructor
 */
entropy.stars.Stars = function() {
	/**
	* Group that binds the layer of this corp.
	* @type {number}
	*/
	this.stars = new THREE.Group();

	var geometry = new THREE.SphereGeometry(25000, 80, 80);
	var texture = THREE.ImageUtils.loadTexture('../../static/img/starsb_47_v2_constraint.jpg');
	texture.repeat.set(1, 1);

	var materialLayer1 = new THREE.MeshBasicMaterial({map: texture});
	var layer1 = new THREE.Mesh(geometry, materialLayer1);
	layer1.material.side = THREE.BackSide;
	this.stars.add(layer1);

};

/*
 * Update the central position of the background according
 * the selected corp position.
 * @param {entropy.corp.Corp} corp
 * @return {element}
 */
entropy.stars.Stars.prototype.updatePosition =
    function(corp) {

  var corpPosition = corp.getRenderingPosition();
  this.stars.position.set(
    corpPosition.x,
    corpPosition.y,
    corpPosition.z
  );
};


/*
 * Build DOM menu of the corp
 * @param {entropy.corp.Corp} corp
 * @return {element}
 */
entropy.stars.Stars.prototype.getGroup = function() {
  return this.stars;
};