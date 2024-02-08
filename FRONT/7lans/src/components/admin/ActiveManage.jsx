import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getEnv from "../../utils/getEnv";
import axios from "axios";
import NormalNav from "../navs/NormalNav";
import styled from "styled-components";

const Board = styled.div`
  display: flex;
  margin-top: 100px;
`;

const ActiveManage = () => {
  // 게시물 목록을 담을 상태
  const [posts, setPosts] = useState([]);
  const urlInfo = getEnv("API_URL");
  const userInfo = useSelector((state) => state.user);
  const centerId = userInfo.value.centerId;

  // 게시물 목록을 서버에서 가져오는 함수
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${urlInfo}/activityLog/manager/disapprovedList/${centerId}`
      );
      console.log(response.data, "ActiveManage 활동일지리스트");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 게시물 목록을 가져옴
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <NormalNav />
      <Board>
        <h1>게시판</h1>
        {/* 게시물 목록을 표시 */}
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>작성자: {post.author}</p>
          </div>
        ))}
      </Board>
    </>
  );
};

export default ActiveManage;
