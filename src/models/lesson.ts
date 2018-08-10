import {Room} from "./room";
import {Teaching} from "./teaching";

export interface Lesson {

  id: number;
  idTeaching: number;
  date: String;
  start:  string;
  end:  String;
  roomDTO: Room;
  teachingDTO: Teaching;

}
