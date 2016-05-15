goog.require('entropy.corp.Corp');
goog.require('entropy.corp.Planet');
goog.require('entropy.physic.PhysicMachine');
goog.require('entropy.solarsystem.SolarSystem');
goog.require('entropy.interaction.CameraMoveInteraction');
goog.require('entropy.stars.Stars');
goog.require('goog.dom');
goog.provide('entropy.renderer');


/**
 * General renderer in THREEJS of the program.
 * @classdesc
 * @constructor
 */
entropy.renderer.Renderer = function(solarSystem) {
	var rendererDom = goog.dom.getElement('renderer');

	/**
	* @type {number}
	* @private
	*/
	this.width_ = window.innerWidth;

	/**
	* @type {number}
	* @private
	*/
	this.height_ = window.innerHeight;

	/**
	* General scene of the renderer
	* @type {number}
	* @private
	*/
	this.scene_ = new THREE.Scene();

	/**
	* ThreeJS webgl renderer
	* @type {number}
	* @private
	*/
	this.renderer_ = new THREE.WebGLRenderer({ alpha: true });

	/**
	* ThreeJS webgl Camera
	* @type {THREE.PerspectiveCamera}
	* @private
	*/
	this.camera_ = new THREE.PerspectiveCamera(
      60, this.width_ / this.height_, 3, 30000);

    /**
    * Aiming object for the camera set by controllers
    * @type {THREE.Group}
    * @private
    */
    this.aimingCameraObject_ = new THREE.Group();


	/**
	 * Object of the current solar system that is getting viewed
	 * @type {}
	 */
	this.solarSystem = solarSystem;

    this.physicsMachine_ =
      new entropy.physic.PhysicMachine(solarSystem.corps);

    var options = context;
    /**
    * Entropy menu of the selected Corp
    * @type {THREE.PerspectiveCamera}
    * @private
    */
    this.corpMenu_ = new entropy.menu.MenuCorp(this.physicsMachine_);


	/**
	 * Main background texture of the renderer scene.
	 * @type {THREE.Mesh|undefined}
	 * @private
	 */
	this.backgroundTexture;

	/**
	 * Object of the current solar system that is getting viewed
	 * @type {entropy.corp.Corp?}
	 * @private
	 */
	this.selectedCorp = null;


	this.renderer_.setClearColor(0x000000, 1);
	this.renderer_.setSize(this.width_, this.height_);

	controls = new THREE.OrbitControls(this.camera_, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;
	controls.enableZoom = true;

    this.controls = controls;

	this.stars = new entropy.stars.Stars();

	this.scene_.add(this.stars.stars);
    this.scene_.add(this.aimingCameraObject_);
    //this.scene_.add(this.stars.starsMoving);
    //this.scene_.add(this.stars.starsColor);

	this.loadCorps(this.solarSystem.corps);

	this.setCameraFocus(this.solarSystem.corps[1]);

	rendererDom.appendChild(this.renderer_.domElement);
	controls.update();
	this.render();


    window.addEventListener( 'resize', onWindowResize, false );

    function onWindowResize(){
        alert('resize !!!');
        this.camera_.aspect = window.innerWidth / window.innerHeight;
        this.camera_.updateProjectionMatrix();

        this.renderer_.setSize( window.innerWidth, window.innerHeight );

    }
};

/**
 * Render THREEJS
 */
entropy.renderer.Renderer.prototype.render = function() {
	var renderer = this.renderer_;
	var camera = this.camera_;
	var scene = this.scene_;
	var solarSystem = this.solarSystem;
	var stars = this.stars;
	var render = goog.bind(function() {
		requestAnimationFrame(render);
		goog.array.forEach(solarSystem.corps, function(corp) {
			var selectedCorpPosition = goog.isDefAndNotNull(
                this.selectedCorp) ?
			    this.selectedCorp.getRenderingPosition() :
			    new THREE.Vector3(0,0,0);

            if (!corp.stop) {
              corp.updatePosition(this.physicsMachine_);
            }

			corp.updateRotation(camera.position,selectedCorpPosition,
			    corp == this.selectedCorp);

            stars.updatePosition(this.selectedCorp);
		}, this);
		renderer.render(scene, camera);
	}, this);
	render();
};


/**
 * Add an array of corps into the scene.
 * @param {Array<entropy.corp.Corp>}
 */
entropy.renderer.Renderer.prototype.loadCorps =
     function(corp) {
	for (index = 0; index < corp.length; ++index) {
      this.loadCorp(corp[index]);
	}
};



/**
 * Add a THREE.Group to a scene from a Corp.
 * @param {entropy.corp.Corp} corp
 */
entropy.renderer.Renderer.prototype.loadCorp =
     function(corp) {
	this.scene_.add(corp.group);
};


/**
 * Add a THREE.Group to a scene from a Corp.
 * @param {entropy.corp.Corp|null} corp
 */
entropy.renderer.Renderer.prototype.setCameraFocus =
     function(corp) {
    if (goog.isNull(corp)){
      this.camera_.lookAt(new THREE.Vector3(0, 0, 0));
    } else {
      this.selectedCorp = corp;
      this.corpMenu_.updateCorp(corp);
      this.selectedCorp.group.add(this.camera_);
    }


    //Move background stars around the camera...

};


/**
 * Move the camera accordingly to the vector sent
 * @param {entropy.corp.Corp} corp
 */
entropy.renderer.Renderer.prototype.moveCamera =
     function(movingVector) {
  var camera = this.camera_;
  var x = camera.position.x;
  var y = camera.position.y;
  var z = camera.position.z;
  console.log('aiming position', this.aimingCameraObject_.position);

  if (goog.isDefAndNotNull(this.selectedCorp)) {
    this.aimingCameraObject_.add(this.camera_);
  }

  //Check if an object is currently selected
  if (goog.isDefAndNotNull(this.selectedCorp)) {
    var position = this.selectedCorp.getPosition();
    console.log(this.selectedCorp.group);
    x = position.x;
    y = position.y;
    z = position.z;
    console.log('position', position);
    this.selectedCorp = null;
  }

  x += movingVector.x;
  y += movingVector.y;
  z += movingVector.z;
  var position = this.aimingCameraObject_.position;
  position.x = x;
  position.y = y;
  position.z = z;
  console.log('camera', this.camera_);
  camera.updateProjectionMatrix();
};
