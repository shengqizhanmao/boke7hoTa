import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from '../plugins/element'
import './assets/iconfont.css'
import './assets/css/global.css'
// import './assets/css/index.css'
import VueCookies from 'vue-cookies'
import axios from "axios";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// window object
window.$cookies.config('30d')

axios.defaults.baseURL = "http://127.0.0.1:8086"
axios.defaults.timeout = 10000;
axios.interceptors.request.use(req => {
    req.headers.Authorization = window.sessionStorage.getItem('token')
    // req.headers.Authorization = window.$cookies.get("token")
    return req
})
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // console.log(error)
        if(error.code=="ERR_NETWORK"){
            console.log("权限不够");
            return null;
        }
        if (error.code == "ERR_NETWORK") {
            console.log("网络错误")
            // message.error("出错了");
            return null;
        }
        return Promise.reject(error);
    }
);
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// app.config.globalProperties.$cookies = VueCookies
app.config.globalProperties.$http = axios
installElementPlus(app)
app.use(router).mount('#app')
export default app.config.globalProperties.$http;
