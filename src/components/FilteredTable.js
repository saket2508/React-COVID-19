import React, { useState, useEffect, Fragment} from "react"



function format(item){
    return new Intl.NumberFormat('en-US').format(item)
}

function TableHeader({ data }){
    const tableheader=(
        <Fragment>
        <thead className='thead-light'>
            <th scope='col' style={{textAlign:'center'}}>
                #
            </th>
            <th scope='col'>        
                Location
            </th>
            <th scope='col'>Confirmed</th>
            <th scope='col'>Deaths</th>
            <th scope='col'>Recovered</th>
            <th scope='col'>Active</th>
            <th scope='col'>Critical</th>
            <th scope='col'>Total Tests</th>
            <th scope='col'>Tests Per Million</th>

        </thead>

        <tr className="table-warning">
            <td></td>
            <td id='nowrap' style={{fontWeight:"700"}}> 
                    <div class="btn-group">
                        <button class="btn btn-custom btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <span style={{fontWeight:'700'}}>{data.data.Name}</span>
                        </button>
                        <div class="dropdown-menu">
                            {data.list.map((element) => (
                                <a key={element.id} class="dropdown-item" onClick={() => {
                                    data.changeContinent(element)
                                }}>{element.name}</a>
                            ))}
                        </div>
                    </div>
            </td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>
                    {format(data.data.Cases)}
                    <small><span class="badge badge-pill badge-secondary">{'+'+format(data.data.TodayCases)}</span></small>
            </td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>
                    {format(data.data.Deaths)}
                    <small><span class="badge badge-pill badge-danger">{'+'+format(data.data.TodayDeaths)}</span></small>
            </td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>
                    {format(data.data.Recovered)}
            </td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>{format(data.data.Active)}</td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>{format(data.data.Critical)}</td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>{data.tests}</td>
            <td id='nowrap-r' style={{fontWeight:"700"}}>{data.data.testsPerOneMillion}</td>
        </tr>
        </Fragment>
    );
    return tableheader;
}


export default function FilteredTable({ dataTable }){

    const [ search, setSearch ] = useState("")


    const checkConfirmedValue= (item) =>{
        if(item.todayCases >0){
                return <small><span class="badge badge-pill badge-secondary">{'+'+format(item.todayCases)}</span></small>
        }
    }

    const checkDeathsValue = (item) =>{
        if(item.todayDeaths >0){
            return <small><span class="badge badge-pill badge-danger">{'+'+format(item.todayDeaths)}</span></small>
        }
    }

    const checkCountryName = (item) =>{
        if(item.country==="Lao People's Democratic Republic"){
            item.country='Laos'
            return <td style={{fontWeight:"600"}}  id='nowrap'><span class="mr-1"><img src={"https://www.countryflags.io/"+item.countryInfo.iso2+"/flat/32.png"} alt='flag-icon'></img></span>{item.country}</td>
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

    const tableRows= (
        dataTable.data.filter(e => e.country.toLowerCase().includes(search.toLowerCase()))
    )

    let id=1
    let tableBody=(
            <tbody>
                    {tableRows.map((item) =>
                        (
                            <tr>
                                <td id='nowrapid'>{id++}</td>
                                    {checkCountryName(item)}
                                <td id='nowrap-r'> {format(item.cases)} 
                                    {checkConfirmedValue(item)}
                                </td>
                                <td id='nowrap-r'>{format(item.deaths)}
                                    {checkDeathsValue(item)}
                                </td> 
                                <td id='nowrap-r'>{format(item.recovered)}</td>
                                <td id='nowrap-r'>{format(item.active)}</td>
                                <td id='nowrap-r'>{format(item.critical)}</td>
                                <td id='nowrap-r'>{format(item.tests)}</td>
                                <td id='nowrap-r'>{format(item.testsPerOneMillion)}</td>
                               
                            </tr>
                        ))}
            </tbody>
    )

    if(tableRows.length===0){
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
                <input id="search" class="form-control form-control-md" 
                            value={search} 
                            type="search"
                            placeholder="Search Any Country..."
                            aria-label="Search"
                            onChange={ e => setSearch(e.target.value) }/>
                </div>
               
            </div>
        </div>
          <div className='table-responsive-lg'>
                <table id='statstable' class="table table-bordered table-hover table-sm">
                    <TableHeader {...{
                        data:{
                            changeContinent: dataTable.changeContinent,
                            list:  dataTable.list,
                            data:  dataTable.dataw
                        }
                    }} />
                    {tableBody}
                </table>
            </div>   
        </div>
    )

}


