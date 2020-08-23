import React, { Component} from "react"
import FilteredTable from './FilteredTable'


export default function Table({ tableData }){
    return(
        <div className='container-md'>
            <FilteredTable {...{
                dataTable:{
                    changeContinent:tableData.changeContinent,
                    data:tableData.data, 
                    dataw:tableData.dataw,
                    list:tableData.list
                }
            }}/>
        </div>
    )
}
