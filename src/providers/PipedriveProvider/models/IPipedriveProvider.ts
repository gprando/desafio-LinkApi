import IResponsePipedrive from '../dtos/IResponsePipedrive';

export default interface IPipedriveProvider {
  listAll(): Promise<IResponsePipedrive>;
}
