export default interface ICreateBusinessDTO {
  code: number;
  creator_user_id: string;
  creator_name: string;
  creator_email: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  title: string;
  add_time: string;
  value: number;
  currency: string;
  status: string;
}
