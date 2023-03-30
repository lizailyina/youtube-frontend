import axios from '../axios.js';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import SendIcon from '@mui/icons-material/Send';
import { addComment, fetchError, fetchStart, fetchSucces } from "../redux/slices/comments";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #999;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {

  const { comments } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.user);

  const [value, setValue] = React.useState("");

  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart());
      try {
        const commentsData = await axios.get(`${process.env.REACT_APP_API_URL}comments/${videoId}`);
        dispatch(fetchSucces(commentsData.data));
      } catch (err) {
        alert(err);
        dispatch(fetchError(err));
        console.log(err);
      }
    }

    fetchData();
  }, [videoId, dispatch]);

  const handleAdd = async () => {
    const comment = {
      description: value,
      userId: user._id,
      videoId
    }
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}comments`, comment);
      dispatch(addComment(data));
      setValue("");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  return (
    <Container>
      <NewComment>
        <Avatar src={user?.img} />
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add a comment..." />
        <SendIcon onClick={() => handleAdd()} />
      </NewComment>
      {
        comments?.map((obj) =>
          <Comment key={obj._id} comment={obj} />
        )
      }
    </Container>
  );
};

export default Comments;
