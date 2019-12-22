<template>
    <div>
        <div style="width:100%;height:50px;">
            <button class="a" style="float:right;" @click="logout">退出</button>
            <button class="a" style="float:right;" @click="changePasswdDialogFlag = true">修改密码</button>
            <span class="el-icon-user-solid" style="float:right;line-height:32px;">{{user.name}}</span>
        </div>
        <el-dialog title="修改密码" :visible.sync="changePasswdDialogFlag" width="30%">
            <table class="edit_table">
                <tr>
                    <td>请输入新密码</td>
                    <td>
                        <input type="password" v-model="model.passwd">
                    </td>
                </tr>
                <tr>
                    <td style="width:20%;">再次输入新密码</td>
                    <td>
                        <input type="password" v-model="model.passwd2">
                    </td>
                </tr>
            </table>
            <span slot="footer" class="dialog-footer">
                <button class="default" @click="changePasswdDialogFlag = false">取消</button>
                <button @click="changePasswd">确定</button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
      user: {},
      model: {},
      checkModel: [
        {
          key: "passwd",
          value: "required",
          name: "第一次密码",
          minLength: 6
        },

        {
          key: "passwd2",
          value: "required",
          name: "第二次密码",
          minLength: 6
        }
      ],
      changePasswdDialogFlag: false
    };
  },
  mounted() {
    this.user = this.SessionUtil.get("session_user");
  },
  methods: {
    logout() {
      this.confirm("确认是否退出？").then(res => {
        if (res.confirm) {
          this.post("/user_login/logout", {}).then(res => {
            this.$router.push({
              path: "/login"
            });
          });
        }
      });
    },
    changePasswd() {
      var flag = this.check(this.model, this.checkModel);
      if (!flag) {
        return;
      }
      if (this.model.passwd !== this.model.passwd2) {
        this.showErrorMsg("两次密码不一致!");
        return;
      }

      this.post("/user_login/change_passwd", this.model).then(res => {
        this.changePasswdDialogFlag = false;
        this.alert(res);
      });
    }
  }
};
</script>