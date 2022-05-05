import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrateTags1651742662613 implements MigrationInterface {
    name = 'MigrateTags1651742662613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO public.tags (name) VALUES ('Tag 1'),('Tag 2'),('Tag 3') `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
