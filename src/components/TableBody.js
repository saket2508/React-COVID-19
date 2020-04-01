import React, { Component} from "react";
import { components } from "react-select";

class TableBody extends Component{
    constructor(props){
        super(props);
    }

    render(){
        var i=0
        const tablebody= this.props.data.map(item => (
            <tr>
                <th scope='row'>{item.country} <span class="ml-1"><img src={item.countryInfo.flag} height='18' width='24'></img></span></th>
                <td>{item.cases}  <span class="badge badge-pill badge-warning">{'+'+item.todayCases}</span></td>
                <td>{item.deaths}  <span class="badge badge-pill badge-danger">{'+'+item.todayDeaths}</span></td> 
                <td>{item.recovered}</td>
                <td>{item.active}</td>
                <td>{item.critical}</td>
                <td>{item.casesPerOneMillion}</td>
            </tr>
          ));
        return(

            <tbody>
                {tablebody}
            </tbody>
        );
    }

}

export default TableBody