import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from '../axios.js';
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 150px;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {

  const [videos, setVideos] = React.useState([]);
  const location = useLocation();

  React.useEffect(() => {
    const fetchVideos = async () => {
      if (type === "categories") {
        const category = location.search.substring(10);
        const { data } = await axios.get(`/videos/${type}?category=${category}`)
        setVideos(data);
      } else if (type === "search") {
        const q = location.search.substring(3);
        console.log(q);
        const { data } = await axios.get(`/videos/${type}?q=${q}`)
        setVideos(data);
      } else {
        const { data } = await axios.get(`/videos/${type}`);
        setVideos(data);
      }
    }
    fetchVideos();
  }, [type, location])

  return (
    <>
      <Container>
        {
          videos.map((obj) =>
            <Card video={obj} key={obj._id} />
          )
        }
      </Container>
    </>
  );
};

export default Home;
