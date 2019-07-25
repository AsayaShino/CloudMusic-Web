<template>
  <div class="login">
    <span class="title">登录</span>
    <Form :model="formItem" :rules="ruleValidate" :label-width="80" style="margin-top: 50px;">
      <FormItem prop="phone" label="手机号：">
        <Input v-model="formItem.phone" />
      </FormItem>
      <FormItem prop="password" label="密码：">
        <Input v-model="formItem.password" type="password" />
      </FormItem>
      <FormItem style="text-align: left !important;">
        <Button class="submit" type="primary" @click="submit()">确定 ㄟ(≧◇≦)ㄏ</Button>
        <Button class="cancel" @click="cancel()">取消 ( ´•︵•` )</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      formItem: {
        phone: "",
        password: ""
      },
      ruleValidate: {
        phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      if (
        this.formItem.phone.length != 0 &&
        this.formItem.password.length != 0
      ) {
        var _this = this;
        this.get("/login/cellphone", {
          phone: _this.formItem.phone,
          password: _this.formItem.password
        }).then(function(res) {
          _this.commit("is_login", true);
          _this.commit("login_window", false);
        });
      }
    },
    cancel() {
      this.commit("login_window", false);
    }
  }
};
</script>

<style scoped>
.login {
  width: 500px;
  height: 400px;
  border: 1px solid #eee;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 50px;
}
.title {
  display: block;
  font-size: 25px;
  margin-top: 10px;
}
.submit {
  margin-left: -10px;
  margin-top: 20px;
}
.cancel {
  margin-top: 20px;
  margin-left: 20px;
}
</style>
