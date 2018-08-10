import { Course } from "./course";

export interface User {

  name?: string;
  surname?: string;
  email?: string;
  age?: number;
  uid?: string;
  userType?: number;
  id?: number;
  matricola?: string;
  year?: number;
  yearStart?: number;
  idCourse?: number;
  courseDTO?: Course;


}
