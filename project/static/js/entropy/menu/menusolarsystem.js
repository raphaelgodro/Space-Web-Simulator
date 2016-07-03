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
  console.log(goog.dom.getElement('planetmenu'));
  this.el_ = goog.dom.getElement('planetmenu');
  this.satelliteEl_ = goog.dom.getElement('satellitemenu');

  this.createMenu_();

  this.satelliteMenuEl_ = {};
  if (this.solarSystem_.selectedCorp)
    this.dirty_ = true;
  else
    this.dirty = false;

  this.handleMenuClick_(this.renderer_, this.renderer_.selectedCorp)
}


/*
 * Build DOM menu depending on the solarsystem
 * @param {entropy.corp.Corp} corp
 * @return {element}
 */
entropy.menu.MenuSolarSystem.prototype.createMenu_ = function() {
  goog.array.forEach(this.solarSystem_.corps, function(corp) {
    if (!corp.parentCorp) {
      var li = goog.dom.createDom('li');
      var a = goog.dom.createDom('a');
      var b = goog.dom.createDom('b');
      var span = goog.dom.createDom('span');
      var img = new entropy.media.Image(
          corp.context.texture_path,
          20);
      goog.events.listen(
        a,
        goog.events.EventType.CLICK,
        goog.partial(this.handleMenuClick_.bind(this), this.renderer_, corp));

      goog.dom.append(span, img.getElement());
      goog.dom.append(a, span);
      goog.dom.append(b, corp.context.name);
      goog.dom.append(a, b);
      goog.dom.append(li, a);
      goog.dom.append(this.el_, li);
    }

  }, this);

};


/*
 * Build DOM menu depending on the solarsystem
 * @param {entropy.corp.Corp} corp
 * @return {element}
 */
entropy.menu.MenuSolarSystem.prototype.updateSatelliteMenu_ =
    function(satellites) {
  var solarSystemMenuElHeight = $(this.el_).height();
  $(this.satelliteEl_).css('top', '6%').css(
      'top', '+='+solarSystemMenuElHeight+'px').css(
      'top', '+=20px');
  goog.array.forEach(satellites, function(corp) {
    var li = goog.dom.createDom('li');
    var a = goog.dom.createDom('a');
    var b = goog.dom.createDom('b');
    var span = goog.dom.createDom('span');
    goog.events.listen(
      a,
      goog.events.EventType.CLICK,
      goog.partial(this.handleMenuClick_.bind(this), this.renderer_, corp));
    goog.dom.append(a, span);
    goog.dom.append(b, corp.context.name);
    goog.dom.append(a, b);
    goog.dom.append(li, a);
    goog.dom.append(this.satelliteEl_, li);
  }, this);
};

/**
 * Fired when an entry in the menu is clicked.
 * @param {mgi.result.ListEvent} event event object
 * @private
 */
entropy.menu.MenuSolarSystem.prototype.handleMenuClick_ =
    function(renderer, corp) {
  this.satelliteEl_.innerHTML = '';
  renderer.setCameraFocus(corp);
  var currentLocation = window.location.href;
  var slashIndex = currentLocation.lastIndexOf("/");
  var urlPrefix = !this.dirty_ ? currentLocation :
      currentLocation.substring(0, slashIndex);
  window.history.pushState(
      '', corp.context.name,
      urlPrefix + '/' +  corp.context.name);

  // Build the satellite menu(if there is) or display it if cached
  if ((corp.childCorpses.length > 0)||(corp.parentCorp)) {
    $(this.satelliteEl_).css('display', 'inline');
    var childCorpses = corp.childCorpses.length > 0 ?
        corp.childCorpses : corp.parentCorp.childCorpses;
    this.updateSatelliteMenu_(childCorpses);
  } else {
    $(this.satelliteEl_).css('display', 'none');
  }
  

  this.dirty_ = true;
};
