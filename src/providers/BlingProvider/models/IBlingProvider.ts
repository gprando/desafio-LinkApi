import { ICreateBusinessDTO } from '@/dtos';

export default interface IBlingProvider {
  createBusiness(data: ICreateBusinessDTO[]): Promise<void>;
}
