"use strict"

import React from 'react'

import util from './lib/util'
import log from './lib/log'

import BaseComponent from './BaseComponent'

const DEFAULT_SIDE_WIDTH = '250px';

/**
 * SideWrapper Component
 * @extends BaseComponent 
 * */
class SideWrapper extends BaseComponent {

  constructor(props) {
    super(props);

    this.childrenProps = {};

    this.bind('_getChildProps', '_genChildren', 
              '_isCollapseAuto', '_isCollapseTrue'
    );

  }

  render() {
    const children = this._getChildProps()._genChildren();
    return (
      <sg-side-wrapper>
        <div className = 'side-wrapper' >
          {children}
          <div className = 'side-overlay w3-overlay' />
        </div>         
      </sg-side-wrapper>
    );

  }

  _getChildProps() {
    React.Children.forEach(this.props.children, child => {
      if (child.type && child.type.sgType === 'side-bar') {        
        this.childrenProps.sideBar = {
          width: this.formatWidth(child.props.width),
          collapse: child.props.collapse,
          side: child.props.side,
          overlay: child.props.overlay,
          isOpen: child.props.isOpen || false,
        };
      }
      if (child.type && child.type.sgType === 'side-content') {
        this.childrenProps.sideContent = {};
      }
    });    
    return this;
  }

  _genChildren() {
    const children = React.Children.map(this.props.children, child => {
      if (child.type && child.type.sgType === 'side-bar') {
        /* process style */
        const style = {...child.props.style};
        // style width
        if (this.childrenProps.sideBar.width) {
          style.width = this.childrenProps.sideBar.width;
        }
        // sidebar position
        if (this.childrenProps.sideBar.side === 'right') {
          style.right = 0;
        }        
        // sidebar show or hide
        if (this._isCollapseTrue() || this.childrenProps.sideBar.isOpen) {
          style.display = 'block';
        } else {
          style.display = 'none';
        }
        /* process class */
        const _baseClass = 'w3-sidebar w3-bar-block';
        let w3class = _baseClass;
        if (this._isCollapseAuto()) {
          w3class = `${_baseClass} w3-collapse`
        }
        return React.cloneElement(child, {style, w3class});
      }

      if (child.type && child.type.sgType === 'side-content') {
        /* process style */
        const style = {...child.props.style};
        /* when collapse is auto, w3css will auto adjust margin of w3-main */
        if (this._isCollapseTrue() || this._isCollapseAuto()) {
          if (this.childrenProps.sideBar.side === 'right') {
            style.marginRight = this.childrenProps.sideBar.width;
          } else {
            style.marginLeft = this.childrenProps.sideBar.width;
          }        
        }
        /* process class */
        const w3class = this._isCollapseAuto() ? 'w3-main' : '';

        return React.cloneElement(child, {style, w3class});
      }      
    });

    return children;
  }

  formatWidth(width) {
    if (!width) {
      return DEFAULT_SIDE_WIDTH;
    }

    if (util.isNumber(width)) {
      return `${width}px`;
    }

    if (util.isString(width)) {
      width = width.trim().replace(" ", "");
      if (/(^\d+px$)|(^\d+%$)/i.test(width)) {
        return width
      } else if(util.isNumber(parseInt(width))) {
        return `${parseInt(width)}px`;
      } else {
        log.warn({
          root : 'SideBar', 
          message : 'Invalid value of width',
          detail : `Width should be a number or a string ended with px or %. Use default ${DEFAULT_SIDE_WIDTH}`
        });
        return DEFAULT_SIDE_WIDTH;
      }
    }    
  }

  _isCollapseAuto() {
    const collapse = this.childrenProps.sideBar.collapse;
    return util.isString(collapse) && collapse.toLowerCase() === 'auto';
  }

  _isCollapseTrue() {
    const collapse = this.childrenProps.sideBar.collapse;
    return collapse === true;
  }

}

SideWrapper.sgType = 'side-wrapper';
export default SideWrapper;