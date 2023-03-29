import React from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import IMG from "../img/background.png"
import ExitToAppOutlined from "@mui/icons-material/ExitToAppOutlined";
import { logout } from "../redux/slices/user";
import Upload from "./Upload";
import UploadAvatar from "./UploadAvatar";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  align-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
  color: ${({ theme }) => theme.text};
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`
const Popup = styled.div` 
  position: fixed;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  align-self: flex-end;
  margin: 5px;
  padding: 5px;
  gap: 10px;
  z-index: 3;
  background-color: ${({ theme }) => theme.bgLighter};
  `

const PopupOption = styled.h3`
  cursor: pointer;
  display: flex;
  gap: 7px;
  align-self: center;
  font-weight: 300;
  color: ${({ theme }) => theme.text};
`

const Navbar = () => {

  const [isOpen, setIsOpen] = React.useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = React.useState(false);
  const [isUploadOpen, setIsUploadOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Link to={`search?q=${search}`} style={{ textDecoration: "none", color: "inherit" }}>
              <SearchOutlinedIcon />
            </Link>
          </Search>
          {user ?
            (
              <User>
                <Avatar src={user.img || IMG} onClick={() => setIsOpen(true)} />
                <VideoCallOutlinedIcon onClick={() => setIsUploadOpen(true)} />
                {user.name}
              </User>
            ) : (
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            )
          }
        </Wrapper>
      </Container >
      <div style={isOpen ? {} : { visibility: "hidden" }}>
        <Popup>
          <PopupOption onClick={() => setIsAvatarOpen(true)}> Change Avatar <AccountBoxIcon /></PopupOption>
          <PopupOption onClick={() => { dispatch(logout()); setIsOpen(false); }}> Sign Out <ExitToAppOutlined /></PopupOption>
          <PopupOption onClick={() => setIsOpen(false)}> Close <CloseOutlinedIcon /></PopupOption>
        </Popup>
      </div>
      {isUploadOpen &&
        <Upload open={setIsUploadOpen} />
      }
      {
        isAvatarOpen &&
        <UploadAvatar open={setIsAvatarOpen} />
      }
    </>
  );
};

export default Navbar;
