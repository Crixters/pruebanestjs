import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "./task-status-enum";

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    status: TaskStatus;

    @CreateDateColumn({ type: 'timestamp',  default: ()=> "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @UpdateDateColumn({  type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;

}