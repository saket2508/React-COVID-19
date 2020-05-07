import React, { Component, Fragment} from "react"

function format(item){
    return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(item)
}

function TableHeader(props){
    const tableheader=(
        <Fragment>
            <thead className='thead-light'>
                <th scope='col'>State/UT</th>
                <th scope='col'>Confirmed</th>
                <th scope='col'>Deaths</th>
                <th scope='col'>Recovered</th>
                <th scope='col'>Active</th>
        </thead>
        <tr class="table-warning">
            <td style={{fontWeight:"700"}}>India (Total)</td>
            <td id="nowrap" style={{fontWeight:"700"}}>
                    {format(props.natnl.confirmed)}
                    <small><span class="badge badge-pill badge-secondary">{'+'+format(props.natnl.deltaconfirmed)}</span></small>
            </td>
            <td id="nowrap" style={{fontWeight:"700"}}>
                    {format(props.natnl.deaths)}
                    <small><span class="badge badge-pill badge-danger">{'+'+format(props.natnl.deltadeaths)}</span></small>
            </td>
            <td id="nowrap" style={{fontWeight:"700"}}>
                    {format(props.natnl.recovered)}
                    <small><span class="badge badge-pill badge-success">{'+'+format(props.natnl.deltarecovered)}</span></small>
            </td>
            <td id="nowrap" style={{fontWeight:"700"}}>{format(props.natnl.active)}</td>
        </tr>
        </Fragment>
    );
    return tableheader;
}

class FilteredTableIndia extends Component{
    constructor(props){
        super(props);
        this.state={
            filterStr:""
        }
    }
    checkStateValue = (item) =>{
        if(item.state.length > 21){
            return <td style={{fontWeight:"600"}}>{item.state}</td>
        }
        else{
            return <td id="nowrap">{item.state}</td>
        }
    }
    checkConfirmedValue= (item) =>{
        if(item.deltaconfirmed >0){
            return (
                <small><span class="badge badge-pill badge-secondary">{'+'+format(item.deltaconfirmed)}</span></small>
            );
        }
    }
    checkDeathsValue = (item) =>{
        if(item.deltadeaths >0){
            return <small><span class="badge badge-pill badge-danger">{'+'+format(item.deltadeaths)}</span></small>
        }
    }
    checkRecoveredValue = (item) => {
        if(item.deltarecovered >0){
            return <small><span class="badge badge-pill badge-success">{'+'+format(item.deltarecovered)}</span></small>
        }
    }
    render(){
        const elements= this.props.data;
        const filtertStr= this.state.filterStr;

        const filteredElements=(
            elements.filter(e => e.state.toLowerCase().includes(filtertStr.toLowerCase()))
        )
        var tableBody=(
            <tbody>
            {filteredElements.map((item) =>
            (
                <tr>
                    {this.checkStateValue(item)}
                    <td id="nowrap" style={{fontWeight:"600"}}>
                        {format(item.confirmed)}
                        {this.checkConfirmedValue(item)}
                    </td>
                    <td id="nowrap" style={{fontWeight:"600"}}>
                        {format(item.deaths)} 
                        {this.checkDeathsValue(item)}
                    </td> 
                    <td id="nowrap" style={{fontWeight:"600"}}>
                        {format(item.recovered)}
                        {this.checkRecoveredValue(item)} 
                    </td>
                    <td id="nowrap" style={{fontWeight:"600"}}>{format(item.active)}</td>
                </tr>
            ))}
        </tbody>
        )

        if(filteredElements.length===0){
            tableBody=(
                    <td colSpan='5' bgcolor="#ffcdd2">
                        <p className='small text-danger'>NO MATCHING RECORDS FOUND</p>
                    </td>
            )
        }

        return(
            <div className='FilteredTableIndia'>
            <div className='container-lg'>
                <div class="d-flex justify-content-start mb-3">
                    <div class='col-sm-9 col-lg-5 mt-2'>
                        <input type="text" 
                                class="form-control form-control-sm" 
                                value={filtertStr} 
                                placeholder="Search A State..."
                                onChange={ e => this.setState({ filterStr: e.target.value }) }/>
                    </div>
                    <div className='mt-2'>
                        <button className='btn btn-sm btn-light' onClick={this.props.sortValues}>
                            <i class="fas fa-sort"></i>
                        </button>
                    </div>
                </div>
            </div>
        
              <div className='table-responsive'>
                    <table id="india" class="table table-bordered table-sm ">
                        <TableHeader natnl={this.props.natnl}/>
                            {tableBody}
                    </table>
                </div>   
            </div>
        );
    }
}

export default FilteredTableIndia