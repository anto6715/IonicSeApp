import {Course} from "./course";
import {Professor} from "./professor";

export interface Teaching {

  id: number;
  name: string;
  year: number;
  credits: number;
  idCourse: number;
  idProfessor: number;
  courseDTO: Course;
  professorDTO: Professor;


}
