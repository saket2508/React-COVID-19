import React, { Component} from "react"
import FilteredTableIndia from './FilteredTableIndia'


class TableIndia extends Component{
    constructor(props){
        super(props);
        this.state={
            statesdata: this.props.data
        }
    }


    render(){
        return(
            <div id='c4' className='container'>
                <FilteredTableIndia data={this.props.data}/>
            </div>
        );
    }
}

export default TableIndia
