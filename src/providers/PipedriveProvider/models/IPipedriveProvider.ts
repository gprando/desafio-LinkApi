import IPipedriveDTO from '../dtos/IPipedriveDTO';

export default interface IPipedriveProvider {
  listAll(): Promise<IPipedriveDTO[]>;
}
