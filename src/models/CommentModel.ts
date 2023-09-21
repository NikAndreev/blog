export default interface Comment {
  id: number;
  parent_id: null | number;
  post_id: number;
  text: string;
  name: string;
  comments?: Comment[];
}
