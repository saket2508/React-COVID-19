import React from "react"


function Footer(){
    const footer=(
        <div className='container-fluid mt-4' style={{borderTop:'1px #cccccc solid'}}>
            <p className='h5 text-center mt-2 text-muted'>SOURCES AND LINKS</p>
            <div className='text-center mt-3'>
                <p className='small'><a className='btn btn-dark btn-sm' href='https://github.com/saket2508/my-app'>Git Repository <i class="fab fa-github ml-1"></i></a></p>
                <p className='small'><a className='btn btn-secondary btn-sm' href='https://coronavirus.jhu.edu/map.html'>John Hopkins COVID-19 Resource Centre</a></p>
                <p className='small'><a className='btn btn-success btn-sm' href='https://www.mohfw.gov.in/'>MoHFW</a></p>
                <p className='small'><a className='btn btn-primary btn-sm' href='https://www.covid19india.org/'>covid19india.org</a></p>
            </div>
        </div>
    )
    return footer
}

export default Footer