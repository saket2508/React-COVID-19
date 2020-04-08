import React, { Component} from "react"
import FilteredTableIndia from './FilteredTableIndia'


class TableIndia extends Component{
    constructor(props){
        super(props);
        this.state ={Data:this.props.Data}
    }


    render(){
        return(
            <div id='c4' className='container'>
                <FilteredTableIndia data={this.props.Data}/>
            </div>
        );
    }
}

export default TableIndia
