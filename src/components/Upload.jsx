import React from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase.js'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.form`
  z-index: 10;
  width: 600px;
  height: 800px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`

const CheckboxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const Checkbox = styled.input`
  color: ${({ theme }) => theme.text} important!;
`

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`

const Title = styled.h1`
  text-align: center;
`

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft}
  color: ${({ theme }) => theme.text};
`

const Label = styled.label`
  font-size: 18px;
`

const CheckboxHeading = styled.p`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.text};
`
const categories = ["Music", "Gaming", "Movies", "Live", "News", "Sports", "Others"];

const Upload = ({ open }) => {

  const [inputs, setInputs] = React.useState({ categories: [6] });
  const [video, setVideo] = React.useState(undefined);
  const [img, setImg] = React.useState(undefined);
  const [imgPerc, setImgPerc] = React.useState(0);
  const [videoPerc, setVideoPerc] = React.useState(0);

  const uploadTaskRef = React.useRef(null);
  const navigate = useNavigate();

  const { user } = useSelector((state) => (state.user));

  const handleCheckbox = (i) => {
    if (inputs.categories && inputs.categories.includes(i)) {
      setInputs((prev) => {
        return { ...prev, categories: prev.categories.filter((obj) => obj !== i) }
      })
    } else {
      setInputs((prev) => {
        return { ...prev, categories: [...prev.categories || [], i] }
      })
    }
  }

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    uploadTaskRef.current = uploadBytesResumable(storageRef, file);

    uploadTaskRef.current.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imageUrl" ?
          setImgPerc(Math.round(progress)) :
          setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => { },
      () => {
        getDownloadURL(uploadTaskRef.current.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL }
          })
          uploadTaskRef.current = null;
        });
      }
    );
  }

  React.useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  React.useEffect(() => {
    img && uploadFile(img, "imageUrl");
  }, [img]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("videos", { ...inputs, userId: user._id })
      open(false);
      data && navigate(`video/${data._id}`);
    } catch (err) {
      alert("Error uploading video, please try again later.");
      console.log(err);
    }
  }

  return (
    <Container>
      <Wrapper onSubmit={handleSubmit}>
        <Close onClick={() => {
          open(false);
          uploadTaskRef.current?.cancel();
          uploadTaskRef.current = null;
        }}>X</Close>
        <Title>Upload a New Video</Title>
        <Label>Video:</Label>
        {videoPerc > 0 ? videoPerc < 100 ?
          (
            `Uploading... ${videoPerc}%`
          ) : (
            "Uploaded succesfully."
          ) : uploadTaskRef.current ?
          "Please, wait for image to upload." :
          <Input type="file" accept="video/*" required onChange={(e) => setVideo(e.target.files[0])} />
        }
        <Input type="text" placeholder="Title" required
          onChange={(e) => setInputs((prev) => { return { ...prev, title: e.target.value } })} />
        <Desc placeholder='Description' rows="8" required
          onChange={(e) => setInputs((prev) => { return { ...prev, description: e.target.value } })} />
        <Input type="text" placeholder="Separate tags with comma, don't add spaces after commas"
          onChange={(e) => setInputs((prev) => { return { ...prev, tags: e.target.value.split(',') } })} />
        <Label>Choose a category:</Label>
        <CheckboxWrapper>
          {
            categories.map((obj, index) => (
              <CheckboxHeading key={obj} >
                {obj}
                <Checkbox type="checkbox"
                  checked={inputs.categories?.includes(index) || false}
                  onChange={() => handleCheckbox(index)} />
              </CheckboxHeading>
            ))
          }
        </CheckboxWrapper>
        <Label>Image:</Label>
        {
          imgPerc > 0 ? imgPerc < 100 ?
            (
              `Uploading... ${imgPerc}%`
            ) : (
              "Uploaded succesfully."
            ) : uploadTaskRef.current ?
            "Please, wait for video to upload." :
            <Input type="file" accept="image/*" onChange={(e) => setImg(e.target.files[0])} />
        }
        <Button type="submit"> Upload </Button>
      </Wrapper>
    </Container>
  )
}

export default Upload;