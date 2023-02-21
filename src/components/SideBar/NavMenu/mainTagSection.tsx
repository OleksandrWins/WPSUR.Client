import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainTagResponse from "../../../models/tags/response/MainTagResponse";
import PostService from "../../../shared/http-services/PostService";
import mainTagsState from "../../PageModules/MainPageModule/mainPageModule";
import './styles.css';

const MainTagSection = () => {
  const [mainTagsState, setMainTagsState] = useState<Array<MainTagResponse>>([]);

  useEffect(() => {
    getMainTag();
  }, [])

  const getMainTag = () => {
    PostService.getMainTags().then((response: AxiosResponse<Array<MainTagResponse>>) => {
      setMainTagsState([...response.data])
    })
  }

  const getMainTags = () => {
    const mainTagsFromApi = mainTagsState.map(mainTag => <Link key={mainTag.id} to={`/home/${mainTag.id.toString()}`} className="element">{"#" + mainTag.name}</Link>);
    return mainTagsFromApi;
  }

  return (
    <Col md={9} className="main-tag-container">
      {getMainTags()}
    </Col>
  );
}

export default MainTagSection;