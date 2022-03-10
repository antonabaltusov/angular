export interface ICourse {
  id?: number;
  title: string;
  creation: Date;
  duration: number;
  description: string;
  topRated?: boolean;
}
