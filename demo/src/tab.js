"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import '../../css/third_parties/w3.css'
import '../../css/storm.css'
import '../../css/animation.css'

import Page from '../../dist/Page'
import Tab from  '../../dist/Tab'

const dict = {
  Hanoi: 'Vietnam',
  London: 'England',
  Tokyo: 'Japan'
};

function renderCity(city) {
  return {
    label : city,
    content: (
      <div className = 'w3-container'>
        <h3> {city} </h3>
        <div>
          {city} is the captital of {dict[city]}
        </div>
        <div style = {{marginTop: '30px'}} />
      </div>
    )
  };
} 

const tabs = Object.keys(dict).map(city => renderCity(city));

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Page>
        <h3> Tabs Demonstration </h3>
        <Tab data = {tabs}
             initialTabIndex = {1}
             barBorder = 'w3-border-bottom w3-border-grey'
             barColor = 'w3-light-grey'
             activeTabColor = 'w3-dark-grey'
             contentBorder = 'w3-border-bottom w3-border-grey'
             position = 'top'
             align = 'justify' />
      </Page>
    )
  }

}

render( <App />, document.getElementById('root'));