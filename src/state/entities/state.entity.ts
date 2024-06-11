import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'state' })
export class StateEntity {

    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false })

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}