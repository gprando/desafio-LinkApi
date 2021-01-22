import Business from '@/infra/typeorm/entities/Business';

export default interface IPaginatedBusinessDTO {
  data: Business[];
  page: number;
  limit: number;
  totalCount: number;
}
