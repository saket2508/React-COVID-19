import React, { Component} from "react"

function TableHeader(){
    const tableheader=(
        <thead className='thead'>
            <th scope='col'>Country</th>
            <th scope='col'>Confirmed</th>
            <th scope='col'>Deaths</th>
            <th scope='col'>Recovered</th>
            <th scope='col'>Active</th>
            <th scope='col'>Critical</th>
            <th scope='col'>Cases/1M People</th>
        </thead>
    );
    return tableheader;
}

class FilteredTable extends Component{
    constructor(props){
        super(props);
        this.state={
            filterStr:""
        }
    }
    checkConfirmedValue= (item) =>{
        if(item.todayCases >0){
            return <small><span class="badge badge-pill badge-secondary">{'+'+item.todayCases}</span></small>
        }
    }
    checkDeathsValue = (item) =>{
        if(item.todayDeaths >0){
            return <small><span class="badge badge-pill badge-danger">{'+'+item.todayDeaths}</span></small>
        }
    }
    render(){
        const elements= this.props.data;
        const filtertStr= this.state.filterStr;

        const filteredElements=(
            elements.filter(e => e.country.toLowerCase().includes(filtertStr.toLowerCase()))
        )
        
        var tableBody=(
                <tbody>
                        {filteredElements.map((item) =>
                            (
                                <tr>
                                    <th scope='row'><span class="mr-1"><img src={item.countryInfo.flag} height='18' width='24' alt='flag-icon'></img></span> {item.country}</th>
                                    <td>{item.cases}  
                                        {this.checkConfirmedValue(item)}
                                    </td>
                                    <td>{item.deaths}
                                        {this.checkDeathsValue(item)}
                                    </td> 
                                    <td>{item.recovered}</td>
                                    <td>{item.active}</td>
                                    <td>{item.critical}</td>
                                    <td>{item.casesPerOneMillion}</td>
                                </tr>
                            ))}
                </tbody>
        )

        if(filteredElements.length===0){
            tableBody=(
                    <td colSpan='7' bgcolor='#ffcdd2'>
                        <p className='small text-danger'>NO MATCHING RECORDS FOUND</p>
                    </td>
            )
        }

        return(
            <div className='FilteredTable'>
            <h5 className='text-center text-muted' style={{fontWeight:'500'}}>CONFIRMED CASES AND DEATHS BY COUNTRY</h5>
            <div className='container-lg'>
                <div class="d-flex justify-content-center mt-2 mb-3">
                    <div class='col-9'>
                        <input type="text" 
                                class="form-control" 
                                value={filtertStr} 
                                placeholder="Search A Country..."
                                onChange={ e => this.setState({ filterStr: e.target.value }) }/>
                    </div>
                </div>
            </div>
              <div className='table-responsive'>
                    <table class="table table-sm">
                        <TableHeader/>
                        {tableBody}
                    </table>
                </div>   
            </div>
        );
    }
}

export default FilteredTable