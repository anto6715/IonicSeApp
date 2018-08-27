import {Professor} from "./professor";
import {Room} from "./room";

export interface Segnalation {

  id:number;
  note:string;
  description:string;
  idState:number;
  professorDTO:Professor;
  roomDTO:Room;

}
