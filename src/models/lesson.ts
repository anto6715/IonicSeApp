import {Room} from "./room";
import {Teaching} from "./teaching";
import {Review} from "./review";

export interface Lesson {

  id: number;
  idTeaching: number;
  date: String;
  start:  string;
  end:  String;
  roomDTO: Room;
  teachingDTO: Teaching;
  review:Review;

}
