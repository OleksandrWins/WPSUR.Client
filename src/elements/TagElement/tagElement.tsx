import { Container } from "react-bootstrap";
import "./styles.css"

interface TagModule { 
  isMainTag: boolean;
  content: string;
}

const TagModule = (props: TagModule) => { 

  const mainTagStyle = { 
    backgroundColor: "#175A9B",
  }

  const subTagStyle = { 
    backgroundColor: "#7694A4",
  }

  return (
    <Container className="tag-element font-poppins-600" style={props.isMainTag ? mainTagStyle : subTagStyle}>
      #{props.content}
    </Container>
  );
}

export default TagModule;