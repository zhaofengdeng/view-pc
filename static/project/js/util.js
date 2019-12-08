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
//==============================post封装=================================
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
//==============================post封装=================================

//==============================自定义数据格式=================================
Vue.filter('format', function (val, type) {

    var typeArray = type.split('.');
    var typeData = globalProject.formatData;
    //如果split . 大于1说明需要取自己的属性
    for (var i = 0; i < typeArray.length; i++) {
        typeData = typeData[typeArray[i]];
    }

    for (var i = 0; i < typeData.length; i++) {
        if (typeData[i].value === val) {
            return typeData[i].name;
        }
    }
    return val;
});
//==============================自定义数据格式=================================

//==============================校验功能=================================

const check = function (model, checkList) {
    var checkFlag = true;
    this.closeAllErrorMsg();
    for (var i = 0; i < checkList.length; i++) {
        var checkModel = checkList[i];
        var key = checkModel.key;
        var checkModelName = checkModel.name;
        var modelValue = model[key];
        var valueArray = checkModel.value.split(",");
        for (var j = 0; j < valueArray.length; j++) {
            var checkValue = valueArray[j];

            if ("required" == checkValue) {
                if (StringUtil.isNull(modelValue)) {

                    this.showErrorMsg(checkModelName + "为必填项");
                    checkFlag = false;

                    break;
                }
            }

            if ("email" == checkValue) {
                var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (!reg.test(modelValue)) {
                    this.showErrorMsg(checkModelName + "不是正确的邮箱格式");
                    checkFlag = false;
                    break;
                }
            }

        }
    }
    return checkFlag;

}
Vue.prototype.check = check;
//==============================校验功能=================================

const wait = function (ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
Vue.prototype.wait = wait;
export default {};
