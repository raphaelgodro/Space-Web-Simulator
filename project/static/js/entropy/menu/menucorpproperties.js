goog.provide('entropy.menu.PropertiesMenu');

goog.require('goog.events');
goog.require('goog.events.Event');




/**
 * Menu that can set properties of a corp dynamcally
 * (Object that has the movement physically calculed.)
 * @classdesc
 * @constructor
 */
entropy.menu.PropertiesMenu = function(corp) {
  this.corp_ = corp;
  this.el_ = this.createMenu_();
};


/**
 * Get the element of the media Image
 * @return {element}
 */
entropy.menu.PropertiesMenu.prototype.getElement =
    function() {
  console.log('getting element');
  return this.el_;

};


/**
 * Get the element of the media Image
 * @return {element}
 */
entropy.menu.PropertiesMenu.prototype.createMenu_ =
    function() {
  var corp = this.corp_;
  var el = goog.dom.createDom('div', {
    'class': 'corp-menu-properties'
  });

  var title = goog.dom.createDom('h3')
  goog.dom.append(title, 'title');
  goog.dom.append(el, title);
  var p = goog.dom.createElement('p');
  goog.dom.append(p, 'lol');
  goog.dom.append(el, p);

  return el;
};

