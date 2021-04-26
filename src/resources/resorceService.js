import injector from "vue-inject";
import HttpRequest from "./http_request";

class ResorceService extends HttpRequest {
  getReportToday() {
    return this.get("/today");
  }
  getReportSum() {
    return this.get("/sum");
  }
}

injector.service("resorceService", ResorceService);
export default ResorceService;
