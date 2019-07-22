import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import User from "./User";
import Functionality from "./Functionality";

@Entity()
export default class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  // @ts-ignore
  @OneToMany(type => User, user => user.role)
  users!: User[];

  @ManyToMany(() => Functionality, functionality => functionality.roles)
  @JoinTable()
  functionalities!: Functionality[];

  @Index()
  @Column({
    unique: true,
    length: 32
  })
  code!: string;

  @Column({
    unique: true,
    length: 70
  })
  name!: string;

  @Index()
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({
    nullable: true
  })
  updatedAt!: Date | null;
}
