goog.provide('entropy.interaction.Interaction');



/**
 * Object that is mapping every interactions in the app.
 * (Object that has the movement physically calculed.)
 * @classdesc
 * @constructor
 */
entropy.interaction.Interaction = function() {

};


entropy.interaction.Interaction.prototype.run = goog.abstractMethod;
