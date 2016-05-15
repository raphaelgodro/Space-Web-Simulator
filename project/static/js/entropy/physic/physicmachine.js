goog.provide('entropy.physic.PhysicMachine');

/**
 * Physic Machine client side. Proceed onto server side
 * request when the client is too busy ? (time logs too slow...)
 * @param {Array<entropy.corp.Corp>} corps
 * @classdesc
 * @constructor
 */
entropy.physic.PhysicMachine = function(corps, renderer) {
  /*
   * If the physic machine is asynchronous with the renderer
   * Better true, less calculation for the client.
   */
  this.async = false;

  this.corps_ = corps;
  this.renderer_ = renderer;

  /** Factor of ratio mass vs distance that determines if a corpse
   has an interest in the calculus or not.*/
  this.minDistanceMassRatio = 0.01;

  /** Factor of incertitude in AU in which
   we determine if a cycle is done or not*/
  this.cycleIncertitude_ = 0.00000001;

  /** DeltaT Factor in orbit calculation*/
  this.deltaT_ = 3600;

  /** Minimum physic machine turn before the cycle completion checkup
   can be performed */
  this.minTurnNumber_ = 20;

  //Calculate orbit of undefined orbits list.
  var toCalculateList = []
  goog.array.forEach(this.corps_, function(corp) {
    if (corp.orbitCoordinate.length == 0) {
      toCalculateList.push(corp);
    }
  }, this);
  console.log('getting through ?');
  // Start the synchronous mode with orbit cycles. if not async.
  if (this.async) {
    console.log('building cycles..');
    this.buildCycles(toCalculateList);
  } else {
    goog.array.forEach(this.corps_, function(corp) {
      corp.start();
    }, this);
  }
  
}


/*
 * Complete one coordinate cycle for a certain set of corps.
 * Every trajectory has its units in AU.
 * @param {entropy.corp.Corp} corp
 */
entropy.physic.PhysicMachine.prototype.buildCycles = function(corps) {
  var corpLists = this.corps_;
  var toCalculateCorps;
  if (!goog.isDef(corps)){
    toCalculateCorps = this.corps_;
  } else {
    toCalculateCorps = corps;
  }
  //For each corp that needs its coordinate cycle to be calculated.
  goog.array.forEach(toCalculateCorps, function(calculatedCorp){
    calculatedCorp.orbitCoordinate = [];
    var isCycleCompleted = false;
    while (!isCycleCompleted) {
      this.calculatePhysic_(calculatedCorp, corpLists);
      if ((this.checkCycle_(calculatedCorp))
          && (calculatedCorp.orbitCoordinate.length > this.minTurnNumber_)) {
        isCycleCompleted = true;
        console.log('corp calculated', calculatedCorp);
      }
    }
    //this.normalizeCycle_(calculatedCorp);
    calculatedCorp.start();
  }, this);
  /* If the cycles are going nowhere, we should set synchronous mode. */

  
};


/*
 * Update the position of a corp with physical calculus.
 * Synchronous mode method...
 * @param {entropy.corp.Corp} corp
 */
entropy.physic.PhysicMachine.prototype.updateCorpPosition =
    function(calculatedCorp){

  if (calculatedCorp.stop) {
    calculatedCorp.stop = false;
  }
  // If was in asynchronous , now the system is synchronous.
  if (this.async) {
    this.async = false;
  }

  this.calculatePhysic_(calculatedCorp, this.corps_);
};

/*
 * Make the calculus and update coordinate into the list
 * @param {entropy.corp.Corp} corp
 */
entropy.physic.PhysicMachine.prototype.calculatePhysic_ =
    function(calculatedCorp, influenceCorpses) {

  var calculatedCorpContext = calculatedCorp.context;
  var lastCalculatedCorpCoordinate =
      this.getLastCoordinate_(calculatedCorp);
  var sumFx = 0;
  var sumFy = 0;
  var sumFz = 0;
  var au = (1.496 * Math.pow(10,11));

  goog.array.forEach(influenceCorpses, function(influentCorp) {
    if (calculatedCorp != influentCorp) {
        var influentCorpContext = influentCorp.context;
        var lastInfluentCorpCoordinate =
            this.getLastCoordinate_(influentCorp);
        var deltaX = (lastInfluentCorpCoordinate[0] - lastCalculatedCorpCoordinate[0]) * au;
        var deltaY = (lastInfluentCorpCoordinate[1] - lastCalculatedCorpCoordinate[1]) * au;
        var deltaZ = (lastInfluentCorpCoordinate[2] - lastCalculatedCorpCoordinate[2]) * au;
        var relativeDistance =
            Math.sqrt(Math.pow(deltaX,2) +
            Math.pow(deltaZ,2) +
            Math.pow(deltaY,2));

        var alpha = Math.acos(deltaX/relativeDistance);
        var beta = Math.acos(deltaY/relativeDistance);
        var gamma = Math.acos(deltaZ/relativeDistance);

        var m1 = calculatedCorpContext.mass;
        var m2 = influentCorpContext.mass;
        var G = 6.67*Math.pow(10,-11);
        var fg = (G*m1*m2)/Math.pow(relativeDistance,2);

        sumFx += Math.cos(alpha) * fg;
        sumFy += Math.cos(beta) * fg;
        sumFz += Math.cos(gamma) * fg;

    }
  }, this);
  this.applyAxisForcesToCorp_(
    calculatedCorp,
    [sumFx, sumFy, sumFz],
    lastCalculatedCorpCoordinate
  );
}


/*
 * Apply axis forces to corp
 * @param {entropy.corp.Corp} corp
 * @return {boolean}
 */
entropy.physic.PhysicMachine.prototype.applyAxisForcesToCorp_ =
    function(corp, forces, lastCoord) {
  var mass = corp.context.mass;
  var au = (1.496 * Math.pow(10,11));
  var positions = [];
  var speeds = [];

  for (index = 0; index < forces.length; ++index) {
    var acc = forces[index]/mass;
    var posInit = lastCoord[index] * au;
    var posAU = posInit + (lastCoord[index + 3] * this.deltaT_)
        + (0.5*acc*(Math.pow(this.deltaT_, 2)));
    var speed = lastCoord[index + 3] + acc*this.deltaT_;
    var pos = posAU / au;
    speeds.push(speed);
    positions.push(pos);
  }

  if (this.async) {
    corp.appendCoordinate(positions.concat(speeds));
  } else {
    corp.setPosition(positions);
    corp.setSpeed(speeds);
  }
}


/*
 * Check if an orbit cycle is completed.
 * @param {entropy.corp.Corp} corp
 * @return {boolean}
 */
entropy.physic.PhysicMachine.prototype.checkCycle_ =
    function(calculatedCorp) {
  // check if the cycle is done in asynchronous mode.
  var firstVal = calculatedCorp.orbitCoordinate[0];
  var lastVal = calculatedCorp.orbitCoordinate[
    calculatedCorp.orbitCoordinate.length - 1];
  var cycleDone = true;
  for (index = 0; index < 3; ++index) {
    if ((firstVal[index] - lastVal[index]) > this.cycleIncertitude_)
        cycleDone = false;
  }
  return cycleDone;    

}


/*
 * Normalize the orbit cycle of one corp.
 * By normalizing, we mean get a smoother transition between the
 * last coordinate and the first one.
 * @param {entropy.corp.Corp} corp
 * @return {boolean}
 */
entropy.physic.PhysicMachine.prototype.normalizeCycle_ =
    function(corp) {
  var valuesRange = 6;
  var orbitCoordinate = corp.orbitCoordinate;
  var firstCoord = orbitCoordinate[orbitCoordinate.length - 1 - valuesRange / 2];
  var lastCoord = orbitCoordinate[valuesRange / 2];
  steps = [];
  for (index = 0; index < 3; ++index) {
    steps[index] = (firstCoord[index] - lastCoord[index])/valuesRange;
  }
  for (i = 0; i< valuesRange;
      ++i) {
    var index;
    if (i < valuesRange/2)
      index = orbitCoordinate.length - 1 - valuesRange / 2 + i;
    else
      index = i - valuesRange/2;
    for (j = 0; j < 3; ++j) {
      orbitCoordinate[index][j] = firstCoord[j] + steps[j] * i;
    }
  }
}


/*
 * Get the last position and speed of a corp
 * @param {entropy.corp.Corp} corp
 * @return {boolean}
 */
entropy.physic.PhysicMachine.prototype.getLastCoordinate_ =
    function(corp) {
  var coordinate;
  if (corp.orbitCoordinate.length == 0) {
    if (this.async) {
      coordinate = corp.context.initial_position;
      coordinate = coordinate.concat(corp.context.initial_speed);
    } else {
      coordinate = corp.getCoordinate();
    }
  } else {
    coordinate = corp.orbitCoordinate[corp.orbitCoordinate.length - 1];
  }
  return coordinate;
}
