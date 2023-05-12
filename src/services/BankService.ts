import http from "../common/http-common.ts"

class BankService {
  getAll(): Promise<any> {
    return http.get("/bank");
  }

  get(id: any): Promise<any> {
    return http.get(`/bank/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("/bank", data);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/bank/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/bank/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/bank`);
  }

  findByTitle(title: string): Promise<any> {
    return http.get(`/bank?title=${title}`);
  }
}

export default new BankService();
