import React from 'react';


const TabsMenu = ({data, handleChange}) =>{
    return(
        <div className='col-12 mb-3'>
                            <ul className="nav nav-tabs nav-tabs-card nav-tabs-xs d-flex align-content-center">
                            {data.slice(0,1).map(item => (
                                    <li className='nav-item'>
                                        <a className='nav-link active' key={item.id} data-toggle="tab" href="#" onClick={() => handleChange(item)} >{item.name}</a>
                                    </li>
                                ))}
                                {data.slice(1).map(item => (
                                    <li className='nav-item'>
                                        <a className='nav-link' key={item.id} data-toggle="tab" href="#" onClick={() => handleChange(item)} >{item.name}</a>
                                    </li>
                                ))}
                            </ul>   
                        </div>
    )
}

export default TabsMenu