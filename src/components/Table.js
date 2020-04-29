import React, { Component} from "react"
import FilteredTable from './FilteredTable'


class Table extends Component{
   constructor(props){
       super(props)

   }

    render(){
        return(
            <div id='c4' className='container-lg'>
                <FilteredTable changeContinent={this.props.changeContinent} data={this.props.data} dataw= {this.props.dataw} list={this.props.list}/>
            </div>
        );
    }

}

export default Table;