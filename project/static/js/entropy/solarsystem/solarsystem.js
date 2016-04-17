goog.provide('entropy.solarsystem');


/**
 * Object of the solar system.
 * @classdesc
 * @constructor
 */
entropy.solarsystem.SolarSystem = function(context) {

    this.context = context.solar_system;
    /**
	* Array of every corp in the solar system.
	* @type {Array<entropy.corp.Corp>}
	*/
	this.corps = [];

    var corpsContext = context.solar_system.corps;

    goog.array.forEach(corpsContext, function(corpContext) {
      this.addCorp_(corpContext)
    }, this);
};

/**
 * Render THREEJS
 */
entropy.solarsystem.SolarSystem.prototype.addCorp_ =
    function(corpContext) {
  corp = new entropy.corp.Corp(corpContext);
  this.corps.push(corp);
};
