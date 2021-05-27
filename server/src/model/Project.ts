import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Auditable } from "./Auditable";
import { Task } from "./Task";
import { User } from "./User";

@Entity({ name: "project" })
export class Project extends Auditable {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @Column({ name: "description", type: "varchar", nullable: false })
  description: string;

  @ManyToOne(() => User, (user) => user.projects)
  author: User;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
