import React, { Component, Fragment} from "react"

function TableHeader(props){
    const tableheader=(
        <Fragment>
        <thead className='thead-light'>
            <th scope='col'>Location</th>
            <th scope='col'>Confirmed</th>
            <th scope='col'>Deaths</th>
            <th scope='col'>Recovered</th>
            <th scope='col'>Active</th>
            <th scope='col'>Critical</th>
            <th scope='col'>Cases/1M People</th>
        </thead>
        <tr className="table-warning">
            <td id='nowrap' style={{fontWeight:"500"}}> <i class="fas fa-globe mr-1"></i> Worldwide</td>
            <td id='nowrap' style={{fontWeight:"500"}}>
                    {props.data.Cases}
                    <small><span class="badge badge-pill badge-secondary">{'+'+props.data.TodayCases}</span></small>
            </td>
            <td id='nowrap' style={{fontWeight:"500"}}>
                    {props.data.Deaths}
                    <small><span class="badge badge-pill badge-danger">{'+'+props.data.TodayDeaths}</span></small>
            </td>
            <td id='nowrap' style={{fontWeight:"500"}}>
                    {props.data.Recovered}
            </td>
            <td style={{fontWeight:"500"}}>{props.data.Active}</td>
            <td style={{fontWeight:"500"}}>{props.data.Critical}</td>
            <td style={{fontWeight:"500"}}>{props.data.casespermillion}</td>
        </tr>
        </Fragment>
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
    checkCountryName = (item) =>{
        if(item.country==="Lao People's Democratic Republic"){
            item.country='Laos'
            return <td style={{fontWeight:"400"}} id='statename'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span> {item.country}</td>
        }
        if(item.country==="USA"){
            item.country= 'United States'
            return <td style={{fontWeight:"400"}} id='statename'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span> {item.country}</td>
        }
        if(item.country==="UK"){
            item.country='United Kingdom'
            return <td style={{fontWeight:"400"}} id='statename'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span> {item.country}</td>
        }
       if(item.country.length > 18){
           return <td style={{fontWeight:"400"}}><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span> {item.country}</td>
       }
        if(item.country==="MS Zaandam"){
            return <td style={{fontWeight:"400"}}>{item.country}</td>
        }
        if(item.country==="Diamond Princess"){
            return <td style={{fontWeight:"400"}}>{item.country}</td>
        }
        else{
            return <td style={{fontWeight:"400"}} id='statename'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span> {item.country}</td>
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
                                   {this.checkCountryName(item)}
                                    <td id='nowrap'> {item.cases} 
                                        {this.checkConfirmedValue(item)}
                                    </td>
                                    <td id='nowrap'>{item.deaths}
                                        {this.checkDeathsValue(item)}
                                    </td> 
                                    <td id='nowrap'>{item.recovered}</td>
                                    <td id='nowrap'>{item.active}</td>
                                    <td id='nowrap'>{item.critical}</td>
                                    <td id='nowrap'>{item.casesPerOneMillion}</td>
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
            <p className='h5 text-center text-muted' style={{fontWeight:'500'}}>CONFIRMED CASES AND DEATHS BY COUNTRY</p>
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
              <div className='table-responsive-sm'>
                    <table class="table table-sm">
                        <TableHeader data= {this.props.dataw}/>
                        {tableBody}
                    </table>
                </div>   
            </div>
        );
    }
}

export default FilteredTable