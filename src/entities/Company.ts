import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import User from "./User";

@Entity()
export default class Company {
  @PrimaryGeneratedColumn()
  id!: number;

  // @ts-ignore
  @OneToMany(type => User, user => user.company)
  users!: User[];

  @Column({
    unique: true,
    length: 32
  })
  @Index()
  code!: string;

  @Column({
    unique: true,
    length: 70
  })
  name!: string;

  @CreateDateColumn()
  @Index()
  createdAt!: Date;

  @UpdateDateColumn({
    nullable: true
  })
  updatedAt!: Date | null;
}
