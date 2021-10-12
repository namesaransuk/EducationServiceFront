import React, { Fragment, useState,useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.css'
import Swal from 'sweetalert2';
const Footer = () => {
    const session = {
        id: localStorage.getItem('id'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        // id_staff: localStorage.getItem('id_staff'),
        fname_staff: localStorage.getItem('fname_staff'),
        lname_staff: localStorage.getItem('lname_staff'),
        fname_admin: localStorage.getItem('fname_admin'),
        lname_admin: localStorage.getItem('lname_admin'),
    }
    const [footer, setFooter] = useState([])
    useEffect(() => {
      axios.get("https://educationservice.herokuapp.com/Footer/getFooter")
        .then((response) => {
            setFooter(response.data);
        })
        .catch(error => {
          console.log('Error getting fake data: ' + error);
        })
    }, []);
    const [isOpen, setIsOpen] = useState(false);

    if (session.id === null) {
        return (
            <div>
                  {footer.map((footer) => {
                    return (
            <footer>
                 <div className="roww">
              <div className="coll">
              <h3>{footer.footer_devloper}</h3> 
                  {footer.footer_contact_detail}
              </div>
              <div className="coll">
                <h3>{footer.footer_contact}</h3>
                  {footer.footer_devloper_detail}
              </div>
            </div>
                <hr />
                
                <p className="copyright"> {footer.footer_license}</p>
            
            
                
            </footer>        )
                                                    })}      </div>
        )
    }
    else if (session.fname_staff = session.fname_staff) {
        return (
            <div>
{footer.map((footer) => {
  return (
    <footer className="bg-gradient-to-r from-green-400 to-blue-500">
       <div className="roww">
              <div className="coll">
              <h3>{footer.footer_devloper}</h3> 
                  {footer.footer_contact_detail}
              </div>
              <div className="coll">
                <h3>{footer.footer_contact}</h3>
                  {footer.footer_devloper_detail}
              </div>
            </div>
<hr />

<p className="copyright"> {footer.footer_license}</p>



</footer>        )
                                  })}      </div>
        )
    }
    else if (session.fname_admin = session.fname_admin) {
        return (
            <div>
{footer.map((footer) => {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 to-indigo-500">
       <div className="roww">
              <div className="coll">
              <h3>{footer.footer_devloper}</h3> 
                  {footer.footer_contact_detail}
              </div>
              <div className="coll">
                <h3>{footer.footer_contact}</h3>
                  {footer.footer_devloper_detail}
              </div>
            </div>
<hr />

<p className="copyright"> {footer.footer_license}</p>



</footer>        )
                                  })}      </div>
        )
    }
    else if (session.fname = session.fname) {
        return (
            <div>
            {footer.map((footer) => {
              return (
              <footer className="bg-gradient-to-r from-yellow-700 to-yellow-500">
              <div className="roww">
              <div className="coll">
              <h3>{footer.footer_devloper}</h3> 
                  {footer.footer_contact_detail}
              </div>
              <div className="coll">
                <h3>{footer.footer_contact}</h3>
                  {footer.footer_devloper_detail}
              </div>
            </div>
            <hr />
            <p className="copyright"> {footer.footer_license}</p>
            
            
            
            </footer>        )
                                              })}      </div>
        )
    }
}
export default Footer;