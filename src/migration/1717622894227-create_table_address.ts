import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableAddress1717622894227 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'public.address',
            columns: [
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('public.address');
    }

}
