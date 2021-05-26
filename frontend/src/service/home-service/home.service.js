import http from "../http-common";

class HomeService {
  getAll() {
    return http.get("/tests");
  }
}

export default new HomeService();