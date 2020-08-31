import axios from 'axios';


/****
 * for 
 * @param {}
 */

const GetApi = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
        console.log(res);
        return res;
    })
}

/****
 * for 
 * @param {obj} obj // data for new post create
 */
const PostApi = () => {
    const obj = {
        "userId": 1111,
        "id": 1111,
        "title": "Custom Title",
        "completed": false
    }
    axios.post('https://jsonplaceholder.typicode.com/todos', obj).then(res => {
        console.log(res);

        return res;
    })
}

/****
 * for 
 * @param {obj} data= {
	"email": String,
	"password":String
} 
 * // data for new post create
 */
const LoginRequest = (data) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/users/login', data,  { headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        }}).then(async res => {
            console.log(res);
            if (res.data) {
                return resolve(res);
            } else {
                return reject('data not found');
            }
        })
    })

}

/****
 * for 
 * @param {obj} data= {
	"email": String,
	"password":String
}
 * // data for new post create
 */
const RegisterRequest = (data) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/users/register', data).then(res => {
            console.log(res);
            return res;
        })
    })
}

/****
 * for 
 * @param {obj} data= {
	"email": String,
	"password":String
}
 * // data for new post create
 */
const AddProduct = (data) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/productRoute/addproduct', data, {headers: {
            "Content-Type": "multipart/form-data"
        }}).then(res => {
            console.log(res);
            return res;
        })
    })
}


/****
 * for 
 * @param {obj} data= {
	"email": String,
	"password":String
}
 * // data for new post create
 */
const getProduct = (data) => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/productRoute/getallproduct').then(res => {
            console.log(res);
            resolve(res)
        })
    })
}
/****
 * for 
 * @param {obj} data= {
	"email": String,
	"password":String
}
 * // data for new post create
 */
const getProductById = (data) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/productRoute/getproductbyid', data).then(res => {
            console.log(res);
            resolve(res)
        })
    })
}

export default { GetApi, PostApi, LoginRequest, RegisterRequest, AddProduct, getProduct, getProductById }

