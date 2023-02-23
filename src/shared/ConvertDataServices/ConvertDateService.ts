import moment from "moment";

const convertDate = (inputDate: Date): string => {
  return moment(inputDate).format("D MMMM H:mm");
};

const ConvertDateService = { 
  convertDate
}

export default ConvertDateService;