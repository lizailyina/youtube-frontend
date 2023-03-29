import React from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase.js'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { avatar } from '../redux/slices/user.js';

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
  width: 200px;
  height: 200px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`

const Input = styled.input`
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
const UploadAvatar = ({ open }) => {

  const [img, setImg] = React.useState(undefined);
  const [imgPerc, setImgPerc] = React.useState(0);
  const [link, setLink] = React.useState("");

  const uploadTaskRef = React.useRef(null);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => (state.user));

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    uploadTaskRef.current = uploadBytesResumable(storageRef, file);

    uploadTaskRef.current.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress))
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
          setLink(downloadURL);
          console.log(link);
          uploadTaskRef.current = null;
        });
      }
    );
  }

  React.useEffect(() => {
    img && uploadFile(img, "imageUrl");
  }, [img]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}users/${user._id}`, { ...user, img: link });
      dispatch(avatar(link));
      open(false);
    } catch (err) {
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

export default UploadAvatar;