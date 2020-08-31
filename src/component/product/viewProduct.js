import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router';
import Header from "../common/header";
import { AppRoutes } from "../../config/AppRoutes";
import reqService from "../../services/requestService";
import { AppConfig } from "../../config/AppConfig";
const URL = AppConfig.FILE_URL;

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const ViewProduct = () => {
    let history = useHistory();

    let [allProduct, setallProduct] = useState({})
    useEffect(() => {
        async function fetchData() {
            const data = await reqService.getProduct()
            setallProduct(data.data.data)
        }
        fetchData();
    }, [])
    const goToAddProduct = () => {
        history.push(AppRoutes.ADDPRODUCT.replace(':id', null));
    }
    const editProduct = (productId) => {
        history.push(AppRoutes.ADDPRODUCT.replace(':id', productId));
    }
    const classes = useStyles();
    return (<>
    <Header></Header>
        <Button type="button" variant="contained" color="primary" onClick={goToAddProduct} raised style={{ float: 'right' }} > Add Product </Button>
        {allProduct && allProduct.length > 0 ?
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Discount</TableCell>
                            <TableCell align="right">Quntity</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allProduct.map(row => (
                            <TableRow key={row._id}>
                                <TableCell scope="row">
                                    {row.category}
                                </TableCell>
                                <TableCell scope="row">
                                    <img src={URL + row.images.img} style={{width: '193px', height: '193px'}} alt={URL + row.images.img} />
                                    <img src={URL + row.images.brandimg} style={{width: '193px', height: '193px'}} alt={URL + row.images.brandimg} />
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.price.orignal}</TableCell>
                                <TableCell align="right">{row.price.discount}</TableCell>
                                <TableCell align="right">{row.qty}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => editProduct(row._id)}>edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            : "product not fouund"}
    </>)
}

export default ViewProduct;