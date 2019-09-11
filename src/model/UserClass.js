import Api from '@/api/index'
export default class UserClass {
  constructor(userInfo = { name: "", age: 0, intro: "" }) {
    this.name = userInfo.name;
    this.age = userInfo.age;
    this.intro = userInfo.intro;
  }
  init () {
    console.log(init)
  }
  add (userInfo) {
    console.log(userInfo)
    return true
  }
  update (id, userInfo) {
    console.log(userInfo)
  }
  delete () { }
  query () { }
  login (userInfo) {
    return Api.login(userInfo)
  }
}