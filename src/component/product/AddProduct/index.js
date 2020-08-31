import React from 'react';
import { useParams } from "react-router";
import InputForm from './inputform';
import Header from "../../common/header/index";

const AddProduct = () => {
    let { id } = useParams();
    
    return (<>
        <Header></Header>
        <InputForm id={id}></InputForm>
    </>)
}

export default AddProduct;