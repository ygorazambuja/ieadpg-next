import { ILesson } from "./lesson";

export type IMagazine = {
  id: string;
  name: string;
  created_at: string;
  lessons?: ILesson[];
};
