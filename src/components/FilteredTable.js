import React, { Component} from "react"

function TableHeader(){
    const tableheader=(
        <thead className='thead'>
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

class FilteredTable extends Component{
    constructor(props){
        super(props);
        this.state={
            filterStr:""
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
                                    <th scope='row'><span class="mr-1"><img src={item.countryInfo.flag} height='18' width='24'></img></span> {item.country}</th>
                                    <td>{item.cases}  <span class="badge badge-pill badge-warning">{'+'+item.todayCases}</span></td>
                                    <td>{item.deaths}<span class="badge badge-pill badge-danger">{'+'+item.todayDeaths}</span></td> 
                                    <td>{item.recovered}</td>
                                    <td>{item.active}</td>
                                    <td>{item.critical}</td>
                                    <td>{item.casesPerOneMillion}</td>
                                </tr>
                            ))}
                </tbody>
        )

        if(filteredElements.length==0){
            tableBody=(
                    <td colSpan='7'>
                        <p className='small text-danger'>NO MATCHING RECORDS FOUND</p>
                    </td>
            )
        }

        return(
            <div className='FilteredTableIndia'>
            <h4 className='text-center font-weight-light'>CONFIRMED CASES AND DEATHS BY COUNTRY</h4>
            <div className='container-lg'>
                <div class="d-flex justify-content-center mt-2 mb-3">
                    <p className='small text-info mt-2'>SEARCH A COUNTRY</p>
                    <div class='col-6'>
                        <input type="text" 
                                class="form-control" 
                                value={filtertStr} 
                                placeholder="Country..."
                                onChange={ e => this.setState({ filterStr: e.target.value }) }/>
                    </div>
                </div>
            </div>
              <div className='table-responsive'>
                    <table class="table table-striped table-bordered">
                        <TableHeader/>
                        {tableBody}
                    </table>
                </div>   
            </div>
        );
    }
}

export default FilteredTable