import { Col, Container, Row } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router";
import SideBar from "../../components/SideBar/sideBar";
import Widgets from "../../components/Widgets/widgets";
import "../../styles/custom.css";
import MessagePageModule from "../../components/PageModules/MessagePageModule/messagePageModule";
import MainPageModule from "../../components/PageModules/MainPageModule/mainPageModule";
import ChatModule from "../../components/PageModules/ChatModule/chatModule";
import "./styles.css"

const MainPage = () => {
  return <Container>
    <Row style={{ height: "auto"}}>
      <SideBar />
      <Col md={6} className="main-container">
        <Routes>
          <Route path="/home" element={<MainPageModule />}/>
          <Route path="/messages" element={<MessagePageModule />}/>
          <Route path="/messages/:chatId" element={<ChatModule />} />
          <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
      </Col>
      <Widgets />
    </Row>
  </Container>;
};

export default MainPage;
