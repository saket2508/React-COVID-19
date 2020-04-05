import React, { Component} from "react"
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
        this.state={
            rowData: this.props.data
        };
    }
    render(){
        return(
            <div id='c2' className='container'>
                <h4 class='text-muted text-center font-weight-light'>Confirmed Cases And Deaths By Country.</h4>
                <div className='table-responsive'>
                    <table class="table table-striped table-bordered">
                        <TableHeader/>
                        <TableBody data= {this.props.data}/>
                    </table>
                </div>   
            </div>
        );
    }
}

export default Table;