import { AddressEntity } from 'src/address/entities/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: false })
  cpf: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  type_user: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses?: AddressEntity[];
}
