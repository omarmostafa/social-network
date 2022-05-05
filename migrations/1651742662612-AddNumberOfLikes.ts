import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNumberOfLikes1651742662612 implements MigrationInterface {
    name = 'AddNumberOfLikes1651742662612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "numberOfLikes" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "numberOfLikes"`);
    }

}
