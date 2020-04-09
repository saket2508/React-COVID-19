import React, { Component} from "react"
import FilteredTable from './FilteredTable'

class Table extends Component{
    constructor(props){
        super(props);
    }


    render(){
        const {tabledata}= this.props.data
        return(
            <div id='c4' className='container'>
                <FilteredTable data={this.props.data}/>
            </div>
        );
    }

}

export default Table;