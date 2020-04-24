import React, { Component, Fragment} from "react"

function TableHeader(props){
    const tableheader=(
        <Fragment>
            <thead className='thead'>
                <td scope='col'>State/UT</td>
                <td scope='col'>Confirmed</td>
                <td scope='col'>Deaths</td>
                <td scope='col'>Recovered</td>
                <td scope='col'>Active</td>
        </thead>
        <tr class="table-secondary">
            <td style={{fontWeight:"500"}}>India (Total)</td>
            <td style={{fontWeight:"500"}}>{props.natnl.confirmed}</td>
            <td style={{fontWeight:"500"}}>{props.natnl.deaths}</td>
            <td style={{fontWeight:"500"}}>{props.natnl.recovered}</td>
            <td style={{fontWeight:"500"}}>{props.natnl.active}</td>
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
        if(item.state.length > 18){
            return <td style={{fontWeight:"400"}}>{item.state}</td>
        }
        else{
            return <td id="nowrap">{item.state}</td>
        }
    }
    checkConfirmedValue= (item) =>{
        if(item.deltaconfirmed >0){
            return (
                <small><span class="badge badge-pill badge-secondary">{'+'+item.deltaconfirmed}</span></small>
            );
        }
    }
    checkDeathsValue = (item) =>{
        if(item.deltadeaths >0){
            return <small><span class="badge badge-pill badge-danger">{'+'+item.deltadeaths}</span></small>
        }
    }
    checkRecoveredValue = (item) => {
        if(item.deltarecovered >0){
            return <small><span class="badge badge-pill badge-success">{'+'+item.deltarecovered}</span></small>
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
                    <td id="nowrap" style={{fontWeight:"400"}}>
                        {item.confirmed}
                        {this.checkConfirmedValue(item)}
                    </td>
                    <td id="nowrap" style={{fontWeight:"400"}}>
                        {item.deaths} 
                        {this.checkDeathsValue(item)}
                    </td> 
                    <td id="nowrap" style={{fontWeight:"400"}}>
                        {item.recovered}
                        {this.checkRecoveredValue(item)} 
                    </td>
                    <td id="nowrap" style={{fontWeight:"400"}}>{item.active}</td>
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
            <p className='h5 text-center text-muted' style={{fontWeight:'500'}}>CONFIRMED CASES AND DEATHS BY STATE</p>
            <div className='container-lg'>
                <div class="d-flex justify-content-center mt-2 mb-3">
                    <div class='col-9'>
                        <input type="text" 
                                class="form-control" 
                                value={filtertStr} 
                                placeholder="Search A State..."
                                onChange={ e => this.setState({ filterStr: e.target.value }) }/>
                    </div>
                </div>
            </div>
        
              <div className='table-responsive'>
                    <table class="table table-sm ">
                        <TableHeader natnl={this.props.natnl}/>
                            {tableBody}
                    </table>
                </div>   
            </div>
        );
    }
}

export default FilteredTableIndia