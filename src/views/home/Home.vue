<template>
  <el-container id="home">
    <!-- 头部区域 -->
    <el-header
      ><div class="left">
        <img src="~assets/img/home/system.png" alt="" />
        <span>电商后台管理系统 </span>
      </div>
      <el-button type="info" @click="handleSignOut">退出</el-button>
    </el-header>

    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isFolid ? '64px' : '200px'">
        <div class="fold" @click="handleAsideFolid">|||</div>
        <el-menu
          text-color="#fff"
          active-text-color="#3a78c0"
          background-color="#323744"
          unique-opened
          :collapse="isFolid"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-submenu
            :index="String(item.id)"
            v-for="(item, index) in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconList[index]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="`/${iten.path}`"
              v-for="(iten, indey) in item.children"
              :key="iten.id"
              @click="handleSkipPage(`/${iten.path}`)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ iten.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体区域 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenus } from "network/home";
export default {
  data() {
    return {
      menuList: [],
      iconList: [
        "iconfont icon-lunkuohua2_yonghu",
        "iconfont icon-quanxian",
        "iconfont icon-shangpin",
        "iconfont icon-dingdan-",
        "iconfont icon-data",
      ],
      isFolid: false,
      activePath: "",
    };
  },
  created() {
    this.getMenus();
    this.activePath = sessionStorage.getItem("activePath")
      ? sessionStorage.getItem("activePath")
      : "/users";
  },
  methods: {
    getMenus() {
      getMenus().then((res) => {
        res.meta.status === 200
          ? (this.menuList = res.data)
          : this.$message.error(res.meta.msg);
      });
    },
    handleSignOut() {
      this.$router.push("/login");

      sessionStorage.clear();
    },
    handleAsideFolid() {
      this.isFolid = !this.isFolid;
    },
    handleSkipPage(path) {
      sessionStorage.setItem("activePath", path);
      this.activePath = path;
    },
  },
};
</script>
<style lang="less" scoped>
@import url("assets/css/mixin");
#home {
  height: 100%;
  .el-header {
    .set-flex();
    padding-left: 0;
    background-color: #373c41;
    color: #fff;
    .left {
      img {
        width: 50px;
        border-radius: 50%;
        margin-right: 10px;
        background-color: #373c41;
        opacity: 0.6;
        vertical-align: middle;
      }
    }
  }
  .el-aside {
    background-color: #323744;
    .el-menu {
      border-right: 0;
    }
    .fold {
      text-align: center;
      line-height: 24px;
      background-color: #465164;
      color: #fff;
      cursor: pointer;
    }
  }
  .el-main {
    background-color: #eaedf2;
  }
  .iconfont {
    margin-right: 10px;
  }
}
</style>