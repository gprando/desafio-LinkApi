import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('daily_earnings')
export default class DailyEarnings {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('decimal')
  total: number;

  @Column('time with time zone')
  day: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
