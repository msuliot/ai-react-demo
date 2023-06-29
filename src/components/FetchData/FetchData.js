import axios from 'axios';

const FetchData = async (question) => {

    const FormData = require('form-data');
    const formData = new FormData();
    const encoder = new TextEncoder();
    const data = encoder.encode(question);
    const base64 = btoa(String.fromCharCode(...data));

    formData.append('prompt', base64);

    return axios.post('http://localhost:8000/api', formData)
        .then(response => {
            //console.log(response.data['response']);
            return response.data['response'];
        })
        .catch(error => {
            console.log(error);
            return error;
        });
}

export default FetchData;
