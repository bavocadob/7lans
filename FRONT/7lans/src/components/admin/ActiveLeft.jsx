import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import getEnv from "../../utils/getEnv";
import axios from "axios";
import styled from "styled-components";
import { adminSelectAcitve } from "../../store/adminSelectActiveSlice";
import { adminApproveBtn } from "../../store/adminApproveBtnSlice";

const LeftContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  border-right: solid 5px #edafb8;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const SearchBar = styled.input`
  width: 50%;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
  border-radius: 5px;
`;

const ActiveList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  overflow-y: auto;
  width: 100%;
  height: 100%;
`;

const PostContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 70%;
  cursor: pointer;

  &:hover {
    background-color: #cbf3f0;
  }

  &.selected {
    background-color: #2ec4b6;
  }
`;

const PostTitle = styled.h4`
  color: #333;
  margin-bottom: 5px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
`;

const InfoLabel = styled.p`
  color: #666;
  margin-right: 10px;
  margin-bottom: 5px;
`;

const InfoValue = styled.p`
  color: #333;
  margin-bottom: 5px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
`;

const ApproveButton = styled.button`
  background-color: #ff6b81;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
`;

const filterPosts = (posts, searchTerm) => {
  return posts.filter(
    (post) =>
      (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.volunteerName && post.volunteerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.childName && post.childName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (post.dateInfo && post.dateInfo.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};

const ActiveLeft = () => {
  const [posts, setPosts] = useState([]);
  const [approvePosts, setApprovePosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const isApproval = useSelector((state) => state.adminApproveBtn.value);
  const urlInfo = getEnv("API_URL");
  const userInfo = useSelector((state) => state.user);
  const centerId = userInfo.value.centerId;
  const dispatch = useDispatch();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `${urlInfo}/activityLog/manager/disapprovedList/${centerId}`
      );
      console.log(response.data, "ActiveManage 승인안된 활동일지리스트");
      setPosts(response.data);
    } catch (error) {
      console.error("Error ActiveLeft", error);
    }
  };

  const fetchApprovePosts = async () => {
    try {
      const response = await axios.get(
        `${urlInfo}/activityLog/manager/approvedList/${centerId}`
      );
      console.log(response.data, "ActiveManage 승인되어버린 활동일지리스트");
      setApprovePosts(response.data);
    } catch (error) {
      console.error("Error ActiveLeft", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchApprovePosts();
  }, []);

  const filteredPosts = filterPosts(posts, searchTerm);
  const filteredApprovePosts = filterPosts(approvePosts, searchTerm);

  const onClick = (activityId, relationId, index) => {
    dispatch(adminSelectAcitve({ activityId, relationId }));
    console.log(activityId, relationId, "ccccccc");
    setSelectedPostIndex(index); // 선택된 인덱스 업데이트
  };

  const toggleApprovalStatus = () => {
    dispatch(adminApproveBtn());
    console.log(isApproval); // 승인 상태를 토글
  };

  return (
    <>
      <LeftContainer>
        <Header>
          <Title>귀여운 게시판 🐱</Title>
          <ApproveButton onClick={toggleApprovalStatus}>
            {isApproval ? "승인완료" : "승인필요"}
          </ApproveButton>
        </Header>
        <SearchContainer>
          <SearchBar
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        {isApproval ? (
          <ActiveList>
            {filteredApprovePosts.length > 0 ? (
              filteredApprovePosts.map((post, index) => (
                <PostContainer
                  key={index}
                  onClick={() =>
                    onClick(post.activityId, post.relationId, index)
                  }
                  className={index === selectedPostIndex ? "selected" : ""}
                >
                  <PostTitle>
                    제목: {post.title} {post.activityId}
                  </PostTitle>
                  <Info>
                    <InfoLabel>작성자:</InfoLabel>
                    <InfoValue>{post.volunteerName}</InfoValue>
                  </Info>
                  <Info>
                    <InfoLabel>학생:</InfoLabel>
                    <InfoValue>{post.childName}</InfoValue>
                  </Info>
                  <Info>
                    <InfoLabel>시간:</InfoLabel>
                    <InfoValue>{post.dateInfo}</InfoValue>
                  </Info>
                </PostContainer>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </ActiveList>
        ) : (
          <ActiveList>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <PostContainer
                  key={index}
                  onClick={() =>
                    onClick(post.activityId, post.relationId, index)
                  }
                  className={index === selectedPostIndex ? "selected" : ""}
                >
                  <PostTitle>
                    제목: {post.title} {post.activityId}
                  </PostTitle>
                  <Info>
                    <InfoLabel>작성자:</InfoLabel>
                    <InfoValue>{post.volunteerName}</InfoValue>
                  </Info>
                  <Info>
                    <InfoLabel>학생:</InfoLabel>
                    <InfoValue>{post.childName}</InfoValue>
                  </Info>
                  <Info>
                    <InfoLabel>시간:</InfoLabel>
                    <InfoValue>{post.dateInfo}</InfoValue>
                  </Info>
                </PostContainer>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </ActiveList>
        )}
      </LeftContainer>
    </>
  );
};

export default ActiveLeft;
