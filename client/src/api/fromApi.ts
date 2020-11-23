import { HTTP_METHODS } from "../globals";
import { createApiRequest } from "./axios";

class ApiCallCreator {
  login(email: string, password: string) {
    return createApiRequest(`/auth/login`, HTTP_METHODS.POST, {
      email,
      password,
    });
  }
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    return createApiRequest(`/auth/signup`, HTTP_METHODS.POST, {
      firstName,
      lastName,
      email,
      password,
    });
  }
  googleAuth() {
    return createApiRequest(`/auth/google`, HTTP_METHODS.GET, {});
  }
  getProducts() {
    return createApiRequest("/products", HTTP_METHODS.GET, {});
  }
  getProductDetails(id: string) {
    return createApiRequest(`/products/${id}`, HTTP_METHODS.GET, {});
  }
}

const fromApi = new ApiCallCreator();
export default fromApi;
