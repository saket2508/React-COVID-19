import React, { Component, Fragment } from "react"
import AppNavbar from './components/AppNavbar'
import AppHeading from './components/AppHeading'
import Table from './components/Table'
import Figures from './components/Figures'

import './App.css';
import axios from 'axios';
const url= 'https://corona.lmao.ninja/countries?sort=cases'

function Footer(){
  const footer= (
    <div className='container-fluid border-top mt-4'>
      <p className='small text-muted text-center'>DO YOUR BIT IN FLATTENING THE CURVE BY STAYING AT HOME.</p>
      </div>
  )
    return footer;
}

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {myList:[],myData:[],Data:{Cases:0,Deaths:0,Recovered:0}};
  }

  componentDidMount(){
    var cases=0
    var deaths=0
    var recovered=0

    axios.get('https://corona.lmao.ninja/countries?sort=cases')
      .then(response => response.data)
      .then((data) => data.forEach(item => {
        cases += Number(item.cases);
        deaths+= Number(item.deaths);
        recovered+= Number(item.recovered);
        this.setState({myList:[...this.state.myList,item.country],myData:[...this.state.myData,item],Data:{Cases:cases,Deaths:deaths,Recovered:recovered}})
      }));
  }
  

  render(){
    return(
      <div>
        <AppNavbar/>
        <AppHeading/>
        <Figures data={this.state.Data}/>
        <Table data= {this.state.myData}/>
      </div>
    );
  }
}

    
export default App