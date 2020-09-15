import Vue from 'vue'
import axios from 'axios'

const vizapi = axios.create({
    // baseURL: 'http://192.168.1.24/vizapi/public/location/product',// build production
    baseURL: 'http://192.168.1.24/vizapi/public',//dev 
    timeout:2500,
});
// para usar dentro de componentes
Vue.prototype.$vizapi = vizapi

// para usar dentro de archivos JS
export { vizapi }