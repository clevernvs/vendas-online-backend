import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCities1717622874597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'public.cities',
            columns: [
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('public.cities');
    }

}
