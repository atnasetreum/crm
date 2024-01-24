import moment from "moment";
import "moment/locale/es";

export const stringToDateWithTime = (date: string | Date) =>
  moment(date).format("DD/MM/YYYY h:mm a");

export const stringToDate = (date: string | Date) =>
  moment(date).format("DD/MM/YYYY");

export const infoCreate = (createdAt: Date, name: string) => {
  return `${stringToDateWithTime(createdAt)} ${name}`;
};

export const infoUpdate = (
  createdAt: Date,
  updatedAt: Date,
  name: string | undefined
) => {
  if (!name) return "";

  return `${
    stringToDateWithTime(createdAt) === stringToDateWithTime(updatedAt)
      ? ""
      : stringToDateWithTime(updatedAt)
  }
     ${name}`;
};
