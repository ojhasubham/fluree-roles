import axios from 'axios';
import AXIOS_CONFIG from '../constant';

export const register = async (data) => {
    const res = await axios.post('/api', {}, AXIOS_CONFIG);
    return res;
};
