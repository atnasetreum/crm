import moment from "moment";
import "moment/locale/es";

export const stringToDateWithTime = (date: string | Date) =>
  moment(date).format("DD/MM/YYYY h:mm a");
