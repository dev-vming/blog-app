import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType;
}

export interface PostProps {
  id?: string;
  email: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  uid?: string;
}

type TabType = "all" | "my";

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const [posts, setPosts] = useState<PostProps[]>([]);

  const getPosts = async () => {
    setPosts([]);
    const postsRef = collection(db, "posts");
    let postsQuery;

    if (activeTab === "my" && user) {
      postsQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
    } else {
      postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    }
    const datas = await getDocs(postsQuery);
    datas?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");
    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));
      toast.success("게시글을 삭제했습니다.");
      getPosts(); // 변경된 포스트 리스트를 다시 가져옴
    }
  };

  useEffect(() => {
    getPosts();
  }, [activeTab]);

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
        {posts?.length > 0 ? (
          posts?.map((post, index) => (
            <div key={post?.id} className="post__box">
              <Link to={`/posts/${post?.id}`}>
                <div className="post__profile-box">
                  <div className="post__profile" />
                  <div className="post__author-name">{post?.email}</div>
                  <div className="post__date">{post?.createdAt}</div>
                </div>
                <div className="post__title">{post?.title}</div>
                <div className="post__text">{post?.summary}</div>
              </Link>
              {post?.email === user?.email && (
                <div className="post__utils-box">
                  <div
                    className="post__delete"
                    onClick={() => handleDelete(post.id as string)}
                  >
                    삭제
                  </div>
                  <div className="post__edit">
                    <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
