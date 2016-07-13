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
	* Please note that we have a hack to set the satellitle
	* smaller. The backend planet size in pixel is a linear function
	* ...
	* @type {number}
	* @private
	*/
	this.radius_ = context.distance_friendly_crop ?
	    context.radius * context.distance_friendly_crop :
	    context.radius;

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
	* @type {number}
	*/
	this.orbitIndex = goog.isDef(context.orbit_index) ?
	    context.orbitIndex : 0;

	this.layerGap_ = 0.03;

	if (goog.isDef(context.distance_friendly_crop)) {
	  this.atmosphereContext.size *= context.distance_friendly_crop;
	  this.layerGap_ *= context.distance_friendly_crop;
	}

	/**
	* Rotation variation matrix
	*
	* @type {Array<number>|undefined}
	*/
	this.rotation_ = context.rotation;

   /**
	* Rotation variation matrix
	*
	* @type {Array<number>|undefined}
	*/
	this.rotationPerFrame_;

	if (goog.isDef(context.rotation_period)) {
      this.rotationPerFrame_ = 0;
	}

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
	* Current acceleration of the corp.
	* @type {Array<Number>}
	*/
	this.acc = [];

	/**
	* Planet texture mesh
	* @type {THREE.Mesh}
	*/
	this.positionLayer = new THREE.Mesh();
	this.addTexture_(this.texturePath_);

	if (goog.isDef(this.ringContext_)) {
      this.loadRing_();
	}

	this.group.add(this.positionLayer);
	this.loadAtmosphere_();

    if (!this.ringLayer) {
      console.log(this.context.name, this.ringLayer)
	  this.shadowLayer_ = this.createLayer_(
		  "../../static/img/shadow.png");
	  this.group.add(this.shadowLayer_);
	} else {
	  this.shadowLayer_ = this.textureLayers_[0];
	}
	

	//temp
	this.distancePerAU = 600;

    // extrapolation factor when we have a satellite.
	this.satelliteExtrapolationFactor_ = 4;

	/**
	* Current speed of the corp;
	* @type {Array<Number>}
	*/
	var speed = this.context.initial_speed;
	this.speed = [
	  speed[0],
	  speed[1],
	  speed[2]
	];

	//Set the initiial position of the corp from the context
	var initialPosition = this.context.initial_position;
	this.setPosition(initialPosition);

	/**
	* Position in astronomical unit.
	* @type {Array<Number>}
	*/
	this.position_ = initialPosition;

	/**
	* Parent corp instance of the corp.
	* @type {entropy.corp.Corp}
	*/
	this.parentCorp;

	/**
	* Satellite/child corpses of this corp.
	* @type {entropy.corp.Corp}
	*/
	this.childCorpses = [];

	/**
	* Related star to the corp instance.
	* @type {entropy.corp.Corp\undefined}
	*/
	this.relatedStars;

};


/**
 * Get the current position of the corp.
 * @private
 * @param {string} texturePath
 */
entropy.corp.Corp.prototype.createLayer_ = function(texturePath) {
	/*the radius here depends on the number of texture layers we
	get into the corp */
	var radius = this.radius_ + this.textureLayers_.length * this.layerGap_;
	var geometry = new THREE.SphereGeometry(radius, 140, 140);
	var texture = THREE.ImageUtils.loadTexture(texturePath);
	texture.repeat.set(1, 1);
	var material = new THREE.MeshBasicMaterial({map: texture,
	    transparent: true});
	var textureLayer = new THREE.Mesh(geometry, material);

	return textureLayer;
};


/**
 * Get the current position of the corp.
 * @private
 * @param {string} texturePath
 */
entropy.corp.Corp.prototype.addTexture_ = function(texturePath) {
    var textureLayer = this.createLayer_(texturePath);
	this.textureLayers_.push(textureLayer);
	this.group.add(textureLayer);
	//test
	/*var radius = this.radius_ + this.textureLayers_.length * 0.1
	var geometry = new THREE.SphereGeometry(radius, 140, 140);
	var sunTexture = THREE.ImageUtils.loadTexture(
		"../../static/img/test/sun_surface.png", undefined);
	sunTexture.anisotropy = 16;
	sunTexture.wrapS = sunTexture.wrapT = THREE.RepeatWrapping;
	sunColorLookupTexture = THREE.ImageUtils.loadTexture( "../../static/img/test/star_colorshift.png" );
	var starColorGraph = THREE.ImageUtils.loadTexture( '../../images/test/star_color_modified.png' );
	var sunUniforms = {
		texturePrimary:   { type: "t", value: sunTexture },
		textureColor:   { type: "t", value: sunColorLookupTexture },
		textureSpectral: { type: "t", value: starColorGraph },
		time: 			{ type: "f", value: 0 },
		spectralLookup: { type: "f", value: 0 },		
	};
	//	list of shaders we'll load
	var shaderList = ['../../static/shaders/starsurface'];

	//	a small util to pre-fetch all shaders and put them in a data structure (replacing the list above)
	function loadShaders( list, callback ){
		var shaders = {};	

		var expectedFiles = list.length * 2;
		var loadedFiles = 0;

		function makeCallback( name, type ){
			return function(data){
				if( shaders[name] === undefined ){
					shaders[name] = {};
				}
				
				shaders[name][type] = data;

				//	check if done
				loadedFiles++;
				if( loadedFiles == expectedFiles ){				
					callback( shaders );
				}

			};
		}
		
		for( var i=0; i<list.length; i++ ){
			var vertexShaderFile = list[i] + '.vsh';
			var fragmentShaderFile = list[i] + '.fsh';	

			//	find the filename, use it as the identifier	
			var splitted = list[i].split('/');
			var shaderName = splitted[splitted.length-1];
			$(document).load( vertexShaderFile, makeCallback(shaderName, 'vertex') );
			$(document).load( fragmentShaderFile,  makeCallback(shaderName, 'fragment') );
		}
	}
	var group = this.group;
	loadShaders( shaderList, function(e){
		//	we have the shaders loaded now...
		shaderList = e;
		function makeStarSurface( radius, uniforms ){
			var sunShaderMaterial = new THREE.ShaderMaterial( {
				uniforms: 		uniforms,
				vertexShader:   shaderList.starsurface.vertex,
				fragmentShader: shaderList.starsurface.fragment,
			});

			var sunSphere = new THREE.Mesh( geometry, sunShaderMaterial);
			return sunSphere;
		}
		starSurface = makeStarSurface( this.radius_, sunUniforms );
		group.add(starSurface);
	});*/
};


/**
 * Load the corp atmosphere from file path
 * @private
 * @param {string} texturePath
 */
entropy.corp.Corp.prototype.loadAtmosphere_ = function() {
	var context = this.atmosphereContext;
	var size = context.size;
	var geometry = new THREE.PlaneGeometry(size, size, 3);
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
    var frameSpeed = 10;
    this.setPosition(coordinate);

    this.speed = [coordinate[3], coordinate[4], coordinate[5]];

    if(orbitIndex + frameSpeed < this.orbitCoordinate.length - 1) {
      this.orbitIndex+=frameSpeed;
    } else {
  	  this.orbitIndex = 0;
    }
  } else {
  	/* positioning updates fallback to the physic machine
  	 when in synchronous mode */
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

	if ((goog.isDef(this.rotation_))&&(!this.ringLayer)){
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

	this.relatedStars.forEach(function(star){
	  var starPosition = star.getRenderingPosition();
      var currentPosition = this.getRenderingPosition();
      var deltaX = starPosition.x - currentPosition.x;
      var deltaZ = starPosition.z - currentPosition.z;
      var yAngle = Math.atan(deltaX/deltaZ);

      /* Angle factor because trigonometry works opposite
         in a z > 0 or z<0 set...*/
      var angleFactor = deltaZ >= 0 ? 1 : 3;
	  var shadowRotation = this.shadowLayer_.rotation;
	  shadowRotation.set(
	    shadowRotation.x =0,
	    shadowRotation.y = angleFactor*Math.PI/2 - 0.1 + yAngle,
	    shadowRotation.z = 0
	  );
	}, this);

	//Update 
};


/**
 * Get the current position of the corp.
 */
entropy.corp.Corp.prototype.getPosition = function() {
  return this.position_;
};


/**
 * Get the radius of the box that protects the corp
 * (camera limitation around the corp)
 */
entropy.corp.Corp.prototype.getRadiusBox = function() {
  if (goog.isDef(this.ringContext_)) {
    return this.ringContext_.ring_size;
  } else {
    return this.radius_;
  }
};


/**
 * Get the position of the renderred corp obejct
 */
entropy.corp.Corp.prototype.getRenderingPosition = function() {
  return this.group.position;
};


/**
 * Get the current speed of the corp.
 */
entropy.corp.Corp.prototype.getSpeed = function() {
	return this.speed;
};


/**
 * Get the current position of the corp.
 */
entropy.corp.Corp.prototype.getCoordinate = function() {
	return [
	  this.position_[0],
	  this.position_[1],
	  this.position_[2],
	  this.speed[0],
	  this.speed[1],
	  this.speed[2]
	];
};


/**
 * Set the position of the corp from AU units to renderer units..
 */
entropy.corp.Corp.prototype.setPosition = function(positionAU) {
  this.position_ = positionAU;
  if (goog.isDef(this.parentCorp)) {
    /* Satellite here. We have to extrapolate
     the difference of its position with the parent corp */
    var parentCorp = this.parentCorp;
    var parentCorpPosition = parentCorp.getPosition();
    var adjustedPosition = []
    for (var i = 0; i < positionAU.length; i++) {
      adjustedPosition.push(parentCorpPosition[i] +
          (parentCorpPosition[i] - positionAU[i]) *
          this.satelliteExtrapolationFactor_);
    }
  } else {
    adjustedPosition = positionAU;
  }

  this.group.position.set(
    adjustedPosition[0] * this.distancePerAU,
    adjustedPosition[1] * this.distancePerAU,
    adjustedPosition[2] * this.distancePerAU
  );

};

/**
 * Set the speed of the corp.
 */
entropy.corp.Corp.prototype.setSpeed = function(speed) {
    this.speed = speed;
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
