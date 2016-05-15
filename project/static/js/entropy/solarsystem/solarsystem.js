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

  //Attach parent corp when the corp is a satellite.
  goog.array.forEach(this.corps, function(corp) {
    if (corp.context.parent_corp_key != "None") {
     var parentCorpName = corp.context.parent_corp_key
     corp.parentCorp = this.getCorpByName(parentCorpName);
    }
  }, this);
};

/**
 * Add a corp into the solar system.
 */
entropy.solarsystem.SolarSystem.prototype.addCorp_ =
    function(corpContext) {
  corp = new entropy.corp.Corp(corpContext);
  this.corps.push(corp);
};


/**
 * Add a corp into the solar system.
 * @param {name} the corp name.
 * @return {entropy.corp.Corp}
 */
entropy.solarsystem.SolarSystem.prototype.getCorpByName =
    function(name) {
  var corpFind;
  goog.array.forEach(this.corps, function(corp) {
    if (corp.context.name == name)
      corpFind = corp;
  }, this);

  return corpFind;
};
