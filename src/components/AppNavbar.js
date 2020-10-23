import React from "react";
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import { makeStyles } from '@material-ui/core/styles';

function Modal(){
  return(
    <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="exampleModalLabel">About</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p className='lead mb-4'>This website was created by Saket S Narayan, a third year CS student from Manipal University Jaipur. You can connect with me on Github or LinkedIn.</p>
          <div className='row px-3 d-flex justify-content-center'>
            <div className="px-4">      
              <h2>
                <a className='text-secondary' href="https://github.com/saket2508"><i class="fab fa-github"></i></a>
              </h2>
            </div>
            
            <div className="px-4">
              <h2>
                <a className='text-secondary' href="https://www.linkedin.com/in/saket-s-narayan-636158149/">
                  <i class="fab fa-linkedin"></i>
                </a>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}


export default function AppNavbar(){

  return(
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'#263238'}}>   
        <div className="container">
          <span style={{fontWeight:'600', fontSize:'18px'}} className="navbar-brand mb-0">COVID-19 Dashboard</span>
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a class="nav-link" data-toggle="modal" data-target="#staticBackdrop" href="#"><InfoTwoToneIcon style={{fontSize:30}}/></a>
                </li>
            </ul>
        </div>
      </nav>

      <Modal/>
      </React.Fragment>
  )
}
