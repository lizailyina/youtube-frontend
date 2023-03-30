import axios from '../axios.js';
import React from "react";
import styled from "styled-components";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo('en-US')

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #999;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const DateComponent = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }) => {

  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}users/find/${comment.userId}`)
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [comment])

  return (
    <Container>
      <Avatar src={user.img} />
      <Details>
        <Name>
          {user.name} <DateComponent>{timeAgo.format(new Date(comment.createdAt))}</DateComponent>
        </Name>
        <Text>
          {comment.description}
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;
