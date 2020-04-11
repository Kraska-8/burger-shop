import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-dcb25.firebaseio.com/'
})

export default instance;