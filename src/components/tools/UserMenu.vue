<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a href="https://pro.loacg.com/docs/getting-started" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a>
      <notice-icon class="action" />
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar" />
          <span>{{ nickname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user" />
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting" />
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="setting" />
              <span>单位列表</span>
            </span>
            <a-menu-item v-for="dw in dwlist">
              <a href="javascript:;" @click="changeToDw(dw.Auth_DW_id)">
                <a-icon type="logout" />
                <span>{{dw.Auth_DW_name}}</span>
              </a>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-divider />
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <lang-select />
    </div>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'
import LangSelect from '@/components/tools/LangSelect'

export default {
  name: 'UserMenu',
  data() {
    return {
      dwlist: []
    }
  },
  components: {
    LangSelect,
    NoticeIcon
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },
  methods: {
    ...mapActions(['Logout']),
    handleLogout() {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout({})
            .then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 16)
            })
            .catch(err => {
              this.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    },
    changeToDw(e) {
      console.log(e)
      //进行更新当前单位 且 重载界面
      localStorage.setItem('Auth_DW_id', e)
      this.$router.go(0)
    }
  },
  mounted() {
    this.dwlist = JSON.parse(localStorage.getItem('DWList'))
  }
}
</script>
