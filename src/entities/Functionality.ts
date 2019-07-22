import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Role from "./Role";

@Entity()
export default class Functionality {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => Role, role => role.functionalities)
  roles!: Role[];

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
