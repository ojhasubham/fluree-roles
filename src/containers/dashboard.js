import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { flureeQuery, flureeTransact } from '../utils/flureeFunctions';
import jwt from 'jsonwebtoken';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productName: '',
    deliverables: true,
    price: 0,
  });

  const classes = useStyles();

  const fetchProducts = () => {
    const productsQuery = {
      select: ['*'],
      from: 'product',
      opts: {
        compact: true,
      },
    };
    flureeQuery(productsQuery)
      .then((res) => {
        console.log('product', res);
        const flatProducts = res.data.map((product) => {
          return {
            productName: product.productName,
            deliverables: product.deliverables,
            price: product.price,
          };
        });
        console.log('flatProducts', flatProducts);
        setProducts(flatProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!userData.role) {
      const token = localStorage.getItem('token');
      if (token) {
        const { sub } = jwt.decode(token);
        console.log('token subject', sub);
        const userQuery = {
          selectOne: [{ '_user/_auth': ['_id', 'username'] }, { roles: ['id'] }],
          from: ['_auth/id', sub],
          opts: {
            compact: true,
          },
        };
        flureeQuery(userQuery)
          .then((user) => {
            console.log('user', user);
            setUserData({
              id: user.data.roles[0].id,
              username: user.data._user[0].username,
              _id: user.data._user[0]._id,
            });
          })
          .catch((err) => {
            return err;
          });
      }
      fetchProducts();
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const newProduct = [
      {
        _id: 'product$new',
        productName: form.productName,
        deliverables: form.deliverables,
        price: parseFloat(form.price),
      },
    ];
    flureeTransact(newProduct)
      .then((res) => {
        console.log(res);
        setForm({
          productName: '',
          deliverables: true,
          price: 0,
        });
      })
      .catch((err) => {
        alert(err.response.data.message || '');
        console.error(err.response.data.message || '')
      });
  };
  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
    
      <>
        <form className={classes.root} onSubmit={submitHandler}>
          <TextField
            name="productName"
            label="productName)"
            value={form.productName}
            onChange={changeHandler}
          />
          <FormControl>
            <InputLabel id="account-label">Bank Account</InputLabel>
            <Select
              labelId="account-label"
              id="account-select"
              name="deliverables"
              value={form.deliverables}
              onChange={changeHandler}
            >
              <MenuItem key={true} value={true}>
                true
							</MenuItem>
              <MenuItem key={false} value={false}>
                false
							</MenuItem>
            </Select>
          </FormControl>
          <TextField name="price" label="price ($)" value={form.price} onChange={changeHandler} />

          <IconButton className={classes.submitButton} type="submit">
            <AddIcon color="primary" />
          </IconButton>
        </form>

        <table>
          <th>productName</th>
          <th>deliverables</th>
          <th>price</th>
          <tbody>
            {products.length === 0
              ? null
              : products.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{product.productName}</td>
                    <td>{product.deliverables}</td>
                    <td>{product.price}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
          {userData.role === 'customer' ? (
          <div>this is customer</div>
          ): (
         <div>this is selller</div> 
          )} 
      </>
    </>
  );
};

const mapStateToProps = (state) => ({
  // tokenCustom:  (state.userReducer && state.userReducer.user && state.userReducer.user.token) || '',
});
export default connect(mapStateToProps)(Dashboard);
