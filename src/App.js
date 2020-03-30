import React, { Component, Fragment } from "react"
import AppNavbar from './components/AppNavbar'
import AppHeading from './components/AppHeading'
import Table from './components/Table'

import './App.css';
import axios from 'axios';
const url= 'https://corona.lmao.ninja/countries?sort=cases'

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {myList:[],myData:[],Data:{totalCases:0,totalDeaths:0,totalRecovered:0}};

    axios.get('https://corona.lmao.ninja/countries?sort=cases')
      .then( response => response.data)
      .then((data) => data.forEach(item => (
        this.setState({myList:[...this.state.myList,item.country],myData:[...this.state.myData,item]})
    )));
  }


  
  

  render(){
    return(
      <div>
        <AppNavbar/>
        <AppHeading/>
        <div className='container mt-4'>
        <Table data= {this.state.myData}/>
        </div>
      </div>
    );
  }
}

    
export default App