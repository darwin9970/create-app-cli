import { App } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';
import type { ModalStaticFunctions } from 'antd/es/modal/confirm';
import type { NotificationInstance } from 'antd/es/notification/interface';

type ModalInstance = Omit<ModalStaticFunctions, 'warn'>;

/**
 * 全局静态方法实例
 */
let messageInstance: MessageInstance;
let notificationInstance: NotificationInstance;
let modalInstance: ModalInstance;

/**
 * 静态方法 Holder 组件
 * 在 App 组件内部使用，用于获取静态方法实例
 */
export const AntdStaticHolder = () => {
  const staticFunctions = App.useApp();
  messageInstance = staticFunctions.message;
  notificationInstance = staticFunctions.notification;
  modalInstance = staticFunctions.modal;
  return null;
};

/**
 * 全局 message - 可直接使用 message.success() 等方法
 * 用于非 React 组件中（如 request.ts）
 */
export const message: MessageInstance = new Proxy({} as MessageInstance, {
  get(_, prop) {
    return messageInstance?.[prop as keyof MessageInstance];
  }
});

/**
 * 全局 notification
 */
export const notification: NotificationInstance = new Proxy(
  {} as NotificationInstance,
  {
    get(_, prop) {
      return notificationInstance?.[prop as keyof NotificationInstance];
    }
  }
);

/**
 * 全局 modal
 */
export const modal: ModalInstance = new Proxy({} as ModalInstance, {
  get(_, prop) {
    return modalInstance?.[prop as keyof ModalInstance];
  }
});

/**
 * React 组件内使用的 Hook
 */
export const useAntdApp = App.useApp;
