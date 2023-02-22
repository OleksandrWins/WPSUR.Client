import { Col, Container, Row } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router";
import SideBar from "../../components/SideBar/sideBar";
import Widgets from "../../components/Widgets/widgets";
import axios, { AxiosResponse } from "axios";
import "../../styles/custom.css";
import MessagePageModule from "../../components/PageModules/MessagePageModule/messagePageModule";
import MainPageModule from "../../components/PageModules/MainPageModule/mainPageModule";
import MainTagModule from "../../components/PageModules/MainTagModule/mainTagModule";
import InfoPage from "../InfoPage/infoPage";
import CreateEmergencyList from "../../components/PageModules/CreateEmergencyList/CreateEmergencyList";


const MainPage = () => {
  return <Container>
    <Row style={{ height: "auto"}}>
      <SideBar />
      <Col className="main-container">
        <Routes>
          <Route path="/home" element={<MainPageModule />}/>
          <Route path="/home/:mainTagId" element={<MainTagModule />}/> 
          <Route path="/messages" element={<MessagePageModule />}/>
          <Route path="/emergencyList" element={<CreateEmergencyList />}/>
          <Route path="/info" element={<InfoPage />}/>
          <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
      </Col>
      <Widgets />
    </Row>
  </Container>;
};

export default MainPage;
