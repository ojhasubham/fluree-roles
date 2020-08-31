import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import reqService from '../../../services/requestService'
import Switch from '@material-ui/core/Switch';

export const Form = (props) => {
    const {
        values: { title, desc, price, qty, category, discount, shippingcharge },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched
    } = props;


    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    const fileSelect = (name, e) => {
        props.values[`${name}`] = e.target.files[0]
    }
    return (
        <form
            onSubmit={ async(e) => {
                e.preventDefault();
                const formData= new FormData();
                for await(let key of Object.entries(props.values)){
                        formData.append(`${key[0]}`, key[1])
                }
                reqService.AddProduct(formData)
            }}
        >
            <TextField
                id="title"
                name="title"
                helperText={touched.title ? errors.title : ""}
                error={touched.title && Boolean(errors.title)}
                label="title"
                value={title}
                onChange={change.bind(null, "title")}
                fullWidth

            />
            <TextField
                id="desc"
                name="desc"
                helperText={touched.desc ? errors.desc : ""}
                error={touched.desc && Boolean(errors.desc)}
                label="Description"
                fullWidth
                value={desc}
                onChange={change.bind(null, "desc")}

            />
            <TextField
                id="category"
                name="category"
                helperText={touched.category ? errors.category : ""}
                error={touched.category && Boolean(errors.category)}
                label="Category"
                fullWidth
                value={category}
                onChange={change.bind(null, "category")}

            />
            <TextField
                id="price"
                name="price"
                helperText={touched.price ? errors.price : ""}
                error={touched.price && Boolean(errors.price)}
                label="Price"
                fullWidth
                type="number"
                value={price}
                onChange={change.bind(null, "price")}
            />
            <TextField
                id="discount"
                name="discount"
                helperText={touched.discount ? errors.discount : ""}
                error={touched.discount && Boolean(errors.discount)}
                label="Discount"
                fullWidth
                type="number"
                value={discount}
                onChange={change.bind(null, "discount")}
            />
            <TextField
                id="qty"
                name="qty"
                helperText={touched.qty ? errors.qty : ""}
                error={touched.qty && Boolean(errors.qty)}
                label="Quntity"
                fullWidth
                type="number"
                value={qty}
                onChange={change.bind(null, "qty")}

            />
            <label>
                Shipping Charge
            </label>
            <Switch
                checked={shippingcharge}
                id="shippingcharge"
                name="shippingcharge"
                label="Shippingcharge"
                onChange={change.bind(null, "shippingcharge")}
                value="shippingcharge"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <br />

            <input
                accept="image/*"
                id="img"
                name="img"
                type="file"
                onChange={fileSelect.bind(null, 'img')}
            />
            <label htmlFor="img">
                <Button raised component="span">
                    Upload
            </Button>
            </label>
            <br />
            <input
                accept="image/*"
                id="thumbnail"
                name="thumbnail"
                type="file"
                onChange={fileSelect.bind(null, 'thumbnail')}
            />
            <label htmlFor="thumbnail">
                <Button raised component="span">
                    Upload
            </Button>
            </label>
            <br />
            <input
                accept="image/*"
                id="brandimg"
                name="brandimg"
                type="file"
                onChange={fileSelect.bind(null, 'brandimg')}
            />
            <label htmlFor="brandimg">
                <Button raised component="span">
                    Upload
            </Button>
            </label>
            <br />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid}
            >
                Submit
        </Button>
        </form>
    );
};
