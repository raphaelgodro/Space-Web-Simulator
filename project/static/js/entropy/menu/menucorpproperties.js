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
  this.el_ = this.createMenu_();
  this.corp_ = null;
};


/**
 * Get the element of the media Image
 * @return {element}
 */
entropy.menu.PropertiesMenu.prototype.getElement =
    function() {
  console.log(this.el_);
  return this.el_;

};


entropy.menu.PropertiesMenu.prototype.updateProperties =
    function(corp) {
  this.corp_ = corp;
  var a = 10;
  var mass = numeral(corp.context.mass.toPrecision(a)).format('0.000');
  console.log($('#Mass'));
  $('#Mass').val(mass);

};

/**
 * Get the element of the media Image
 * @return {element}
 */
entropy.menu.PropertiesMenu.prototype.createMenu_ =
    function() {
  var el = goog.dom.createDom('div', {
    'class': 'corp-menu-properties'
  });

  var title = goog.dom.createDom('h3');
  goog.dom.append(title, 'Physical Properties');
  goog.dom.append(el, title);

  var form = goog.dom.createDom('form');
  var firstRow = this.createRow_([{
    'label': 'Mass',
    'type': 'number',
  }, {
    'label': 'Speed',
    'type': 'number'
  }])

  goog.dom.append(form, firstRow);
  goog.dom.append(el, form);

  /*var p = goog.dom.createElement('p');
  goog.dom.append(p, 'lol');
  goog.dom.append(el, p);*/

  return el;
};

entropy.menu.PropertiesMenu.prototype.createProperty_ =
    function(fieldSet, label , type) {
  var labelEl = goog.dom.createDom('label', {
    'for': 'massInput',
    'class': 'col-sm-2'
  });
  var container = goog.dom.createDom('div', {
    'class': 'col-sm-4 '
  });
  var inputEl = goog.dom.createDom('input', {
    'type': type,
    'class': 'form-control',
    'id': label
  });

  // register focus listener
  $(inputEl).click(function() {
     $(inputEl).focus();
  });


  goog.dom.append(fieldSet, labelEl);
  goog.dom.append(labelEl, label);
  goog.dom.append(container, inputEl);
  goog.dom.append(fieldSet, container);
   
};


entropy.menu.PropertiesMenu.prototype.createRow_ =
    function(properties) {
  var fieldSet = goog.dom.createDom('fieldSet', {
    'class': 'form-group-row'
  });
  for (var i = 0; i < properties.length; i++) {
    this.createProperty_(
      fieldSet,
      properties[i]['label'],
      properties[i]['type']
    );
  }
  return fieldSet;

};


