import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableStates1717622869921 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'public.states',
            columns: [
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('public.states');
    }

}
