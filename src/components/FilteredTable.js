import React, { Component, Fragment} from "react"

function format(item){
    return new Intl.NumberFormat('en-US').format(item)
}


function TableHeader(props){
    const tableheader=(
        <Fragment>
            
        <thead className='thead-light'>
            <th scope='col' style={{textAlign:'center'}}>
                #
            </th>
            <th scope='col'>        
                Location
            </th>
            <th scope='col' style={{fontWeight:"700"}} id='nowrap-r'>Confirmed</th>
            <th scope='col' style={{fontWeight:"700"}} id='nowrap-r'>Deaths</th>
            <th scope='col' style={{fontWeight:"700"}} id='nowrap-r'>Recovered</th>
            <th scope='col' style={{fontWeight:"700"}} id='nowrap-r'>Active</th>
            <th id='nowrap-r' style={{wordWrap:'break-word',fontWeight:"700"}} scope='col'>Cases/1M People</th>
            <th id='nowrap-r' style={{wordWrap:'break-word',fontWeight:"700"}} scope='col'>Deaths/1M People</th>
            <th id='nowrap-r' style={{wordWrap:'break-word',fontWeight:"700"}} scope='col'>Tests/1M People</th>
            <th id='nowrap-r' style={{wordWrap:'break-word',fontWeight:"700"}} scope='col'>Total Tests</th>
        </thead>

        <tr className="table-warning">
            <td></td>
            <td id='nowrap' style={{fontWeight:"700"}}> 
                    <div class="btn-group">
                        <button class="btn btn-custom btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span style={{fontWeight:'700'}}>{props.data.Name}</span>
                        </button>
                        <div class="dropdown-menu">
                            {props.list.map((element) => (
                                <a key={element.id} class="dropdown-item" onClick={props.changeContinent.bind(this,element)}>{element.name}</a>
                            ))}
                        </div>
                    </div>
            </td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>
                    {format(props.data.Cases)}
                    <small><span class="badge badge-pill badge-secondary">{'+'+format(props.data.TodayCases)}</span></small>
            </td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>
                    {format(props.data.Deaths)}
                    <small><span class="badge badge-pill badge-danger">{'+'+format(props.data.TodayDeaths)}</span></small>
            </td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>
                    {format(props.data.Recovered)}
            </td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>{format(props.data.Active)}</td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>{format(props.data.casespermillion)}</td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>{format(props.data.deathspermillion)}</td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>{props.data.testsPerOneMillion}</td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>{props.data.tests}</td>
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
                return <small><span class="badge badge-pill badge-secondary">{'+'+format(item.todayCases)}</span></small>
        }
    }
    checkDeathsValue = (item) =>{
        if(item.todayDeaths >0){
            return <small><span class="badge badge-pill badge-danger">{'+'+format(item.todayDeaths)}</span></small>
        }
    }
    checkCountryName = (item) =>{
        if(item.country==="Lao People's Democratic Republic"){
            item.country='Laos'
            return <td style={{fontWeight:"600"}}  id='nowrap'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span>{item.country}</td>
        }
        if(item.country==="USA"){
            item.country= 'United States'
            return(
               <td style={{fontWeight:"600"}} id='nowrap'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span>{item.country}</td>
            )
        }
        if(item.country==="UK"){
            item.country='United Kingdom'
            return <td style={{fontWeight:"600"}} id='nowrap'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span>{item.country}</td>
        }
        if(item.country==='Libyan Arab Jamahiriya'){
            item.country='Libya'
            return <td style={{fontWeight:"600"}} id='nowrap'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span>{item.country}</td>
        }
        if(item.country==='S. Korea'){
            item.country='South Korea'
            return <td style={{fontWeight:"600"}} id='nowrap'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span>{item.country}</td>
        }
       if(item.country.length > 10){
           return <td style={{fontWeight:"600"}}><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span>{item.country}</td>
       }
        if(item.country==="MS Zaandam"){
            return <td style={{fontWeight:"600"}}>{item.country}</td>
        }
        if(item.country==="Diamond Princess"){
            return <td style={{fontWeight:"600"}}>{item.country}</td>
        }
        else{
            return <td style={{fontWeight:"600"}} id='nowrap'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span>{item.country}</td>
        }
    }
    render(){
        const elements= this.props.data;
        const filtertStr= this.state.filterStr;
        //const data= this.props.DataCountries

        const filteredElements=(
            elements.filter(e => e.country.toLowerCase().includes(filtertStr.toLowerCase()))
        )
        let id=1
        var tableBody=(
                <tbody>
                        {filteredElements.map((item) =>
                            (
                                <tr>
                                    <td id='nowrapid'>{id++}</td>
                                   {this.checkCountryName(item)}
                                    <td id='nowrap-r'> {format(item.cases)} 
                                        {this.checkConfirmedValue(item)}
                                    </td>
                                    <td id='nowrap-r'>{format(item.deaths)}
                                        {this.checkDeathsValue(item)}
                                    </td> 
                                    <td id='nowrap-r'>{format(item.recovered)}</td>
                                    <td id='nowrap-r'>{format(item.active)}</td>
                                    <td id='nowrap-r'>{format(item.casesPerOneMillion)}</td>
                                    <td id='nowrap-r'>{format(item.deathsPerOneMillion)}</td>
                                    <td id='nowrap-r'>{format(item.testsPerOneMillion)}</td>
                                    <td id='nowrap-r'>{format(item.tests)}</td>
                                   
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
                    <div class='col-lg-4 col-sm-9 mt-2'>
                    <input class="form-control form-control-sm" 
                                value={filtertStr} 
                                type="search"
                                placeholder="Search A Country..."
                                aria-label="Search"
                                onChange={ e => this.setState({ filterStr: e.target.value }) }/>
                    </div>
                   
                </div>
            </div>
              <div className='table-responsive-lg'>
                    <table id='statstable' class="table table-bordered table-hover table-sm">
                        <TableHeader list={this.props.list} changeContinent={this.props.changeContinent} data= {this.props.dataw} />
                        {tableBody}
                    </table>
                </div>   
            </div>
        );
    }
}

export default FilteredTable