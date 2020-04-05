import React, { Component} from "react"

class TableBodyIndia extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const tablebody= this.props.Data.map(item => (
            <tr>
                <th scope='row'>{item.state}</th>
                <td>{item.confirmed}</td>
                <td>{item.deaths}</td> 
                <td>{item.recovered}</td>
                <td>{item.active}</td>
            </tr>
          ));
        return(

            <tbody>
                {tablebody}
            </tbody>
        );
    }  
}

export default TableBodyIndia