import React, { Component } from "react";
import { Formik } from "formik";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import * as Yup from 'yup';
import { Form } from "./form";
import reqService from '../../../services/requestService'


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(10),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: '60%'
    },
    container: {
        maxWidth: "200px"
    }
});

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetails: {}
        };
    }
    async componentDidMount() {
        if (this.props.id) {
            const data = await reqService.getProductById({ id: this.props.id })
            this.setState({ productDetails: data.data })
        }
    }

    render() {

        const validationSchema = Yup.object({
            title: Yup.string("Enter a Title")
                .required("Title is required"),
            desc: Yup.string("Enter your Description")
                .required("Description is required"),
            price: Yup.string("")
                .required("Enter your Price"),
            qty: Yup.string("Enter your Quantity")
                .required("Enter your Quantity")
        })
        const classes = this.props;
        if (this.state.productDetails) {
            const initialValues = {
                title: (this.state.productDetails && this.state.productDetails.title) || '1',
                desc: (this.state.productDetails && this.state.productDetails.desc) || "",
                price: (this.state.productDetails && this.state.productDetails.pricee) || 0,
                qty: (this.state.productDetails && this.state.productDetails.qtye) || 0,
                category: (this.state.productDetails && this.state.productDetails.category) || "",
                discount: (this.state.productDetails && this.state.productDetails.discounte) || 0,
                shippingcharge: (this.state.productDetails && this.state.productDetails.shippingcharge) || false,
                img: (this.state.productDetails && this.state.productDetails.img) || '',
                thumbnail: (this.state.productDetails && this.state.productDetails.thumbnail) || '',
                brandimg: (this.state.productDetails && this.state.productDetails.brandimge) || ''
            };
            return (
                <React.Fragment>
                    <div className={classes.container}>
                        <Paper elevation={1} className={'MuiPaper-elevation19'} variant="outlined" >
                            <h1>Form</h1>
                            {this.state.productDetails.title}
                            <Formik
                                enableReinitialize
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                render={props => <Form {...props}
                                />}
                            />
                        </Paper>
                    </div>
                </React.Fragment>
            );
        }
        return null
    }
}

export default withStyles(styles)(InputForm);