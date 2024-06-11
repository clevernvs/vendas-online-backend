import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsers31717622207149 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // CREATE TABLE public.user (
        //     id integer NOT NULL, 
        //     name character varying NOT NULL,
        //     email character varying NOT NULL,
        //     cpf character varying NOT NULL,
        //     type_user int NOT NULL,
        // )

        await queryRunner.createTable(new Table({
            name: 'public.users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'int',
                },
                {
                    name: 'cpf',
                    type: 'varchar',
                },
                {
                    name: 'type_user',
                    type: 'varchar',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('public.users');
    }

}
