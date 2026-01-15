// src/utils/storage.ts
import Cookies from "js-cookie";
import _ from "lodash";

type StorageAction = "get" | "set" | "remove";

interface CookiesStatic {
  get(name: string): string | undefined;
  set(name: string, value: string, options?: object): void;
  remove(name: string): void;
}

const CookiesTyped = Cookies as unknown as CookiesStatic;

export interface StorageData {
  user_info: string | null;
  token?: string;
}

const keyList: (keyof Omit<StorageData, 'token'>)[] = [
  "user_info"
];

const localstorageHandler = (action: StorageAction, data?: Partial<StorageData>): Partial<StorageData> | void => {
  const result: Partial<StorageData> = {};

  _.forEach(keyList, (key): void => {
    if (action === "get") {
      result[key] = localStorage.getItem(key);
    }
    
    if (action === "set" && data?.[key] != null) {
      const value = data[key];
      if (typeof value === 'string') {
        localStorage.setItem(key, value);
      }
    }
    
    if (action === "remove") {
      localStorage.removeItem(key);
    }
  });

  if (action === "get") {
    return result;
  }
};

// 獲取所有儲存資料
const getStorage = (): StorageData => {
  const result = localstorageHandler("get") as StorageData;
  result.token = CookiesTyped.get("token");
  return result;
};

// 設置所有儲存資料
const setStorage = (storage: Partial<StorageData>): void => {
  const { token } = storage;
  if (token) {
    // 設置 3 小時過期 (0.125 天)
    CookiesTyped.set("token", token, { expires: 0.125, sameSite: "Strict" });
  }
  localstorageHandler("set", storage);
};

// 設置單一項目
const setSingleStorage = (key: keyof StorageData, value: string): void => {
  localStorage.setItem(key, value);
};

// 刪除所有資料
const removeStorage = (): void => {
  CookiesTyped.remove("token");
  localstorageHandler("remove");
};

// 刪除單一項目
const removeSingleStorage = (key: keyof StorageData): void => {
  localStorage.removeItem(key);
};

export {
  getStorage,
  setStorage,
  setSingleStorage,
  removeStorage,
  removeSingleStorage,
};