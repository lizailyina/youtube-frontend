import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Card from './Card';

const Container = styled.div`
  flex: 2;
`;

const Recomendations = ({ parentVideo }) => {
  const [videos, setVideos] = React.useState([]);

  const { video } = useSelector((state) => state.video);

  React.useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await axios.get(`/videos/tag?tags=${video.tags}`);
      setVideos(data);
    }
    fetchVideos();
  }, [video])


  return (
    <Container>
      {
        videos?.filter((obj) => obj._id !== parentVideo._id).map((obj) =>
          <Card video={obj} key={obj._id} />
        )
      }
    </Container>
  )
}

export default Recomendations