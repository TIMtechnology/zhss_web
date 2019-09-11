import Vue from 'vue'
import {getuserlist} from '@/api/useradmin'

const useradmin ={

    state: {
        userlist: []
      },

      mutations: {
        SET_USERLIST: (state, userlist) => {
          state.userlist = userlist
        },
       
      },
      actions: {
        // 登录
        GetUserList ({ commit }, data) {
          return new Promise((resolve, reject) => {
            getuserlist(data).then(response => {
              const result = response
              console.log(result)        
              commit('SET_USERLIST', result)
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        },
    
 
      
      }

}


export default useradmin
