import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios"

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 150px;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {

  const [videos, setVideos] = React.useState([]);

  React.useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await axios.get(`videos/${type}`);
      setVideos(data);
    }
    fetchVideos();
  }, [type])

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
