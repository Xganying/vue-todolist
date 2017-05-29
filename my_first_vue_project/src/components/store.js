/**
 * Created by xieganying on 17-5-29.
 */

//存储模块：使用localstorage存储数据

const STORAGE_KEY = 'todos-vue.js'
export default {
  fetch(){
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  save(items){
    window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
  }
}
