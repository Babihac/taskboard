import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Length } from "class-validator";
import { Task } from "./Task";
import { Auditable } from "./Auditable";

@Entity({ name: "user" })
export class User extends Auditable {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column("varchar", {
    nullable: false,
  })
  firstName: string;

  @Column("varchar", {
    nullable: false,
  })
  lastName: string;

  @Column("varchar", {
    nullable: false,
  })
  username: string;

  @Column("boolean", {
    nullable: false,
    default: false,
  })
  isValidated: boolean;

  @Column("varchar", {
    nullable: false,
  })
  @Length(8, 100)
  password: string;

  @Column("varchar", {
    nullable: false,
  })
  email: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
