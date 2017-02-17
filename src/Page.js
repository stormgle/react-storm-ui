"use strict"

import React from 'react'

import BaseComponent from './BaseComponent'

/**
 * Page component
 * @extends BaseComponent 
 * */
export default class extends BaseComponent {
  /**
   * Render a Page component
   * It renders 6 layers, the order when active is as following
   *  1 - background layer
   *  2 - Contend layer
   *  3 - Header and Footer layer
   *  4 - Fixed layer
   *  5 - Overlay layer
   *  6 - Modal layer
   * When a layer is hide, it move back to background layer
   * @param {String} modifier - specify modifier style for Page 
   * @param {Function} renderHeader - render Header of Page
   * @param {Function} renderFooter - renderFooter of Page
   * @param {Function} renderFixed - render a fixed component on Page
   * @param {Function} renderModal - render a model cover entire of Page
   * @param {Function} onInit - function will be invoked after Page is mounted
   * @param {Function} onShow - function will be invoked after page has been shown ??
   * @param {Function} onHide - function will be invoked after page has been hide ??
   */
  constructor(props) {
    super(props);

    this.state = {
      hideHeader : false,
      hideFooter : false,
      showModal : false,
      showOverlay : false,
      contentPadTop : 0
    };

    this.page = {
      pushOverlay : this.pushOverlay.bind(this), 
      popOverlay : this.popOverlay.bind(this),
      showModal : this.showModal.bind(this), 
      hideModal : this.hideModal.bind(this) 
    };

    this.overlayStack = [];

    this.bind(
      '_renderOverlay', 'pushOverlay', 'popOverlay',
      'showModal', 'hideModal',
      '_getHeaderElement'
    );

  }

  componentWillMount() {
    if (this.props.onInit) {
      this.props.onInit(this.page);
    }
  }

  componentDidMount() {
    this.setState({ contentPadTop : this.headerElement.clientHeight + 10 });
  }

  parseModifier() {
    return ''; // implement later
  }

  pushOverlay(page) {    
    this.overlayStack.push(page);
    this.setState({ showOverlay : true });
  }

  popOverlay() {
    this.overlayStack.pop();
    if (this.overlayStack.length > 0) {
      this.setState({ showOverlay : true });
    } else {
      this.setState({ showOverlay : false });
    }
  }

  showModal() {
    this.setState({ showModal : true });
  }

  hideModal() {
    this.setState({ showModal : false });
  }

  _renderOverlay() {
    if (this.overlayStack.length > 0) {
      return (
        <div className = 'overlay_content' >
          {this.overlayStack.map( (page,id) => {

            // for DOM element, not add props
            if (typeof page.type === 'string') {              
              return (
                <div key = {id} className = 'overlay_background'>
                  {page}
                </div>
              );
            }

            const pageWithProps = React.cloneElement(page, {
              popOverlay : this.popOverlay,
              pushOverlay : this.pushOverlay
            });
            return (
              <div key = {id} className = 'overlay_background'>
                {pageWithProps}
              </div>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const style = 'w3';
    const header = this.props.renderHeader ? this.props.renderHeader(this.page) : null;
    const footer = this.props.renderFooter ? this.props.renderFooter(this.page) : null;
    const fixed  = this.props.renderFixed ? this.props.renderFixed(this.page) : null;
    const modal  = this.props.renderModal ? this.props.renderModal(this.page) : null;
    const pageStyle = this.props.style || {};
    const pageClass = this.props.className || ''; 
    return(
      <sg-page > 
        <div className = 'page' >
          <div className = 'page_background' />
          <div className = {`page_modal ${style}-container ${this.state.showModal ? '' : 'hide'}`} > 
            {modal} 
          </div>
          <div className = {`page_overlay ${style}-container ${this.state.showOverlay ? '' : 'hide'}`} >
            {this._renderOverlay()}
          </div>
          <div className = {`page_header ${style}-container ${this.state.hideHeader ? 'hide' : ''}`} 
               ref ={this._getHeaderElement} > 
            {header} 
          </div>
          <div className = {`page_content ${style}-container ${pageClass}`} style = {{paddingTop : `${this.state.contentPadTop}px`, ...pageStyle}} >
            {this.props.children}
          </div>
          <div className = {`page_footer ${style}-container ${this.state.hideFooter ? 'hide' : ''}`}> 
            {footer} 
          </div>
        </div>
      </sg-page>
    );
  }

  _getHeaderElement(el) {
    this.headerElement = el;
  }

}