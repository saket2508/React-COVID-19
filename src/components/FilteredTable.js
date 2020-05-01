import React, { Component, Fragment} from "react"

function TableHeader(props){
    const tableheader=(
        <Fragment>
        <thead className='thead-light'>
            <th scope='col'>        
                Location
            </th>
            <th scope='col'>Confirmed</th>
            <th scope='col'>Deaths</th>
            <th scope='col'>Recovered</th>
            <th scope='col'>Active</th>
            <th style={{wordWrap:'break-word'}} scope='col'>Cases/1M People</th>
            <th style={{wordWrap:'break-word'}} scope='col'>Deaths/1M People</th>
            <th style={{wordWrap:'break-word'}} scope='col'>Tests/1M People</th>
            <th style={{wordWrap:'break-word'}} scope='col'>Total Tests</th>
        </thead>

        <tr className="table-warning">
            <td id='nowrap' style={{fontWeight:"700"}}> 
                    <div class="btn-group">
                        <button class="btn btn-custom btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              {props.data.Name}
                        </button>
                        <div class="dropdown-menu">
                            {props.list.map((element) => (
                                <a key={element.id} class="dropdown-item" onClick={props.changeContinent.bind(this,element)}>{element.name}</a>
                            ))}
                        </div>
                    </div>
            </td>
            <td id='nowrap' style={{fontWeight:"700"}}>
                    {props.data.Cases}
                    <small><span class="badge badge-pill badge-secondary">{'+'+props.data.TodayCases}</span></small>
            </td>
            <td id='nowrap' style={{fontWeight:"700"}}>
                    {props.data.Deaths}
                    <small><span class="badge badge-pill badge-danger">{'+'+props.data.TodayDeaths}</span></small>
            </td>
            <td id='nowrap' style={{fontWeight:"700"}}>
                    {props.data.Recovered}
            </td>
            <td style={{fontWeight:"700"}}>{props.data.Active}</td>
            <td style={{fontWeight:"700"}}>{props.data.casespermillion}</td>
            <td style={{fontWeight:"700"}}>{props.data.deathspermillion}</td>
            <td style={{fontWeight:"700"}}>{props.data.testsPerOneMillion}</td>
            <td style={{fontWeight:"700"}}>{props.data.tests}</td>
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
            return <td style={{fontWeight:"600"}} id='nowrap'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span> {item.country}</td>
        }
        if(item.country==="USA"){
            item.country= 'United States'
            return <td style={{fontWeight:"600"}} id='nowrap'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span> {item.country}</td>
        }
        if(item.country==="UK"){
            item.country='United Kingdom'
            return <td style={{fontWeight:"600"}} id='nowrap'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span> {item.country}</td>
        }
       if(item.country.length > 10){
           return <td style={{fontWeight:"600"}}><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span> {item.country}</td>
       }
        if(item.country==="MS Zaandam"){
            return <td style={{fontWeight:"600"}}>{item.country}</td>
        }
        if(item.country==="Diamond Princess"){
            return <td style={{fontWeight:"600"}}>{item.country}</td>
        }
        else{
            return <td style={{fontWeight:"600"}} id='nowrap'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span> {item.country}</td>
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
                                    <td id='statscell'>{item.casesPerOneMillion}</td>
                                    <td id='statscell'>{item.deathsPerOneMillion}</td>
                                    <td id='statscell'>{item.testsPerOneMillion}</td>
                                    <td id='statscell'>{item.tests}</td>
                                   
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
            <div className='container-lg'>
                <div class="d-flex justify-content-start mb-3">
                    <div class='col-lg-6 col-sm-9 mt-2'>
                        <input type="text" 
                                class="form-control form-control-sm" 
                                value={filtertStr} 
                                placeholder="Search A Country..."
                                onChange={ e => this.setState({ filterStr: e.target.value }) }/>
                    </div>
                    <div className='mt-2'>
                        <button className='btn btn-sm btn-light' onClick={this.props.sortValues}>
                            <i class="fas fa-sort"></i>
                        </button>
                    </div>
                </div>
            </div>
              <div className='table-responsive-sm'>
                    <table id='statstable' class="table table-bordered table-sm">
                        <TableHeader list={this.props.list} changeContinent={this.props.changeContinent} data= {this.props.dataw} />
                        {tableBody}
                    </table>
                </div>   
            </div>
        );
    }
}

export default FilteredTable