goog.provide('entropy.menu.MenuSolarSystem');

/**
 * Menu of the current solar system
 * (Object that has the movement physically calculed.)
 * @classdesc
 * @constructor
 */
entropy.menu.MenuSolarSystem = function(renderer) {
  this.el_ = goog.dom.getElement('corp-menu');

  this.renderer_ = renderer;

  this.solarSystem_ = renderer.solarSystem;

  this.el_ = goog.dom.getElement('solarsystemmenu');

  this.createMenu_();
}


/*
 * Update selected corp into the menu.
 * @param {entropy.corp.Corp} corp
 * @param {entropy.physic.PhysicMachine} physicMachine
 */
entropy.menu.MenuSolarSystem.prototype.updateCorp =
function(corp) {

};


/*
 * Build DOM menu depending on the solarsystem
 * @param {entropy.corp.Corp} corp
 * @return {element}
 */
entropy.menu.MenuSolarSystem.prototype.createMenu_ = function() {
  console.log(this.solarSystem_.corps);
  goog.array.forEach(this.solarSystem_.corps, function(corp) {
    var li = goog.dom.createDom('li');
    var a = goog.dom.createDom('a', {
      'href': '#'
    });
    var b = goog.dom.createDom('b');
    var span = goog.dom.createDom('span');
    var img = new entropy.media.Image(
        corp.context.texture_path,
        20);
    goog.events.listen(
      a,
      goog.events.EventType.CLICK,
      goog.partial(this.handleMenuClick_, this.renderer_, corp));

    goog.dom.append(span, img.getElement());
    goog.dom.append(a, span);
    goog.dom.append(b, corp.context.name);
    goog.dom.append(a, b);
    goog.dom.append(li, a);
    goog.dom.append(this.el_, li);

  }, this);

};


/**
 * Fired when an entry in the menu is clicked.
 * @param {mgi.result.ListEvent} event event object
 * @private
 */
entropy.menu.MenuSolarSystem.prototype.handleMenuClick_ =
    function(renderer, corp) {
  renderer.setCameraFocus(corp);
};