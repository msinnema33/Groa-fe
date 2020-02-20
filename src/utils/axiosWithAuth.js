import axios from 'axios';

const axiosWithAuth = () => {
    const token = localStorage.getItem("token");
    //need env file for line 6?
    var key = process.env.REACT_APP_KEY
    return axios.create({
        baseURL:'',
        headers: {
            Authorization: token 
        }
    });
};

export default axiosWithAuth;