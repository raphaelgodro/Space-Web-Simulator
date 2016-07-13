goog.provide('entropy.solarsystem');

goog.require('entropy.corp.CorpType');

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

  this.stars = [];

  var corpsContext = this.context.corps;

  this.selectedCorp;

  goog.array.forEach(corpsContext, function(corpContext) {
    this.addCorp_(corpContext);
  }, this);

  //Attach parent corp when the corp is a satellite.
  goog.array.forEach(this.corps, function(corp) {
    if (corp.context.parent_corp_id) {
      var parentCorpId = corp.context.parent_corp_id;
      var parentCorp = this.getCorpById(parentCorpId);
      corp.parentCorp = parentCorp;
      parentCorp.childCorpses.push(corp);
      
    }
  }, this);

  if (this.context.selected_corp_name) {
    this.selectedCorp = this.getCorpByName(this.context.selected_corp_name);
  }

  //Attach the star instance to every corp.
  this.corps.forEach(function(corp) {
    corp.relatedStars = this.stars;
  }, this);
};

/**
 * Add a corp into the solar system.
 */
entropy.solarsystem.SolarSystem.prototype.addCorp_ =
    function(corpContext) {
  corp = new entropy.corp.Corp(corpContext);
  if (this.isStar_(corp)) {
    this.stars.push(corp);
  }
  this.corps.push(corp);
};


/**
 * Get a corp in the solar system from its name.
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


/**
 * Get a corp in the solar system from its id.
 * @param {name} the corp name.
 * @return {entropy.corp.Corp}
 */
entropy.solarsystem.SolarSystem.prototype.getCorpById =
    function(id) {
  var corpFind;
  goog.array.forEach(this.corps, function(corp) {
    if (corp.context.id == id)
      corpFind = corp;
  }, this);

  return corpFind;
};


/**
 * Get a corp in the solar system from its id.
 * @param {name} the corp name.
 * @return {entropy.corp.Corp}
 */
entropy.solarsystem.SolarSystem.prototype.isStar_ =
    function(corp) {
  var typeId = corp.context.corp_type_id;
  return entropy.corp.CorpType.STAR == typeId;
};
