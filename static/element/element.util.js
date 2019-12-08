import Vue from "vue";
import { MessageBox, Message } from 'element-ui';

//=======================alert封装=====================
//使用方式1. this.alert("请输入监测值")；
/*使用方式2：      
this.alert("请输入监测值").then(res => {
    console.log(res);
});
*/

function alert(message) {
  return new Promise((resolve, reject) => {
    MessageBox.alert(message, "提示", {
      confirmButtonText: "确定",
      callback: action => {
        resolve(action);
      }
    });
  });
}
Vue.prototype.alert = alert;
//=======================alert封装=====================

const confirm = function (title) {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(title, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      resolve({ confirm: true });
    }).catch(() => {
      resolve({ confirm: false });
    });
  });
}
Vue.prototype.confirm = confirm;
//=======================alert封装=====================
//=======================错误信息提示=====================
const showErrorMsg = function (title) {
  //elementui的bug如果同时执行，
  setTimeout(function () {
    Message.error({
      showClose: true,
      message: title,
      duration: 0
    });
  }, 100);

}
Vue.prototype.showErrorMsg = showErrorMsg;
const closeAllErrorMsg = function () {
  Message.closeAll();
}
Vue.prototype.closeAllErrorMsg = closeAllErrorMsg;
//=======================错误信息提示=====================
export default {};
