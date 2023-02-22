import { Button, Container, Form } from "react-bootstrap";
import { FormEvent, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import EmergencyListModel from "../../../models/emergency/emergencyListModel";
import EmergencyService from "../../../shared/http-services/EmergencyService";
const CreateEmergencyList = () => {
  const [emails, setEmails] = useState<string>("");
  const [content, setContent] = useState<string>("");
  useEffect(() => {
    EmergencyService.getList().then((response) => {
      setEmails(response.data.emergencyList);
      setContent(response.data.emergencyContent);
    });
  }, []);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    createPostForm(emails, content);
  };
  const createPostForm = (emailInput: string, contentInput: string) => {
    let emergencyList: EmergencyListModel = {
      emergencyEmails: emailInput,
      emergencyMessage: contentInput,
    };
    EmergencyService.setList(emergencyList)
      .then((response: AxiosResponse) => {
        alert(response.data);
      })
      .catch((err: Error) => console.log(err));
  };
  return (
    <Container className="emergencyList">
      <Form onSubmit={handleSubmit}>
        <br />
        <Form.Group controlId="formEmails">
          <Form.Label>Enter emails of receivers</Form.Label>
          <Form.Control
            placeholder="Enter one email or multiple (user1@gmail.com;user2@gmail.com;..."
            onChange={(event) => setEmails(event.target.value)}
            value={emails}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="formContent">
          <Form.Label>Post body</Form.Label>
          <Form.Control
            placeholder="Enter your message to send"
            onChange={(event) => setContent(event.target.value)}
            value={content}
          />
        </Form.Group>
        <br />
        <Button type="submit">Create list</Button>
      </Form>
    </Container>
  );
};
export default CreateEmergencyList;