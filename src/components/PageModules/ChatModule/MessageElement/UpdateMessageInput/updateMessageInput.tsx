import { AxiosResponse } from "axios";
import { useState } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import DoneUpdateMessageLogo from "../../../../../assets/svg/DoneUpdateMessageLogo/doneUpdateMessageLogo";
import LoadingSpinner from "../../../../../elements/loadingElement";
import UpdateMessageRequest from "../../../../../models/messages/request/updateMessageRequest";
import MessageService from "../../../../../shared/http-services/MessageService";

type MessageContentState = {
  content: string;
  id: string;
  isEdit: boolean;
  updateEditState: (arg: boolean) => void;
  updateMessageContent: (arg: string) => void;
};

const UpdateMessageInput = (message: MessageContentState) => {
  const [isEditing, setEditState] = useState<boolean>(message.isEdit);
  const [isLoading, setLoadingState] = useState<boolean>(false);
  const [messageToUpdate, setMessageToUpdate] = useState<string>(message.content);

  const submitUpdate = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    setLoadingState(true);

    let updateMessageRequest: UpdateMessageRequest = {
      id: message.id,
      content: messageToUpdate,
    };

    console.log(updateMessageRequest);
    MessageService.updateMessage(updateMessageRequest)
      .then((response: AxiosResponse) => {
        console.log(response);

        if (response.status !== 200) {
          return;
        }

        setLoadingState(false);
        message.updateEditState(isEditing);
        setEditState(false);
      })
      .catch((err: Error) => console.log(err));

    console.log(messageToUpdate);
  };

  return (
    <Form
      onSubmit={(event: React.FormEvent<HTMLElement>) => submitUpdate(event)}
    >
      <InputGroup>
        <Form.Control
          className=""
          value={messageToUpdate}
          onChange={(event) =>
            setMessageToUpdate(() => {
              message.updateMessageContent(event.target.value);
              return event.target.value;
            })
          }
        />
        <InputGroup.Text className="chat-search-logo">
          {isLoading ? (
            <LoadingSpinner color="#3498db" containerSideSize={24} />
          ) : (
            <Button type="submit" className="transparent-button confirm-update">
              <DoneUpdateMessageLogo />
            </Button>
          )}
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
};

export default UpdateMessageInput;
