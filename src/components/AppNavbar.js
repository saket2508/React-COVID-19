import React from "react";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


export default function AppNavbar(){
  return(
    <div>
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">   
       <div className="container-md">
        <span className="navbar-brand mb-0 h5">COVID-19 TRACKER</span>
          <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" data-toggle="modal" data-target="#staticBackdrop" href="#"><span><i class="far fa-question-circle fa-lg"></i></span></a>
              </li>
          </ul>
       </div>
    </nav>
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
              <div className='row px-3 d-flex justify-content-around'>
                <div>      
                  <h2>
                    <a className='text-secondary' href="https://github.com/saket2508"><i class="fab fa-github"></i></a>
                  </h2>
                </div>
                
                <div>
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
      </div>
  )
}
