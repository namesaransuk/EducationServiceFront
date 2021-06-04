import React, { useState, useEffect } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody, Label, Row, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

function Index(props) {
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const [edudetail, setEdudetail] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/eduDetail/getEduDetail")
            .then((response) => {
                setEdudetail(response.data);
            });

    }, []);
    return (

        <div>
            <div class="caruB">
                <div class="container">
                    <center>
                    </center>
                </div>
            </div>
            <br />
            <div class="container">
                <center><h2> ประชาสัมพันธ์ </h2></center>
                
                <br />
            </div>
        </div>

    );
}

export default Index;
