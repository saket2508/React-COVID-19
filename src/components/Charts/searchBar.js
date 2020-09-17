import React from 'react';


const SearchBar = ({selectedCountry, changeValue, list}) => {
    return(
        <div className='row mt-2'>
            <div className="container d-flex col-7 justify-content-center">
                <select id="select" value={selectedCountry} onChange={(event) => changeValue(event)} style={{borderRadius:50}} className="custom-select custom-select-md">
                        {list.map((item) => {
                            if(item==="India"){
                                 return <option selected>{item}</option>
                            }
                            else{
                                return <option value={item}>{item}</option>
                            }
                        })}
                </select>
            </div>
    </div>
    
    )
}

export default SearchBar