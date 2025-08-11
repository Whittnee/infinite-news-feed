import { fetchPostsThunk } from "@/entities/posts/model/postsSlice";
import { useDispatch, useSelector } from "@/entities/store";
import {
  Card,
  Empty,
  List,
  Skeleton,
  Space,
  Tag,
  Typography,
  App as AntApp,
} from "antd";
import { useEffect, useRef, type FC } from "react";
import styles from "./styles.module.scss";

export const PostsList: FC = () => {
  const dispatch = useDispatch();
  const { message } = AntApp.useApp();
  const { items, skip, hasMore, status, error } = useSelector((s) => s.posts);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchPostsThunk(0));
  }, [dispatch, items]);

  useEffect(() => {
    if (error) message.error(error);
  }, [error, message]);

  useEffect(() => {
    if (!hasMore) return;

    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && status !== "loading") {
          dispatch(fetchPostsThunk(skip));
        }
      },
      { rootMargin: "256px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [skip, hasMore, status, dispatch]);

  if (!items.length && status === "succeeded" && !hasMore) {
    return <Empty description="Нет данных" />;
  }

  return (
    <>
      <List
        itemLayout="vertical"
        dataSource={items}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card hoverable>
              <Space direction="vertical" size={8} style={{ width: "100%" }}>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {item.title}
                </Typography.Title>
                <Typography.Paragraph className={styles.clamp}>
                  {item.body}
                </Typography.Paragraph>
                <Space wrap>
                  {item.tags?.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </Space>
                <Typography.Text type="secondary">
                  Реакции:{" "}
                  {typeof item.reactions === "number"
                    ? item.reactions
                    : item.reactions?.likes ?? 0}
                </Typography.Text>
              </Space>
            </Card>
          </List.Item>
        )}
      />

      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}

      {status === "loading" && (
        <div style={{ paddingTop: 12 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} style={{ marginBottom: 12 }}>
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          ))}
        </div>
      )}
    </>
  );
};
