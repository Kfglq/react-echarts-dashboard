// src/utils/request.js
import axios, { 
  type AxiosInstance, 
  type AxiosRequestConfig, 
  type AxiosResponse, 
  type Method 
} from "axios";
import _ from "lodash";
import config from "@/config";

const ax: AxiosInstance = axios.create({
  baseURL: config.api,
});

function responseData<T>(res: AxiosResponse<T>): T {
  return res.data;
}

function checkStatus<T>(res: AxiosResponse<T>): AxiosResponse<T> {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }

  const error = new Error(res.statusText);
  throw error;
}

async function call<T = unknown, D = unknown>(
  _path: string,
  _method: string,
  _params: D = {} as D,
  _extendOption: AxiosRequestConfig = {}
): Promise<T> {
  const upperMethod = _.toUpper(_method);

  const option: AxiosRequestConfig = {
    url: _path,
    method: upperMethod as Method,
    timeout: _extendOption.timeout ?? 60000,
  };

  switch (upperMethod) {
    case "PUT":
    case "POST":
    case "PATCH":
      option.data = _params;
      break;
    case "GET":
    case "DELETE":
      option.params = _params;
      break;
    default:
      break;
  }

  const finalOption = {
    ...option,
    ..._extendOption,
  };

  const response = await ax.request<T>(finalOption);
  const checkedResponse = checkStatus(response);
  return responseData(checkedResponse);
}

function generateShortCutMethod(_method: Method) {
  return async <T = unknown, D = unknown>(
    _path: string, 
    _params: D = {} as D, 
    _extendOption: AxiosRequestConfig = {}
  ): Promise<T> => {
    return await call<T, D>(_path, _method, _params, _extendOption);
  };
}

// 匯出強型別的請求工具
const request = {
  call,
  get: generateShortCutMethod("GET"),
  post: generateShortCutMethod("POST"),
  put: generateShortCutMethod("PUT"),
  patch: generateShortCutMethod("PATCH"),
  delete: generateShortCutMethod("DELETE"),
};

export default request;
