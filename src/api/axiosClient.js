import axios from 'axios';
import querystring from 'query-string';
import apiConfig from './api';

const axiosClient= axios.create({
    baseURL:apiConfig.baseurl,
    headers:{
        'content-type':'application/json'
    },params:{
        api_key:apiConfig.apiKey
    },
    paramsSerializer:params=> querystring.stringify({...params,api_key:apiConfig.apiKey})
})

axiosClient.interceptors.request.use(async (config)=>config);

axiosClient.interceptors.response.use((res)=>{
    
if(res &&res.data){
    return res.data
}
return res;
},(erroe)=>{
    throw erroe;
});




export default axiosClient;