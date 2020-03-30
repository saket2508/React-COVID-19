import React, { Component} from "react"
import {Container} from "reactstrap"
import TableBody from './TableBody'


function TableHeader(){
    const tableheader=(
        <thead class='thead-dark'>
            <th scope='col'>Country,
                World</th>
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
            <div className='table-responsive'>
                <table class="table table-striped table-bordered mt-4 mb-4">
                    <TableHeader/>
                    <TableBody data= {this.props.data}/>
                </table>
            </div>
            
        );
    }
}

export default Table;