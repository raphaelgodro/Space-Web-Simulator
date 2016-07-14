goog.provide('entropy.menu.MenuTop');

/**
 * Menu that can set properties of a corp dynamcally
 * (Object that has the movement physically calculed.)
 * @classdesc
 * @constructor
 */
entropy.menu.MenuTop = function(context) {

  this.createMenu_(context);
}


/*
 * Build DOM menu of the corp
 * @param {context}
 * @return {element}
 */
entropy.menu.MenuTop.prototype.createMenu_ = function(context) {
  var el = goog.dom.createDom('div', {
    'id': 'header-menu'
  });

  var title = goog.dom.createDom('span', {
    'id': 'title',
    'data-toggle': 'modal',
    'data-target': '#about-entropie'
  });
  goog.dom.append(title, 'Entropie');
  goog.dom.append(el, title);
  var corpTitleBg = goog.dom.createDom('div', {
    'id': 'corpTitleBg'
  });
  var corpTitle = goog.dom.createDom('span', {
    'id': 'corpTitle'
  });
  var solarsystemTitle = goog.dom.createDom('span', {
    'id': 'solarsystemTitle'
  });
  var collapseIcon = goog.dom.createDom('span', {
    'id': 'collapse-icon',
    'class': 'glyphicon glyphicon-collapse-up',
    'aria-hidden': 'true'
  });
  goog.dom.append(solarsystemTitle, context.solar_system.name);

  goog.dom.append(corpTitleBg, corpTitle);
  goog.dom.append(el, solarsystemTitle);
  goog.dom.append(el, collapseIcon);
  goog.dom.append(el, corpTitleBg);


  var body = goog.dom.getElementsByTagNameAndClass('body')[0];
  goog.dom.appendChild(body, el);

};