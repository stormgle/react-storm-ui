"use strict"

import log from './log'
import util from './util'

const animationList = [
  'animate-slide', 'animate-slide-left', 'animate-slide-right',
  'animate-push', 'animate-push-left', 'animation-push-right',
];

export function createAnimStyle(name = '', options = {}) {

  /* validation code here will be replace by validateAnimationName function later */
  if (name === undefined || name === null || name.length === 0) {
    log.error({
      root : 'Animation', 
      message : 'Missing animation name',
      detail : 'An animation name must be specified to use animation'
    });
  }
  if (!util.isString(name)) {
    log.error({
      root : 'Animation', 
      message : 'Invalid animation name',
      detail : 'Animation name must be String'
    });
  }

  let duration = options.duration || 2000;
  let timing = options.timing || 'ease';
  let delay = options.delay || 0;
  let iteration = options.iteration || 1;
  let direction = options.direction || 'forwards';

  if (!util.isNumber(duration) || duration < 0) {
    log.error({
      root : 'Animation', 
      message : 'Invalid animation duration value',
      detail : 'Animation diration value must not be a negative number'
    });
  }

  // format options
  duration = `${duration/1000}s`; // convert from number of milliseconds to seconds
  delay = util.isNumber(delay) && delay > 0 ? `${delay/1000}s` : '';
  iteration = (util.isNumber(iteration) && iteration > 0) || iteration === 'infinite' ? iteration : '';

  const animation = `${name} ${duration} ${timing} ${delay} ${iteration} ${direction}`
    .trim().replace(/ +/g,' ');

  return {
    pointerEvents : 'none',
    WebkitAnimation: animation,
    animation: animation,
  };
}

export function validateAnimationName(name) {
  if (name === undefined || name === null || name.length === 0) {
    log.error({
      root : 'Animation', 
      message : 'Missing animation name',
      detail : 'An animation name must be specified to use animation'
    });
    return false;
  }
  if (!util.isString(name)) {
    log.error({
      root : 'Animation', 
      message : 'Invalid animation name',
      detail : 'Animation name must be String'
    });
    return false;
  }
  /* special case where animation name is none, return false withdout error */
  if (name.toLowerCase() === 'none') {
    return false;
  }
  /* check with the valid name list */
  if (animationList.indexOf(name) === -1) {
    let detail = 'Animation name must be one of the following:\n[';
    animationList.forEach(n => detail = `${detail} ${n}`);
    detail = `${detail}]`
    log.error({
      root : 'Animation', 
      message : 'Invalid animation name',
      detail
    });
    return false;
  }
  

  return true;
}