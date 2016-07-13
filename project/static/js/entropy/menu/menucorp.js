goog.provide('entropy.menu.MenuCorp');

/**
 * Menu that can set properties of a corp dynamcally
 * (Object that has the movement physically calculed.)
 * @classdesc
 * @constructor
 */
entropy.menu.MenuCorp = function(physicMachine) {
  this.el_ = goog.dom.getElement('corp-menu');

  this.corpContext_ = null;
  this.physicMachine_ = physicMachine;
}


/*
 * Update the position of the corp
 * @param {entropy.corp.Corp} corp
 */
entropy.menu.MenuCorp.prototype.updateCorp =
function(corp) {
  this.corp_ = corp;
  goog.dom.removeChildren(this.el_);

  var contentEl = this.createMenu_();
  goog.dom.append(this.el_, contentEl);

  this.updateMenuTopTitle_();
};


/*
 * Build DOM menu of the corp
 * @param {entropy.corp.Corp} corp
 * @return {element}
 */
entropy.menu.MenuCorp.prototype.createMenu_ = function() {
  var context = this.corp_.context;
  var menu = goog.dom.createDom('div')

  if (goog.isDef(context.media)) {
    var planetSlider = new entropy.media.PlanetSlider(context.media);
    goog.dom.append(menu, planetSlider.slide);
  }
  var corpProperties = new entropy.menu.PropertiesMenu(corp);
  goog.dom.append(menu, corpProperties.getElement());

};


/*
 * Update the menu top title
 */
entropy.menu.MenuCorp.prototype.updateMenuTopTitle_ = function() {

  var titleSpan = goog.dom.getElement('corpTitle');
  goog.dom.removeChildren(titleSpan);
  var bgSpan = goog.dom.getElement('corpTitleBg');
  var color = this.corp_.atmosphereContext.color;
  var colorStr = "rgba(" + color[0] + ", " + color[1] +  ", "
      + color[2] + ", 1);"
  var bgColor = entropy.utils.rgb2Hex(colorStr);
  bgSpan.style.backgroundColor = bgColor;
  goog.dom.append(titleSpan, this.corp_.context.name);
};