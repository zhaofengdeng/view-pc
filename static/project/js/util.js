import Vue from "vue";
import Axios from "axios";
import globalProject from "./global.project.js";
//==============================StringUtil=================================
const StringUtil = {
    //是否为空判断
    isNull: function (text) {
        if (undefined == text) {
            return true;
        }
        if (text.length == "" || text.length == 0) {
            return true;
        }
        return false;
    }
};
Vue.prototype.StringUtil = StringUtil;
//==============================StringUtil=================================

//==============================SessionUtil=================================
const SessionUtil = {
    set: function (key, item) {
        sessionStorage.setItem(key, JSON.stringify(item));
    },
    get: function (key) {
        return JSON.parse(sessionStorage.getItem(key));
    },
    clear: function (key) {
        sessionStorage.clear(key);
    }
};
Vue.prototype.SessionUtil = SessionUtil;
//==============================SessionUtil=================================

Axios.defaults.withCredentials = true;
Axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
const post = function (url, data) {
    return new Promise((resolve, reject) => {
        Axios.post(globalProject.serverUrl + url, data).then(
            response => {
                if (!response.data.success) {
                    if (response.data.code == -100) {
                        this.$router.push({
                            path: "/login"
                        });
                    }
                    var msg = "1002服务器返回异常，请联系管理员";
                    if (!StringUtil.isNull(response.data.data)) {
                        msg = response.data.data;
                    }
                    this.alert(msg);
                } else {
                    resolve(response.data.data);
                }
            },
            err => {
                this.alert("系统异常请联系管理员");
            }
        );
    });
};
Vue.prototype.post = post;
export default {};
