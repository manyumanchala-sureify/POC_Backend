import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'email' })
  toEmail: string;

  @Column('simple-array')
  ccEmail: string[];

  @Column('simple-array')
  bccEmail: string[];

  @Column({
    default: 'welcome bacK!!!',
  })
  subject: string;

  @Column({
    default: '',
  })
  body: string;

  @Column()
  url: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createdAt: Date;

  @Column({
    name: 'modifeied_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  ModifiedAt: Date;

  @Column({
    default: 1,
  })
  rowStatus: number;
}
