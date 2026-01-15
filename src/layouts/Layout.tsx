// src/layouts/Layout.tsx
import React, { useState, useEffect, type JSX } from "react";
import { useSelector } from "react-redux"
// import { useLocation } from "react-router-dom";
import moment from "moment";
import _ from "lodash";
import { ConfigProvider, Layout as AntdLayout, App, Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import zhTW from 'antd/es/locale/zh_TW';

import type { RootState } from "@/store";
import type { LayoutProps } from "@/types/route";
import { setSagaMessage } from '@/utils/message';
import "./Layout.scss";

const { Header, Content, Footer } = AntdLayout;
const { Text } = Typography;

const MessageBridge = (): null => {
  const { message } = App.useApp();
  setSagaMessage(message);
  return null;
};

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps): JSX.Element => {
  // const location = useLocation();
  // const dispatch = useDispatch();
  const { 
    IsMobile, 
    IsLoading: isLoading, 
    IsError: isError 
  } = useSelector((state: RootState): RootState["global"] => state.global);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    console.log(isLoading);
    if (isLoading) {
      timer = setTimeout((): void => setActive(true), 0);
    }else {
      timer = setTimeout((): void => setActive(false), 800);
    }
    return (): void => {
      if(timer) clearTimeout(timer);
    };
  }, [isLoading]);
  
  const barClass = ["top-progress-bar", isLoading ? "loading" : "", active ? "finished" : "", isError ? "error" : ""].filter(Boolean).join(" ");

  return (
    <div id="Layout" className="Layout">
      <ConfigProvider
        theme={{
          token: { /* colorPrimary: '#25b864' */ },
          components: { Layout: { colorBgLayout: '#f0f0f0', headerBg: '#fff' } },
        }}
        locale={zhTW}
      >
        <App>
          <MessageBridge />
          <AntdLayout>
            <Header className={IsMobile ? "is-mobile" : ""}>
              <Text className="fs-32 fw-500 font-primary">儀錶板</Text>
              <div className={barClass} />
            </Header>
            <Content>
              <Spin spinning={isLoading} delay={300} indicator={<LoadingOutlined spin />} tip="正在處理中..." size="large">
                {children}
              </Spin>
            </Content>
            <Footer>
              <span>Copyright © {moment().format("YYYY")}</span>
            </Footer>
          </AntdLayout>
        </App>
      </ConfigProvider>
    </div>
  );
};

export default Layout;
