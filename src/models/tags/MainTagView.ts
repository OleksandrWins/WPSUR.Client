import SubTag from "../subTags/subTag";

interface MainTagView { 
  id: string;
  content: string;
  subTags?: Array<SubTag>;
}

export default MainTagView;