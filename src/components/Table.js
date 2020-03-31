import React, { Component} from "react"
import ReactCSSTransitionGroup from 'react-transition-group';
import TableBody from './TableBody'


function TableHeader(){
    const tableheader=(
        <thead>
            <th scope='col'>Country</th>
            <th scope='col'>Total Cases</th>
            <th scope='col'>Total Deaths</th>
            <th scope='col'>Total Recovered</th>
            <th scope='col'>Active Cases</th>
            <th scope='col'>Serious,
                Critical</th>
            <th scope='col'>Total Cases/
                1M People</th>
        </thead>
    );
    return tableheader;
}


class Table extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div id='c1' className='container mt-4'>
                <div className='row'>
                <div className='col'>
                    <h3 class='text-muted text-center font-weight-light'>Confirmed Cases and Deaths by country.</h3>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                <div className='table-responsive'>
                    <table class="table table-striped table-bordered">
                        <TableHeader/>
                        <TableBody data= {this.props.data}/>
                    </table>
                </div>
            </div>
            </div> 
            </div>
        );
    }
}

export default Table;