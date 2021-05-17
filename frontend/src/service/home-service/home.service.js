import http from "../http-common";

class HomeService {
  getAll() {
    return http.get("/tests");
  }

  /*get(id) {
    return http.get(`/tests/${id}`);
  }

  create(data) {
    return http.post("/tests", data);
  }

  update(id, data) {
    return http.put(`/tests/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tests/${id}`);
  }

  deleteAll() {
    return http.delete(`/tests`);
  }

  findByTitle(title) {
    return http.get(`/tests?title=${title}`);
  }*/
}

export default new HomeService();