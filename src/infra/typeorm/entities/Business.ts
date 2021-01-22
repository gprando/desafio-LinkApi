import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('business')
export default class Business {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('int')
  code: number;

  @Column()
  creator_user_id: string;

  @Column()
  creator_name: string;

  @Column()
  creator_email: string;

  @Column()
  client_name: string;

  @Column()
  client_email: string;

  @Column()
  client_phone: string;

  @Column()
  title: string;

  @Column('time with time zone')
  add_time: Date;

  @Column('float')
  value: number;

  @Column()
  currency: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
