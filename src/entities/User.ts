import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert
} from "typeorm";
import BcryptHelper from "../helpers/BcryptHelper";
import Role from "./Role";
import Company from "./Company";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  // @ts-ignore
  @ManyToOne(type => Role, role => role.users, {
    nullable: false
  })
  role!: Role;

  // @ts-ignore
  @ManyToOne(type => Company, company => company.users)
  company!: Company;

  @Column({
    unique: true
  })
  @Index()
  email!: string;

  @Column({
    length: 64
  })
  password!: string;

  @Column({
    unique: true,
    nullable: true
  })
  @Index()
  token!: string | null;

  @Column({
    length: 70
  })
  firstName!: string;

  @Column({
    length: 70
  })
  lastName!: string;

  @Column({
    length: 2
  })
  locale!: string;

  @Column({
    type: "date"
  })
  birthDate!: Date;

  @Column({
    unique: true
  })
  phone!: string;

  @Column({
    nullable: true,
    length: 140
  })
  description!: string | null;

  @Column({
    nullable: true,
    length: 140
  })
  avatar!: string | null;

  @CreateDateColumn()
  @Index()
  createdAt!: Date;

  @UpdateDateColumn({
    nullable: true
  })
  updatedAt!: Date | null;

  @BeforeInsert()
  // @ts-ignore
  private async beforeInsert() {
    this.password = <string>await BcryptHelper.HASH(this.password);
  }
}
