<template>
  <div class="about">
    <h1>This is an about page</h1>
    <hello-render :level="level">hello render.</hello-render>
  </div>
</template>
<script>
import HelloRender from "@/components/HelloRender";
import UserClass from "@/model/UserClass";
import Api from "@/api/"
export default {
  components: {
    HelloRender
  },
  data () {
    return {
      level: 2,
      queryForm: {
        customerId: "20340",
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  created () {
    Api.requestTestList(this.queryForm).then(res => {
      console.log(res)
    })
    this.$store.dispatch('updateTest', 'hello world')
    console.log(this.$store.getters.test)
  },
  mounted () {
    let userInfo = {
      name: "iXiaozzz",
      age: 23,
      intro: "this is great man."
    };
    let user = new UserClass(userInfo)

    let number = this.getFBN(3)

    let test = this.geneation()
    let res = test.next()
  },
  methods: {
    getFBN (n) {
      let arr = [1, 1];
      if (n < 3) {
        return arr[n - 1];
      }
      for (let i = 2; i < n; i++) {
        arr[i] = arr[i - 2] + arr[i - 1];
      }
      return arr[n - 1];
    },

    getDiGui (n) {
      if (n < 3) {
        return 1
      } else {
        return this.getDiGui(n - 2) + this.getDiGui(n - 1)
      }
    },

    * geneation () {
      yield 'hello'
      yield 'world'
      return 'ending'
    }

  }
};
</script>
