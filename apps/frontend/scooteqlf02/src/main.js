import { createApp } from "vue";
import "leaflet/dist/leaflet.css";
import auth from "../plugins/auth.js";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router/index.js";

const app = createApp(App);
app.use(ElementPlus);
app.use(auth);
app.use(router);
app.mount("#app");
