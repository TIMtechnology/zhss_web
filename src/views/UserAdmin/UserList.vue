<template>
  <a-table :columns="columns" :dataSource="data" class="components-table-demo-nested">
    <a slot="operation" slot-scope="text" href="javascript:;">Publish</a>
    <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
      <a-row :gutter="24" :style="{ marginBottom: '12px' }">
        <a-col
          :span="24"
          v-for="(auth, index) in record.list"
          :key="index"
          :style="{ marginBottom: '12px' }"
        >
          <a-col span="8">
            <span>{{ auth.Auth_GN_name }}</span>
          </a-col>

          <a-col span="8">
            <span>{{ auth.Auth_JS_name }}</span>
          </a-col>
        <a-col span="8">
           
            <a @click="handleEdit(auth,index)">编辑</a>
          
        </a-col>
          <a-divider />
        </a-col>
      </a-row>
    </div>
  </a-table>
</template>

<script>
import { mapActions } from 'vuex'
import { getuserlist } from '../../api/useradmin'
const columns = [
  { title: 'key', dataIndex: 'key', key: 'key' },
  { title: '单位名称', dataIndex: 'Auth_DW_name', key: 'dwname' },
  { title: '用户名称', dataIndex: 'Auth_User_name', key: 'name' },
  { title: '用户账号', dataIndex: 'Auth_User_num', key: 'usernum' },
  { title: 'Action', key: 'operation', scopedSlots: { customRender: 'operation' } }
]

const data = []

const innerColumns = [
  { title: 'key', dataIndex: 'key', key: 'key' },
  { title: '功能', dataIndex: 'Auth_GN_name', key: 'GNname' },
  { title: '角色', dataIndex: 'Auth_JS_name', key: 'JSname' },
  {
    title: 'Action',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

const innerData = []

export default {
  data() {
    return {
      data,
      columns,
      innerColumns,
      innerData
    }
  },

  methods: {
    getList() {
      var a = getuserlist()
      console.log(
        a
          .then(res => {
            console.log(res)
            //写入到基础data中
            this.data = res.d
          })
          .finally(() => {
            console.log('交互完成')
          })
      )
    },
    handleEdit(e){
        console.log(e.key)
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style>
</style>
