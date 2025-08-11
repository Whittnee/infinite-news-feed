import { useEffect, type FC } from "react";
import { App as AntApp, Layout, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { PostsList } from "@/features/posts-list";

const App: FC = () => {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };

    setVh();
  }, []);

  return (
    <AntApp>
      <Layout style={{ minHeight: "100dvh" }}>
        <Header style={{ color: "white", fontWeight: 600, fontSize: 18 }}>
          Infinite News Feed
        </Header>
        <Content style={{ padding: 24, maxWidth: 960, margin: "0 auto" }}>
          <Typography.Paragraph type="secondary" style={{ marginTop: 12 }}>
            Бесконечная лента по 10 постов. Источник: dummyjson.com
          </Typography.Paragraph>
          <PostsList />
        </Content>
      </Layout>
    </AntApp>
  );
};

export default App;
