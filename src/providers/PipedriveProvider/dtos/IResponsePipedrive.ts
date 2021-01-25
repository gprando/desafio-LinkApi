import IPipedriveDTO from './IPipedriveDTO';

export default interface IResponsePipedrive {
  toSave: IPipedriveDTO[];
  saved: IPipedriveDTO[];
}
