export default interface Poll {
  isGeoEnabled: boolean;
  likes: number;
  dislikes: number;
  _id: string;
  question: string;
  options: any[];
  totalVotes: number;
  date: string;
  comments: any[];
  voters: any[];
}
