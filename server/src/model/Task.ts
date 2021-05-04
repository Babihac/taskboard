import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Auditable } from "./Auditable";
import { User } from "./User";

@Entity({ name: "task" })
export class Task extends Auditable {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column("varchar", {
    nullable: false,
  })
  title: string;

  @Column("varchar", {
    nullable: false,
  })
  body: string;

  @Column("varchar", {
    nullable: false,
    default: "Todo",
  })
  status: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
