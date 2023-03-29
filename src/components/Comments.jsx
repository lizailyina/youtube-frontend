import axios from "axios";
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
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
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
        const commentsData = await axios.get(`/comments/${videoId}`);
        console.log(commentsData);
        dispatch(fetchSucces(commentsData.data));
      } catch (err) {
        alert(err);
        dispatch(fetchError(err));
        console.log(err);
      }
    }

    fetchData();
  }, []);

  const handleAdd = async () => {
    const comment = {
      description: value,
      userId: user._id,
      videoId
    }
    try {
      const { data } = await axios.post("/comments", comment);
      console.log(data);
      dispatch(addComment(data));
      setValue("");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  console.log(comments);

  return (
    <Container>
      <NewComment>
        <Avatar src={user.img} />
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Add a comment..." />
        <SendIcon style={{ color: "white" }} onClick={() => handleAdd()} />
      </NewComment>
      {
        comments.map((obj) =>
          <Comment comment={obj} />
        )
      }
    </Container>
  );
};

export default Comments;
