"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import '../../css/w3.css'
import '../../css/storm.css'
import '../../css/animation.css'

import Splitter from '../../dist/Splitter'
import SplitterSide from '../../dist/SplitterSide'
import SplitterContent from '../../dist/SplitterContent'
import Page from '../../dist/Page'

class Demo extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = { isOpenMenu : false };
		
	}
	
	render() {		
		return (

				<Splitter>
					<SplitterSide 

						side = 'right'
						isOpen = {this.state.isOpenMenu}
						shouldLockContent = {true}
						animation	= 'slide'
						>
						<h3> HEADING 3 </h3>
						<br />
						<button onClick = {this.closeMenu.bind(this)} > close </button>
					</SplitterSide>
					<SplitterContent>
						<Page>
							<div> Content </div>
							<button onClick = {this.toggleMenu.bind(this)} style = {{right : 0, position: 'absolute'}} > Menu </button>
						</Page>
					</SplitterContent>
				</Splitter>

		);
	}
	
	toggleMenu() {
		this.setState({ isOpenMenu : !this.state.isOpenMenu });
	}
	
	closeMenu() {
		this.setState({ isOpenMenu : false });
	}
}

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Demo />
    );    
  }
}

render( <App />, document.getElementById('root'));
