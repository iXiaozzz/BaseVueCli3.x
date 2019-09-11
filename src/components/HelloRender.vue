<script>
export default {
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },
  render(createElement) {
    return createElement("h" + this.level, this.$slots.default);
  },
  computed: {},
  created() {
    // console.log("Hello world!");
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped></style>
