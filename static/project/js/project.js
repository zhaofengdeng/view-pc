import Vue from "vue";
//通过名称得到树节点
const getNodeByName = function (list, name) {
    var superParentNode = null;
    for (var i = 0; i < list.length; i++) {
        if (list[i].name == name) {
            //找到超级父类
            return superParentNode = list[i];
        }
    }
}
//获取子节点
const getChildens = function (list, nodeId) {
    var childenList = list.filter(function (e) {
        return Object.keys(e).some(function (key) {
            if (e.parentNode != null && e.parentNode.id == nodeId) {
                return true;
            }
            return false;
        })
    })
    // var childes = [];
    // for (var i = 0; i < childenList.length; i++) {
    //     childes.push({ id: childenList[i].id, label: childenList.name });
    // }
    return childenList;
}
const getTreeNodes = function (list) {
    var paretenNode = getNodeByName(list, "权限URL");
    return getTreeChildens(list, paretenNode.id);
}
const getTreeChildens = function (list, nodeId) {
    var childens = getChildens(list, nodeId);
    if (childens.length == 0) {
        return childens;
    }
    for (var i = 0; i < childens.length; i++) {
        childens[i].children = getTreeChildens(list, childens[i].id);
    }
    return childens;
}
Vue.prototype.getTreeNodes = getTreeNodes;
export default {

};