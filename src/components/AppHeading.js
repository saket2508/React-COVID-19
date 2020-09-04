import React, { useState } from "react";
import RefreshIcon from '@material-ui/icons/Refresh';

function checkDateGlobal(item){
    let time_rn= new Date().getTime()
    let last_updated= ((time_rn-item)/60000).toFixed(0)
    return <span>Last Updated: {last_updated} mins ago</span>
}

export default function AppHeading({ data }){
    return(
        <div className='container-lg shadow-sm pt-1 pl-3 pr-3 pb-1 mb-4 bg-white rounded'>
            <div className='mt-3'>
                <p style={{fontSize:20, fontWeight:'300'}} className="mb-2">
                    See live statistics of the ongoing COVID-19 pandemic that include the current count of cases, fatalities, recovered patients and active infections in all affected countries. You can search for any country from the search bar to see its charts and figures, and the table below it for more info.
                </p>
            </div>
            <div style={{flex:1,flexDirection:'row'}} className='mt-3'>
                <RefreshIcon fontSize="small" style={{color:'#9e9e9e', fontWeight:'300', marginBottom:1}}/>
                <span style={{fontStyle:'italic', fontSize:15, fontWeight:'300', marginLeft:2, color:"#9e9e9e"}} >{checkDateGlobal(data.lastupdated)}</span>
            </div>
        </div>
    )
}


