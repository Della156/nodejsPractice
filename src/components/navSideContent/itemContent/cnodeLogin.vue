<template>
  <div class="loginWrp">
    <!-- 登录面板 -->
    <div class="loginCard loginCard-response">
      <!-- 登录面板关闭按钮 -->
      <div @click="closeLoginCard" class="close">×</div>
      <!-- 登录面板头部选项卡 -->
      <div class="loginCardTitle">
        <div
          @click="loginTab"
          :class="['titleCell', { titleCellActive: loginTabActive }]"
        >
          登录
        </div>
        <b class="titlePoint">·</b>
        <div
          @click="registerTab"
          :class="['titleCell', { titleCellActive: registerTabActive }]"
        >
          注册
        </div>
      </div>
      <!-- 注册or登录面板头部选项卡对应的内容区 -->
      <div class="loginCardBody">
        <!-- 登录内容区 -->
        <div v-show="loginTabActive">
          请输入你的昵称<br />
          <input
            placeholder="name"
            class="identityInfo"
            v-model.trim="userInfo.loginname"
            type="text"
          />
          <br />
          <br />
          请输入你的密码<br />
          <input
            placeholder="password"
            class="identityInfo"
            v-model.trim="userInfo.password"
            type="password"
          />
          <div class="rememberToken">
            <input type="checkbox" id="rememberToken" v-model="storeToekn" />
            <label for="rememberToken">十天免登陆</label>
          </div>
          <!-- 登录提交按钮 -->
          <button
            :disabled="loading"
            @click="userLogin"
            class="submitIdentifyInfo"
          >
            <span v-if="!loading">检测认证信息</span>
            <span v-if="loading"
              ><span class="fa fa-spinner fa-spin"></span>
              正在登录，请稍候…</span
            >
          </button>
        </div>
        <!-- 注册内容区 -->
        <div v-show="registerTabActive">
          请输入你的昵称<br />
          <input
            placeholder="name"
            class="identityInfo"
            v-model.trim="userInfo.loginname"
            type="text"
          />
          <br />
          <br />
          请输入你的密码<br />
          <input
            placeholder="password"
            class="identityInfo"
            v-model.trim="userInfo.password"
            type="password"
          />
          <br />
          <br />
          请选择头像
          <div class="imgAddress">
            <span v-for="(img, index) in imgArr">
              <img :src="img" :alt="index" @click="handleImg(img,index)">
            </span>
          </div>
          <!-- 注册提交按钮 -->
          <button
            :disabled="loading"
            @click="userRegister"
            class="submitIdentifyInfo"
          >
            <span v-if="!loading">注册</span>
            <span v-if="loading"
              ><span class="fa fa-spinner fa-spin"></span>
              正在注册，请稍候…</span
            >
          </button>
        </div>
      </div>
    </div>
    <!-- 登录面板底部遮罩层 -->
    <div @click="closeLoginCard" class="loginCardMask"></div>
  </div>
</template>

<script>
export default {
  data() {
    const imgUrl = 'https://s2.ax1x.com/2019/08/12/'
    return {
      loginTabActive: true,
      registerTabActive: false,
      userInfo: {
        loginname: "",
        password: "",
        avatar_url: "",
      },
      loading: false,
      storeToekn: false,
      imgArr: [
        imgUrl+'ex55xH.jpg',
        imgUrl+'ex5oMd.jpg',
        imgUrl+'ezyFbD.jpg',
        imgUrl+'ezyiDO.jpg',
        imgUrl+'ezy9v6.jpg',
        imgUrl+'ezypgx.jpg',
        imgUrl+'exyvnO.jpg',
        imgUrl+'exyXjK.jpg',
        imgUrl+'exyOc6.jpg',
        imgUrl+'ex4A00.jpg',
        imgUrl+'ex4kmq.jpg',
        imgUrl+'ex5fPO.jpg',
        imgUrl+'ex5hGD.jpg',
        imgUrl+'ex54Re.jpg',
        imgUrl+'ezyS81.jpg',
        imgUrl+'ezyAVe.jpg',
        imgUrl+'ezyV5d.jpg',
        imgUrl+'ezyePA.jpg',
        imgUrl+'ezym8I.jpg',
        imgUrl+'ezyn2t.jpg',
        imgUrl+'ezyMKf.jpg',
        imgUrl+'ezyQr8.jpg',
        imgUrl+'ezylqS.jpg',
        imgUrl+'ezy3Vg.jpg',
        imgUrl+'ezy8aQ.jpg',
        imgUrl+'ezyG5j.jpg',
        imgUrl+'ezyYPs.jpg',
        imgUrl+'ezytGn.jpg',
        imgUrl+'ezyN2q.jpg',
        imgUrl+'ezyUx0.jpg',
        imgUrl+'ezclNQ.jpg',
        imgUrl+'ezcQAg.jpg',
        imgUrl+'ezc1hj.jpg',
        imgUrl+'ez5tTx.jpg',
        imgUrl+'ez5Y01.jpg',
        imgUrl+'ez5JmR.jpg'
      ],
      beforeIndex: 88,
    };
  },
  methods: {
    loginTab() {
      // 重置
      // this.userInfo = { loginname: "", password: "" };
      this.registerTabActive = false;
      this.loginTabActive = true;
    },
    registerTab() {
      // 重置
      // this.userInfo = { loginname: "", password: "", avatar_url: "" };
      this.loginTabActive = false;
      this.registerTabActive = true;
    },
    closeLoginCard() {
      this.$store.commit("openLoginCard", false);
    },
    userRegister() {
      const { loginname, password, avatar_url } = this.userInfo;
      if (!loginname || !password || !avatar_url) {
        alert("还有信息没有填哦");
      } else {
        this.loading = true;
        sessionStorage["isAutoLogin"] = "false";
        this.$root.$children[0].verifyRegister(this.userInfo);
      }
    },
    userLogin() {
      const { loginname, password } = this.userInfo;
      if (!loginname || !password) {
        alert("还有信息没有填哦");
      } else {
        this.loading = true;
        sessionStorage["isAutoLogin"] = "false";
        this.$root.$children[0].verifyLogin(this.userInfo);
      }
    },
    handleImg(url, index) {
      const oldIndex = this.beforeIndex
      if(this.userInfo.avatar_url && oldIndex === index) {
        document.getElementsByTagName('img')[oldIndex].classList.remove('img-border')
        this.userInfo.avatar_url = ""
        return
      } else if (this.userInfo.avatar_url) {
        document.getElementsByTagName('img')[oldIndex].classList.remove('img-border')
      }
      document.getElementsByTagName('img')[index].classList.add('img-border')
      this.userInfo.avatar_url = url
      this.beforeIndex = index
    }
  },
  computed: {
    loginStatus() {
      return this.$store.state.loginStatus;
    }
  },
  watch: {
    loginStatus() {
      if (this.loginStatus && sessionStorage["isAutoLogin"] === "false") {
        alert("认证成功，欢迎" + this.$store.state.loginUsername);
        this.loading = false;
        this.$store.commit("openLoginCard", false);
      }
    }
  }
};
</script>

<style scoped>
.loginWrp {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  text-align: center;
  z-index: 290;
  user-select: none;
}

/* 登录面板样式 */
.loginWrp .loginCard {
  background: #fff;
  position: absolute;
  z-index: 1;
}

/* 登录面板底部遮罩层样式 */
.loginWrp .loginCardMask {
  width: 100%;
  height: 100%;
  background: #ccc;
  opacity: 0.5;
}

/* 登录面板关闭按钮样式 */
.loginWrp .loginCard .close {
  height: 4rem;
  width: 4rem;
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 4rem;
  color: #ddd;
  cursor: pointer;
}

/* 登录面板头部选项卡样式 */
.loginWrp .loginCard .loginCardTitle {
  width: 200px;
  height: 50px;
  margin: 0 auto;
}
.loginWrp .loginCard .loginCardTitle .titleCell {
  width: 80px;
  height: 45px;
  line-height: 45px;
  border-bottom: 5px solid #fff;
  font-size: 1.2rem;
  cursor: pointer;
  float: left;
}
.loginWrp .loginCard .loginCardTitle .titleCell.titleCellActive {
  border-bottom: 5px solid #c60023;
  font-weight: bold;
  color: #c60023;
}
.loginWrp .loginCard .loginCardTitle .titlePoint {
  width: 40px;
  height: 45px;
  line-height: 45px;
  float: left;
}

/* 登录面板头部选项卡对应的内容区域样式 */
.loginWrp .loginCard .loginCardBody {
  margin-top: 30px;
}
.loginWrp .loginCard .loginCardBody .identityInfo {
  width: 100%;
  height: 30px;
  margin-top: 10px;
  border: 1px solid #999;
  border-radius: 3px;
  font-size: 1.2rem;
  text-align: center;
}
.loginWrp .loginCard .loginCardBody .loginTips {
  margin-top: 5px;
  color: #777;
  float: left;
  cursor: pointer;
}
.loginWrp .loginCard .loginCardBody .rememberToken {
  margin-top: 5px;
  float: right;
}
.loginWrp .loginCard .loginCardBody .submitIdentifyInfo {
  width: 100%;
  height: 35px;
  margin-top: 10px;
  border: none;
  border-radius: 3px;
  background: #c60023;
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
}

.loginWrp .loginCard .loginCardBody .imgAddress {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: 120px;
  overflow-y: auto;
  width: 100%;
}

.loginWrp .loginCard .loginCardBody .imgAddress img {
  width: 64px;
  height: 64px;
}

.img-border {
  border: 5px solid #0a0c0a;
}

/* 响应式样式 */
@media only screen and (max-width: 900px) {
  /* 登录面板响应式样式 */
  .loginWrp .loginCard.loginCard-response {
    padding: 50px 30px 0px 30px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
}
@media only screen and (min-width: 900px) {
  /* 登录面板响应式样式 */
  .loginWrp .loginCard.loginCard-response {
    width: 300px;
    height: 400px;
    padding: 50px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px #333;
    margin-left: -200px;
    margin-top: -250px;
    left: 50%;
    top: 50%;
  }
  /* 登录面板关闭按钮hover样式 */
  .loginWrp .loginCard .close:hover {
    color: #c60023;
  }
  /* 登录面板头部选项卡hover样式 */
  .loginWrp .loginCard .loginCardTitle .titleCell:hover {
    font-weight: bold;
    color: #c60023;
  }
  /* 登录输入框下方tips的hover样式 */
  .loginWrp .loginCard .loginCardBody .loginTips:hover {
    color: #000;
    text-decoration: underline;
  }
}
</style>
