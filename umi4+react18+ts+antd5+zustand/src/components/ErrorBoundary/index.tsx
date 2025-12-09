import { Button, Result } from 'antd';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    // TODO: 上报错误到监控平台
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleBack = () => {
    window.history.back();
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <Result
          status="error"
          title="页面出错了"
          subTitle={
            process.env.UMI_ENV === 'dev'
              ? error?.message
              : '抱歉，页面发生了一些错误，请稍后重试'
          }
          extra={[
            <Button key="back" onClick={this.handleBack}>
              返回上页
            </Button>,
            <Button key="reload" type="primary" onClick={this.handleReload}>
              刷新页面
            </Button>
          ]}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
