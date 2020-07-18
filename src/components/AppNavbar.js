import React, {Component} from "react";

class AppNavbar extends Component{
    navbar= (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className='container-md'>
        <a className="navbar-brand" href="#">
            COVID-19 TRACKER
            <small className='ml-2'>v2.0</small>
          </a>
        </div>
    </nav>
    );

    render(){
       return this.navbar;
    }
}

export default AppNavbar;
