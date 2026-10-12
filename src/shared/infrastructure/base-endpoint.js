export class BaseEndpoint {
  constructor(api, path) {
    this.api = api;
    this.path = path;
  }

  getAll() {
    return this.api.client.get(this.path);
  }

  getById(id) {
    return this.api.client.get(`${this.path}/${id}`);
  }

  create(resource) {
    return this.api.client.post(this.path, resource);
  }

  update(id, resource) {
    return this.api.client.put(`${this.path}/${id}`, resource);
  }

  delete(id) {
    return this.api.client.delete(`${this.path}/${id}`);
  }
}
