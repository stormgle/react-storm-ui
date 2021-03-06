"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import '../../css/third_parties/w3.css'
import '../../css/storm.css'
import '../../css/animation.css'

import SideWrapper from '../../dist/SideWrapper'
import SideBar from '../../dist/SideBar'
import SideContent from '../../dist/SideContent'
import Page from '../../dist/Page'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen : false };
  }

  render() {
    return (
      <SideWrapper>
        <SideBar
                isOpen = {this.state.isOpen}
                collapse = 'auto'
                width = '333'
                side = 'right'
                overlay = {false}
                onClickOutside = {this.closeSidebar.bind(this)}
                backgroundColor = 'w3-blue-grey'
                border = {true}
                card = 'card-4'
                animation = 'push'
                animationOptions = {{duration : 400} }
                onPreOpen = {() => console.log('sideBar pre-open')}
                onOpen = {() => console.log('sideBar opened')}
                onPreClose= {() => console.log('sideBar pre-close')}
                onClose= {() => console.log('sideBar closed')} >

            <a className="w3-bar-item w3-display-container"><h4>
                Menu                
                <button className="w3-button w3-blue-grey w3-display-topright" onClick={this.closeSidebar.bind(this)} > &times;</button>
            </h4></a>
            <a className="w3-bar-item w3-button" href="#">Link 1</a>
            <a className="w3-bar-item w3-button" href="#">Link 2</a>
            <a className="w3-bar-item w3-button" href="#">Link 3</a>
        </SideBar>

        <SideContent >
          <div className ="w3-container w3-teal w3-display-container">
            <button className="w3-button w3-teal w3-xxlarge w3-display-topright" onClick={this.toggleSidebar.bind(this)} >&#9776;</button>
            <h1>My Page</h1>
          </div>
        </SideContent>
      </SideWrapper>
    );
  }

  toggleSidebar(e) {
    e.stopPropagation();
    this.setState({ isOpen : !this.state.isOpen });
  }

  closeSidebar() {
    this.setState({ isOpen : false });
  }

}

render( <App />, document.getElementById('root'));