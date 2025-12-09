import { message } from 'antd';
import { useState } from 'react';

interface UseDownloadOptions {
  /** 下载成功提示 */
  successMsg?: string;
  /** 下载失败提示 */
  errorMsg?: string;
}

/**
 * 通用下载 Hook
 * @param service 下载请求函数，返回 Promise<Blob>
 * @param options 配置项
 */
export const useDownload = (
  service: (params?: any) => Promise<any>,
  options: UseDownloadOptions = {}
) => {
  const [loading, setLoading] = useState(false);

  const download = async (params?: any, filename?: string) => {
    setLoading(true);
    try {
      const response = await service(params);
      
      // 处理 Blob
      const blob = new Blob([response]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // 如果传入了文件名则使用，否则尝试从响应头获取（这里简化处理，假设后端不返回文件名头）
      if (filename) {
        link.download = filename;
      } else {
        link.download = `download-${Date.now()}.xlsx`;
      }
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      if (options.successMsg) {
        message.success(options.successMsg);
      }
    } catch (error) {
      console.error('Download failed:', error);
      message.error(options.errorMsg || '下载失败');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    download
  };
};
