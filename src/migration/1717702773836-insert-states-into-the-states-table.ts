import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertStatesIntoTheStateTable1717702773836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM public.states`);
    }

}
