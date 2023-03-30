import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {

  const { theme } = useSelector((state) => state.theme);

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <Container>
        <Menu />
        <Main>
          <Navbar />
          <Wrapper>
            <Routes>
              <Route path="/" exact element={<Home type="random" />} />
              <Route path="/trend" exact element={<Home type="trend" />} />
              <Route path="/lib" exact element={<Home type="lib" />} />
              <Route path="/categories" exact element={<Home type="categories" />} />
              <Route path="/search" exact element={<Home type="search" />} />
              <Route path="/sub" exact element={<Home type="sub" />} />
              <Route path="/signin" exact element={<SignIn />} />
              <Route path="/video/:id" element={<Video />} />
            </Routes>
          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider >
  );
}

export default App;
