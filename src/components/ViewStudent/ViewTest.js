import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Table, Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from "@fortawesome/free-solid-svg-icons";
import confirm from "reactstrap-confirm";
const ViewTest = () => {
    const [products, setProducts] = useState([]);
//ไปดึง api ของอันเก่ามาใช้จาก url
    const updateProducts = () =>{
        axios.get("http://localhost:8080/students").then((response) => {
            console.log(response);
            setProducts(response.data.students);
            console.log("Updating products.....");
        });
    };

    useEffect(() => {
        updateProducts();
    }, []);

const deleteProduct = async(productName,productId) => {
    let result = await confirm(
        {
            title :<>Comfirmation!! </>,
            message : 'คุณต้องการลบผลิตภัณฑ์ไอดี" '+productName+' "ใช่ไหม?',
            confirmText : "ใช่",
            confirmColor : "primary",
            cancelText : "ไม่ใช่",
            cancelColor : "btn btn-danger",
        });
        if(result){
            axios.delete("http://localhost:8080/products/" + productId)//คำสั่งลบที่ดึงมาจาก url
            .then((response) =>{
            updateProducts(); //อัพเดตหน้าว่าลบไปเเล้ว
            });
        }
};



    return (
        <Container>
            <Row>
                <h3>Product List</h3>
            </Row>
            <Row>
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                    return(
                    <tr key={product.id_stu}>
                    <td>{product.id_stu}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>
                        <Button color="info" href={"/profile/" + product.id_stu}>
                        <FontAwesomeIcon icon={faEdit}/>  Edit
                        </Button>{" "}
                        <Button color="danger" 
                        onClick={() => deleteProduct(product.name,product._id)}>
                        <FontAwesomeIcon icon={faTrash}/>Delete</Button>
                        </td>
                    </tr>
                    );
                    })}
                </tbody>
            </Table>
            </Row>
        </Container>
    )
}//ดึงข้อมูลตาม name caregory price
export default ViewTest;