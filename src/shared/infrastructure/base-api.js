import axios from 'axios';

export class BaseApi {
  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_LEARNING_PLATFORM_API_URL || 'http://localhost:3000/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
