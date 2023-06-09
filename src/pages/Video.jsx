import React from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Comments from "../components/Comments";
import { useLocation } from "react-router-dom";
import axios from '../axios.js';
import en from 'javascript-time-ago/locale/en'
import { useDispatch, useSelector } from "react-redux";
import { dislike, fetchError, fetchStart, fetchSucces, like, undislike, unlike } from "../redux/slices/video";
import { sub, unsub } from "../redux/slices/user";
import TimeAgo from 'javascript-time-ago'
import Recomendations from "../components/Recomendations";

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo('en-US')

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div`
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #999;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Subscribed = styled.button`
  background-color: #999;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`

const Video = () => {

  const location = useLocation().pathname.split('/')[2];
  const dispatch = useDispatch();

  const { video } = useSelector((state) => state.video);
  const currentUser = useSelector((state) => state.user.user);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart());
      try {
        const videoData = await axios.get(`/videos/find/${location}`);
        console.log(videoData);
        const userData = await axios.get(`/users/find/${videoData.data.userId}`);
        await axios.put(`/videos/view/${videoData.data._id}`)
        dispatch(fetchSucces(videoData.data));
        setUser(userData.data);
      } catch (err) {
        alert(err);
        dispatch(fetchError(err));
        console.log(err);
      }
    }

    fetchData();
  }, [location, dispatch]);

  const handleLike = async () => {
    try {
      await axios.put(`/users/like/${video._id}`);
      dispatch(like(currentUser));
    } catch (err) {
      console.log(err);
      alert("Please Log in or Create an Account to like or dislike.")
    }
  }

  const handleUnlike = async () => {
    try {
      await axios.put(`/users/unlike/${video._id}`);
      dispatch(unlike(currentUser));
    } catch (err) {
      console.log(err);
      alert("Please Log in or Create an Account to like or dislike.")
    }
  }

  const handleDislike = async () => {
    try {
      await axios.put(`/users/dislike/${video._id}`);
      dispatch(dislike(currentUser));
    } catch (err) {
      console.log(err);
      alert("Please Log in or Create an Account to like or dislike.")
    }
  }

  const handleUndislike = async () => {
    try {
      await axios.put(`/users/undislike/${video._id}`);
      dispatch(undislike(currentUser));
    } catch (err) {
      console.log(err);
      alert("Please Log in or Create an Account to like or dislike.")
    }
  }

  const handleSub = async () => {
    if (!currentUser) {
      return alert("Please Log in or Create an Account to subscribe.");
    }
    try {
      if (currentUser.subscribed.includes(user._id)) {
        await axios.put(`/users/unsub/${user._id}`);
        dispatch(unsub(user));
        setUser((prev) => { return { ...prev, subscribers: prev.subscribers - 1 } })
      } else {
        await axios.put(`/users/sub/${user._id}`);
        dispatch(sub(user));
        setUser((prev) => { return { ...prev, subscribers: prev.subscribers + 1 } })
      }
    } catch (err) {
      console.log(err);
      alert("Please Log in or Create an Account to subscribe.")
    }
  }

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={video?.videoUrl} controls autoPlay muted={false} />
        </VideoWrapper>
        <Title>{video?.title}</Title>
        <Details>
          <Info>{video?.views} views • {video?.createdAt && timeAgo.format(new Date(video.createdAt))}</Info>
          <Buttons>
            <Button
              onClick={video?.likes.find((userId) => (userId === currentUser?._id)) ?
                handleUnlike : handleLike}>
              {
                video?.likes.find((userId) => (userId === currentUser?._id)) ?
                  <ThumbUpIcon />
                  :
                  < ThumbUpOutlinedIcon />
              }
              {video?.likes.length}
            </Button>
            <Button onClick={video?.dislikes.find((userId) => (userId === currentUser?._id)) ?
              handleUndislike : handleDislike}>
              {
                video?.dislikes.find((userId) => (userId === currentUser?._id)) ?
                  <ThumbDownIcon />
                  :
                  <ThumbDownOffAltOutlinedIcon />
              }
              Dislike
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={user.img} />
            <ChannelDetail>
              <ChannelName>{user.name}</ChannelName>
              <ChannelCounter>{user.subscribers + " subscribers"}</ChannelCounter>
              <Description>
                {video?.description}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          {
            currentUser?._id !== user._id &&
            <>
              {

                currentUser?.subscribed?.includes(user._id) ? (
                  <Subscribed onClick={handleSub}>SUBSCRIBED</Subscribed>
                ) : (
                  <Subscribe onClick={handleSub}>SUBSCRIBE</Subscribe>
                )
              }
            </>
          }
        </Channel>
        <Hr />
        <Comments videoId={video?._id} />
      </Content>
      <Recomendations />
    </Container>
  );
};

export default Video;
