import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import KilledRussiansModel from "../../../models/widgets/KilledRussiansModel";
import WidgetsService from "../../../shared/http-services/WidgetsService";
import "./styles.css";

const NumberSection = () => {
  const [killedRussianState, setKilledRussianState] =
    useState<KilledRussiansModel>({} as KilledRussiansModel);

  useEffect(() => {
    WidgetsService.getFreshNumbers().then((response) => {
      setKilledRussianState(response.data);
    });
  }, []);

  return (
    <Container className="number-section font-poppins-600">
      {" "}
      <text className="number-section-text">Number of russians killed:</text>
      <text className="number-section-number"> {killedRussianState.totalKilled}</text>
      <text className="number-new-kills">+{killedRussianState.dailyKilled}</text>
    </Container>
  );
};

export default NumberSection;
