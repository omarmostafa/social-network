import {MigrationInterface, QueryRunner} from "typeorm";

export class user1651696835290 implements MigrationInterface {
    name = 'user1651696835290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_e7892be32c7ef95754b65e1462c"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "mediaId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_e7892be32c7ef95754b65e1462c" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_e7892be32c7ef95754b65e1462c"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "mediaId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_e7892be32c7ef95754b65e1462c" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
