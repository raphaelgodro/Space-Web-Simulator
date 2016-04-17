 goog.provide('entropy.corp.Star');



/**
 * Star in the solar system.
 * (Object that has the movement physically calculed.
 * @classdesc
 * @constructor
 * @extends {entropy.corp.Corp}
 */
entropy.corp.Star = function() {
	/**
	* Group that binds the layer of this corp.
	* @type {number}
	* @private
	*/
	this.group = new THREE.Group();

	var geometry = new THREE.SphereGeometry(0, 0, 0.01);
	var star = new THREE.Mesh();
	this.group.add(star);

	var geometry = new THREE.SphereGeometry(4, 200, 200);
	var texture = THREE.ImageUtils.loadTexture('http://104.131.100.253:6543/static/img/starsb_47.png');
	texture.repeat.set(1, 1);
	var material = new THREE.MeshBasicMaterial({map: texture});
	var starTexture = new THREE.Mesh(geometry, material);
	this.group.add(starTexture);
};
goog.inherits(entropy.corp.Star, entropy.corp.Corp);
