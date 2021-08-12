import React, { Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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

    const [isOpen, setIsOpen] = useState(false);

    if (session.id === null) {
        return (
            <footer>
                <div className="roww">
                    <div className="coll">
                        <h3>Developer</h3>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia necessitatibus eum, ratione nobis molestiae doloremque adipisci similique eaque quisquam cum repudiandae nisi numquam provident omnis ab nihil dolorum ea harum?
                    </div>
                    <div className="coll">
                        <h3>Contact</h3>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia necessitatibus eum, ratione nobis molestiae doloremque adipisci similique eaque quisquam cum repudiandae nisi numquam provident omnis ab nihil dolorum ea harum?
                    </div>
                </div>
                <hr />
                <p className="copyright">Software Engineering NPRU 2021 - All Rights Reserves</p>
            </footer>
        )
    }
    else if (session.fname_staff = session.fname_staff) {
        return (
            <footer className="bg-gradient-to-r from-green-400 to-blue-500">
                <div className="roww">
                    <div className="coll">
                        <h3>Developer</h3>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia necessitatibus eum, ratione nobis molestiae doloremque adipisci similique eaque quisquam cum repudiandae nisi numquam provident omnis ab nihil dolorum ea harum?
                    </div>
                    <div className="coll">
                        <h3>Contact</h3>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia necessitatibus eum, ratione nobis molestiae doloremque adipisci similique eaque quisquam cum repudiandae nisi numquam provident omnis ab nihil dolorum ea harum?
                    </div>
                </div>
                <hr />
                <p className="copyright">Software Engineering NPRU 2021 - All Rights Reserves</p>
            </footer>
        )
    }
    else if (session.fname_admin = session.fname_admin) {
        return (
            <footer>
                <div className="roww">
                    <div className="coll">
                        <h3>Developer</h3>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia necessitatibus eum, ratione nobis molestiae doloremque adipisci similique eaque quisquam cum repudiandae nisi numquam provident omnis ab nihil dolorum ea harum?
                    </div>
                    <div className="coll">
                        <h3>Contact</h3>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia necessitatibus eum, ratione nobis molestiae doloremque adipisci similique eaque quisquam cum repudiandae nisi numquam provident omnis ab nihil dolorum ea harum?
                    </div>
                </div>
                <hr />
                <p className="copyright">Software Engineering NPRU 2021 - All Rights Reserves</p>
            </footer>
        )
    }
    else if (session.fname = session.fname) {
        return (
            <footer>
                <div className="roww">
                    <div className="coll">
                        <h3>Developer</h3>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia necessitatibus eum, ratione nobis molestiae doloremque adipisci similique eaque quisquam cum repudiandae nisi numquam provident omnis ab nihil dolorum ea harum?
                    </div>
                    <div className="coll">
                        <h3>Contact</h3>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia necessitatibus eum, ratione nobis molestiae doloremque adipisci similique eaque quisquam cum repudiandae nisi numquam provident omnis ab nihil dolorum ea harum?
                    </div>
                </div>
                <hr />
                <p className="copyright">Software Engineering NPRU 2021 - All Rights Reserves</p>
            </footer>
        )
    }
}
export default Footer;