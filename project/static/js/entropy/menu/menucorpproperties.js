goog.provide('entropy.menu.PropertiesMenu');

goog.require('goog.events');
goog.require('goog.events.Event');




/**
 * Menu that can set properties of a corp dynamcally
 * (Object that has the movement physically calculed.)
 * @classdesc
 * @constructor
 */
entropy.menu.PropertiesMenu = function(physicMachine) {
  this.corp_ = null;
  this.physicMachine_ = physicMachine;
  this.el_ = this.createMenu_();
  
};


/**
 * Get the element of the media Image
 * @return {element}
 */
entropy.menu.PropertiesMenu.prototype.getElement =
    function() {
  return this.el_;

};


entropy.menu.PropertiesMenu.prototype.updateProperties =
    function(corp) {

  //Unlisten previous listeners
  $('#Mass').unbind("change", this.handleMassChange_);
  $('#Secondinsimulatorpersecond').unbind("change", this.handleDeltaTChange_);

  this.corp_ = corp;
  var a = 14;
  var mass = numeral(corp.context.mass.toPrecision(a)).format('0.000');
  $('#Mass').val(mass);
  var initialDeltaT = this.physicMachine_.getDeltaT()*60;
  $('#Secondinsimulatorpersecond').val(initialDeltaT);

  //Create listeners
  $('#Mass').change(this.handleMassChange_.bind(this));
  $('#Secondinsimulatorpersecond').change(
      this.handleDeltaTChange_.bind(this));

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
  var title1 = goog.dom.createDom('h3');
  goog.dom.append(title1, 'Space-Time Properties');

  var form = goog.dom.createDom('form');
  var firstRow = this.createRow_([{
    'label': 'Second in simulator per second',
    'type': 'number',
    'class': ['col-sm-7', 'col-sm-5']
  }]);
  goog.dom.append(el, title1);


  var title2 = goog.dom.createDom('h3');
  goog.dom.append(title2, 'Corp Properties');
  goog.dom.append(form, firstRow);
  goog.dom.append(el, form);

  goog.dom.append(el, title2);

  form = goog.dom.createDom('form');
  var firstRow = this.createRow_([{
    'label': 'Mass',
    'type': 'number',
    'class': ['col-sm-2', 'col-sm-4']
  }, {
    'label': 'Speed',
    'type': 'number',
    'class': ['col-sm-2', 'col-sm-4']
  }])

  goog.dom.append(form, firstRow);
  goog.dom.append(el, form);

  /*var p = goog.dom.createElement('p');
  goog.dom.append(p, 'lol');
  goog.dom.append(el, p);*/

  return el;
};

entropy.menu.PropertiesMenu.prototype.createProperty_ =
    function(fieldSet, label , type, colClass) {
  var labelEl = goog.dom.createDom('label', {
    'for': 'massInput',
    'class': colClass[0]
  });
  var container = goog.dom.createDom('div', {
    'class': colClass[1]
  });
  var inputEl = goog.dom.createDom('input', {
    'type': type,
    'class': 'form-control',
    'id': label.replace(/\s/g, '')
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
      properties[i]['type'],
      properties[i]['class']
    );
  }
  return fieldSet;

};

entropy.menu.PropertiesMenu.prototype.handleMassChange_ =
    function(event) {
  this.corp_.context.mass = parseFloat(event.currentTarget.value);
};


entropy.menu.PropertiesMenu.prototype.handleDeltaTChange_ =
    function(event) {
  console.log(this.physicMachine_);
  this.physicMachine_.setDeltaT(parseFloat(
      event.currentTarget.value) / 60);
};

