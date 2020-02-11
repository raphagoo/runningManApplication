
import axios from 'axios'
import $log from '../interfaces/consoleLogger'
import Swal from 'sweetalert2'
const appSettings = require("tns-core-modules/application-settings");

const api = axios.create({
    baseURL: 'http://127.0.0.1:3000'
});

api.interceptors.request.use(
    config => {
        $log.info('api.interceptors.request')

        config.headers.Authorization = appSettings.getString('token', null)

        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    $log.debug(error.response)
    if (401 === error.response.status) {
        Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Would you like to be redirected to the login page?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes"
        }).then((result) => {
            if(result.value) {
                
            }
        })
    }
    else if(403 === error.response.status){
        Swal.fire({
            title: "Unauthorized",
            text: " This account isn't authorized to access the backoffice",
            icon: "error",
        })
    }
     else {
        return Promise.reject(error);
    }
});
// you may want to add interceptors to instance
// api.interceptors.request.use(
//     (config) => {
//         if (typeof config === 'undefined') {
//             config = {};
//         }
//         if (typeof config.headers === 'undefined') {
//             config.headers = {};
//         }
//         config.headers['My-Header'] = 'value';

//         return config
//     },
//     (error) => Promise.reject(error)
// )

export default api