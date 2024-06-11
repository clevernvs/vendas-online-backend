import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertCitiesIntoTheCitiesTable1717702778548 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public.cities`);
    }

}
