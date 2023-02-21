import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import KilledRussiansModel from "../../../models/widgets/KilledRussiansModel";
import WidgetsService from "../../../shared/http-services/WidgetsService";
import "./styles.css";



const NumberSection = () => {
    const [killedRussianState, setKilledRussianState] = useState<KilledRussiansModel>({} as KilledRussiansModel);

    useEffect(() => {
      WidgetsService.getFreshNumbers().then(response => {

              setKilledRussianState(response.data);
          });
  }, []);

  return (
    <Card className="numbersCard">
      <Card.Body className="numbersCard"> {killedRussianState.identifier}:{killedRussianState.totalKilled} 
      <span>+{killedRussianState.dailyKilled}</span> 
      </Card.Body>
    </Card>
  );
}

export default NumberSection;
