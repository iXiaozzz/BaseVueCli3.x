// import request from "@/utils/request"
import request from "./request";
const test = "http://192.168.1.50:8089/api";
const baseUrl = process.env.NODE_ENV === "development" ? test : "/api";
// const baseUrl = process.env.BASE_URL
export default {
  /**
   * 考试中心
   * 获取考试列表
   * @param customerId
   * @param pageNum
   * @param pageSize
   */
  requestTestList (params) {
    return request(
      baseUrl + "/test/getCustomerPaperByCustomerId",
      params,
      "get"
    );
  },
  test (params) {
    return request(baseUrl + "/v1/test/index", params);
  }
};
