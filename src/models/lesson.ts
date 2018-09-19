import {Room} from "./room";
import {Teaching} from "./teaching";
import {Review} from "./review";

export interface Lesson {

  id: number;
  idTeaching: number;
  date: string;
  start:  string;
  end:  string;
  roomDTO: Room;
  teachingDTO: Teaching;
  review:Review;

}
