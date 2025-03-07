import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";

interface PostListProps {
  hasNavigation?: boolean;
}

interface PostProps {
  id: string;
  email: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
}

type TabType = "all" | "my";

export default function PostList({ hasNavigation = true }: PostListProps) {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [posts, setPosts] = useState<PostProps[]>([]);

  const getPosts = async () => {
    const datas = await getDocs(collection(db, "posts"));

    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "post__navigation--active" : ""}
          >
            전체 글
          </div>
          <div
            onClick={() => setActiveTab("my")}
            className={activeTab === "my" ? "post__navigation--active" : ""}
          >
            나의 글
          </div>
        </div>
      )}
      <div className="post__list">
        {posts?.length > 0
          ? posts?.map((post, index) => (
              <div key={post?.id} className="post__box">
                <Link to={`/posts/${post?.id}`}>
                  <div className="post__profile-box">
                    <div className="post__profile" />
                    <div className="post__author-name">{post?.email}</div>
                    <div className="post__date">{post?.createdAt}</div>
                  </div>
                  <div className="post__title">{post?.title}</div>
                  <div className="post__text">{post?.content}</div>
                </Link>
                {post?.email === user?.email && (
                  <div className="post__utils-box">
                    <div className="post__delete">삭제</div>
                    <Link to={`/posts/edit/${post?.id}`} className="post__edit">
                      수정
                    </Link>
                  </div>
                )}
              </div>
            ))
          : <div className="post__no-post">게시글이 없습니다.</div>}
      </div>
    </>
  );
}
