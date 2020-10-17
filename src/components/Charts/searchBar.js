/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { borders } from '@material-ui/system';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    // width: 300,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  margin:{
    marginTop: theme.spacing(3),
  },
  searchBar:{
      borderRadius:"25px",
  }
}));

const SearchBar = ({selectedCountry, changeValue, list}) => {
    const classes = useStyles();

    const handleInputChange = (value) => {
        if(value!==null){
            //console.log(value)
            changeValue(value)
        }
    }
    return(
    //     <div className='row mt-2'>
    //         <div className="container d-flex col-7 justify-content-center">
    //             <select id="select" value={selectedCountry} onChange={(event) => changeValue(event)} style={{borderRadius:50}} className="custom-select custom-select-md">
    //                     {list.map((item) => {
    //                         if(item==="India"){
    //                              return <option selected>{item}</option>
    //                         }
    //                         else{
    //                             return <option value={item}>{item}</option>
    //                         }
    //                     })}
    //             </select>
    //         </div>
    // </div>
            <Grid className={classes.margin}
                container
                direction="row"
                justify="center"
                alignItems="center">
                    <Grid item xs={9} sm={6}>                   
                            <Autocomplete
                                fullWidth={true}
                                className="inputRounded"
                                // size="small"
                                id="country-select-demo"
                                options={list}
                                getOptionLabel={(option) => option}
                                defaultValue="India"
                                onChange={(e, value) => handleInputChange(value)}
                                renderInput={(params) => (
                                    <TextField {...params} 
                                        borderRadius={16}
                                        variant="outlined" 
                                        label="Search" 
                                        placeholder="Search..."
                                         />
                                )}
                            />
                    </Grid>
            </Grid>
    )
}

export default SearchBar