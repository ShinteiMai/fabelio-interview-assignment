import { HTTP_METHODS } from "../globals";
import { createApiRequest } from "./axios";

class ApiCallCreator {
  login() {}
  register() {}
  googleAuth() {}
  getProducts() {}
  getProductDetails() {}
}

const fromApi = new ApiCallCreator();
export default fromApi;
