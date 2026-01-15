// src/utils/message.js
import { message as staticMessage } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import _ from "lodash";

interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

let messageInstance: MessageInstance = staticMessage;

export const setSagaMessage = (instance: MessageInstance): void => {
  messageInstance = instance;
};

export const showMessage = {
  success: (msg: string): void => void messageInstance.success(msg),
  error: (error: unknown): boolean => {
    const err = error as ApiError;
    const status: number | undefined = err.response?.status;
    const errorMsg: string = 
      err.response?.data?.message ??
      err.message ??
      "系統發生未知錯誤";

    if (status === 401) {
      void messageInstance.error({
        content: "登入時效已過，請重新登入",
        duration: 3,
      });
      return true;
    }

    void messageInstance.error({
      content: errorMsg,
      duration: 4,
    });
    return false;
  }
};