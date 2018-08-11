import { Review} from "./review";

export interface Material {

  id: number;
  idLesson: number;
  link: string;
  name: string;
  Review: Review;

}
