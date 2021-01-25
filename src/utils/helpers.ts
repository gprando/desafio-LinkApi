import { ICreateBusinessDTO } from '@/dtos';

export const createXML = (business: ICreateBusinessDTO): string => {
  const xml = `
  <?xml version="1.0" encoding="ISO-8859-1"?>
  <root>
  <pedido>
     <cliente>
        <email>${business.client_email}</email>
        <fone>${business.client_phone}</fone>
        <nome>${business.client_name}</nome>
     </cliente>
     <codigo>${business.code}</codigo>
     <item>
        <codigo>${business.code}</codigo>
     </item>
     <volume>
        <servico>${business.title}</servico>
     </volume>
  </pedido>
</root>`;

  return xml;
};

export const sameDay = (day1: Date, day2: Date): boolean => {
  return (
    day1.getFullYear() === day2.getFullYear() &&
    day1.getMonth() === day2.getMonth() &&
    day1.getDate() === day2.getDate()
  );
};

export const formatDate = (date: Date): Date => {
  return new Date(
    `${date.getFullYear()}-${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate()}`,
  );
};
