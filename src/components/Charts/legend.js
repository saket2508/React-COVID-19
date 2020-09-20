import React from 'react';

function format(item){
    return new Intl.NumberFormat('en-US').format(item)
}


const Legend = (data) =>{
    return(
        <div className='row'>
        <div className='col-12'>
            <ul className="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                    <div className='title'>
                        <div className='dot-1'></div>
                        <h6 style={{fontWeight:'400'}}>Active</h6>
                    </div>
                    <div className='count'>
                        <h6 style={{fontWeight:'600'}}>{format(data.Active)}
                            <small className='text-muted'> ({data.ar} %)</small>
                        </h6>
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                    <div className='title'>
                        <div className='dot-2'></div>
                        <h6 style={{fontWeight:'400'}}>Recovered</h6>
                    </div>
                    <span className='count'>
                        <h6 style={{fontWeight:'600'}}>{format(data.Recovered)}
                            <small className='text-muted'> ({data.rr} %)</small>
                        </h6>
                    </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center" style={{fontWeight:'600',color:'#616161'}}>
                    <div className='title'>
                        <div className='dot-3'></div>
                        <h6 style={{fontWeight:'400'}}>Fatalities</h6>
                    </div>
                    <span className='count'>
                        <h6 style={{fontWeight:'600'}}>{format(data.Deaths)}
                        <small className='text-muted'> ({data.cfr} %)</small>
                        </h6>                                            
                    </span>
                </li>                                            
            </ul>
            </div>
        </div>
    )
}

export default Legend