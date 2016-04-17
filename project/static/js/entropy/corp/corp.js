goog.provide('entropy.corp.Corp');

/**
 * Corp instance in the solar system.
 * (Object that has the movement physically calculed.)
 * @classdesc
 * @constructor
 */
entropy.corp.Corp = function(context) {

    /**
    * Context information of this corp
    * @type {entropyx.CorpContext}
    */
    this.context = context;

	/**
	* Group that binds the layer of this corp.
	* @type {THREE.Group}
	* @private
	*/
	this.group = new THREE.Group();

	/**
	* Radius of the planet in THREE JS units
	* @type {number}
	* @private
	*/
	this.radius_ = context.radius;

	/**
	* Array of [x,y,z] coordinate that defines
	* the orbits of the corp
	*
	* @type {Array<Array<number>}
	* @private
	*/
	this.orbitCoordinate = goog.isDef(context.orbit_coordinates) ?
      context.orbit_coordinates: [];

    /**
    * If we update coordinate or not in the renderer
    * @type {boolean}
    * @private
    */
    this.stop = true;

	/**
	* Context of the atmosphere, if undefined there is no
	* atmosphere layer
	*
	* @type {entropyx.CorpContext.AtmosphereContext}
	*/
	this.atmosphereContext = context.atmosphere_context;

	/**
	* Context of the ring, if undefined there is no
	* ring layer
	*
	* @type {entropyx.CorpContext.RingContext}
	* @private
	*/
	this.ringContext_ = context.ring_context;

	/**
	* Index of the current orbital position index.
	* the orbits of the corp
	*
	* @type {number}
	*/
	this.orbitIndex = goog.isDef(context.orbit_index) ?
	    context.orbitIndex : 0;

	/**
	* Rotation variation per frame.
	*
	* @type {Array<number>|undefined}
	*/
	this.rotation_ = context.rotation;

	/**
	* Position Z of the corp real time in AU
	* @type {string}
	* @private
	*/
	this.texturePath_ = context.texture_path;
	/**
	* Array of Planet texture mesh
	* @type {Array<THREE.Mesh>}
	* @private
	*/
	this.textureLayers_ = [];


	/**
	* Planet atmosphere plane surface mesh.
	* @type {THREE.Mesh|undefined}
	*/
	this.atmosphereLayer;

	/**
	* Planet ring mesh (if there is one).
	* @type {THREE.Mesh|undefined}
	*/
	this.ringLayer;

	/**
	* Planet texture mesh
	* @type {THREE.Mesh}
	*/
	this.positionLayer = new THREE.Mesh();

	if (goog.isDef(this.ringContext_)) {
      this.loadRing_();
	}

	if (goog.isDef(this.atmosphereContext)) {
      this.loadAtmosphere_();
	}

	this.addTexture_(this.texturePath_);
	this.group.add(this.positionLayer);

	//temp
	this.distancePerAU = 600

};


/**
 * Get the current position of the corp.
 * @private
 * @param {string} texturePath
 */
entropy.corp.Corp.prototype.addTexture_ = function(texturePath) {
	/*the radius here depends on the number of texture layers we
	get into the corp */
	var radius = this.radius_ + this.textureLayers_.length * 0.1
	var geometry = new THREE.SphereGeometry(radius, 140, 140);
	var texture = THREE.ImageUtils.loadTexture(texturePath);
	texture.repeat.set(1, 1);
	var material = new THREE.MeshBasicMaterial({map: texture});
	var textureLayer = new THREE.Mesh(geometry, material);
	this.textureLayers_.push(textureLayer);
	this.group.add(textureLayer);
};


/**
 * Load the corp atmosphere from file path
 * @private
 * @param {string} texturePath
 */
entropy.corp.Corp.prototype.loadAtmosphere_ = function() {
	var context = this.atmosphereContext;
	var size = context.size;
	var geometry = new THREE.PlaneGeometry(size, size, 1);
	var texture = THREE.ImageUtils.loadTexture(context.texture_path);
    var color = context.color;
	var material = new THREE.MeshBasicMaterial({map: texture,
		transparent: true,
		color: "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")"
	});
	this.atmosphereLayer = new THREE.Mesh(geometry, material);
	this.group.add(this.atmosphereLayer);
};


/**
 * Load the corp ring from file path
 * @private
 * @param {string} texturePath
 */
entropy.corp.Corp.prototype.loadRing_ = function() {
	var context = this.ringContext_;

	var size = context.ring_size;
	var geometry = new THREE.PlaneGeometry(size, size, 1);
	var texture = THREE.ImageUtils.loadTexture(context.ring_path);
	var material = new THREE.MeshBasicMaterial({map: texture,
		transparent: true,
		side: THREE.DoubleSide
	});
	this.ringLayer = new THREE.Mesh(geometry, material);
	this.group.add(this.ringLayer);
	if (goog.isDef(context.ring_rotation)) {
		var rotation = new THREE.Vector3(
            context.ring_rotation[0],
            context.ring_rotation[1],
            context.ring_rotation[2]);
		this.ringLayer.rotation.set(
			rotation.x,
			rotation.y,
			rotation.z
		);
	}
};


/*
 * Update the positionof the corp
 * @param {THREE.PerspectiveCamera} camera
 * @param {entropy.physic.PhysicMachine}
 */
entropy.corp.Corp.prototype.updatePosition =
    function(physicMachine) {

  if (physicMachine.async) {
    var orbitIndex = this.orbitIndex;
    var coordinate = this.orbitCoordinate[orbitIndex];
    var speed = 10;

    this.group.position.set(
      coordinate[0] * this.distancePerAU,
      coordinate[1] * this.distancePerAU,
      coordinate[2] * this.distancePerAU
    );

    if(orbitIndex + speed < this.orbitCoordinate.length - 1) {
      this.orbitIndex+=speed;
    } else {
  	  this.orbitIndex = 0;
    }
  } else {
  	/* positioning updates fallback to the physic machine
  	 when in sync mode */
  	console.log('here')
  	console.log(physicMachine);
    physicMachine.updateCorpPosition(this);
  }

};


/*
 * Update the rotation of the corp
 * Please note that we only need to update the texture rotation
 * and the atmosphere plane surface needs to follow the camera.
 * @param {THREE.PerspectiveCamera} cameraRotation
 */
entropy.corp.Corp.prototype.updateRotation =
    function(cameraPosition,  selectedCorpReferential, isSelectedCorp) {
    var textureLayers = this.textureLayers_;

	if (goog.isDef(this.rotation_)){
		for (i = 0; i < textureLayers.length; ++i) {
			var textureRotation = textureLayers[i].rotation;
			textureRotation.set(
				textureRotation.x + this.rotation_[0],
				textureRotation.y + this.rotation_[1],
				textureRotation.z + this.rotation_[2]
			);
		}
	}
	if(!isSelectedCorp) {

		this.atmosphereLayer.position.set(
			this.group.position.x - selectedCorpReferential.x,
			this.group.position.y - selectedCorpReferential.y,
			this.group.position.z - selectedCorpReferential.z
		);

	}
	this.atmosphereLayer.lookAt(cameraPosition);
	this.atmosphereLayer.position.set(0,0,0);
};


/**
 * Get the current position of the corp.
 */
entropy.corp.Corp.prototype.getPosition = function() {
	return this.group.position;
};


/**
 * Append coordinate of the corp
 */
entropy.corp.Corp.prototype.appendCoordinate = function(coordinate) {
    this.orbitCoordinate.push(coordinate);
};

/**
 * Stop renderer while updating some important parameters
 * regarding rendering.
 * @param {entropy.corp.Corp} corp
 */
entropy.corp.Corp.prototype.break = function() {
    this.stop = true;
};


/**
 * Stop renderering of the corp while updating some important parameters
 * regarding him.
 * @param {entropy.corp.Corp} corp
 */
entropy.corp.Corp.prototype.start = function() {
    this.stop = false;
};
