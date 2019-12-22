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
                        return;
                    }
                    var msg = "1002服务器返回异常，请联系管理员";
                    if (!StringUtil.isNull(response.data.data)) {
                        msg = response.data.data;
                    }
                    if (response.data.code == -101) {
                        msg = url + "没有权限访问";
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
Vue.filter('listFormat', function (list, type) {
    var str = "";
    if (StringUtil.isNull(list)) {
        return str;
    }
    for (var i = 0; i < list.length; i++) {

        str = str + list[i][type];
        if (i < list.length - 1) {
            str = str + "、";
        }
    }

    return str;
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
        var valueArray = [];
        if (!StringUtil.isNull(checkModel.value)) {
            valueArray = checkModel.value.split(",");
        }

        var curErrorFlag = false;
        for (var j = 0; j < valueArray.length; j++) {
            var checkValue = valueArray[j];

            if ("required" == checkValue) {
                if (StringUtil.isNull(modelValue)) {

                    this.showErrorMsg(checkModelName + "为必填项");
                    checkFlag = false;
                    curErrorFlag = true;
                    break;
                }
            }
            if ("email" == checkValue) {
                var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (!reg.test(modelValue)) {
                    this.showErrorMsg(checkModelName + "不是正确的邮箱格式");
                    checkFlag = false;
                    curErrorFlag = true;
                    break;
                }
            }

        }
        if (curErrorFlag) {
            continue;
        }
        //最大长度校验
        if (!StringUtil.isNull(checkModel.maxLength) && !StringUtil.isNull(modelValue)) {
            if (modelValue.length > checkModel.maxLength) {
                if (modelValue instanceof Array) {
                    this.showErrorMsg(checkModelName + "选择不能超过" + checkModel.maxLength + "个");
                } else {
                    this.showErrorMsg(checkModelName + "不能超过" + checkModel.maxLength + "个字符");
                }

                checkFlag = false;
                continue;
            }
        }
        //最小长度校验
        if (!StringUtil.isNull(checkModel.minLength)) {
            if (StringUtil.isNull(modelValue) || modelValue.length < checkModel.minLength) {
                this.showErrorMsg(checkModelName + "最少选择" + checkModel.minLength + "个");
                checkFlag = false;
                continue;
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
