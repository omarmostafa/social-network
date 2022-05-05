import {MigrationInterface, QueryRunner} from "typeorm";

export class post1651699402013 implements MigrationInterface {
    name = 'post1651699402013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "mediaId" uuid, "tagId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_576b59d6d320e52e4493f810b1" UNIQUE ("mediaId"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("postsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_ec06673d02806abfa9ec8e5fcfb" PRIMARY KEY ("postsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_376f9c48925cfe81125f0a8715" ON "likes" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d5312be6de5784293ac2908978" ON "likes" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_122313e5405230bc430e38c12d1" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_576b59d6d320e52e4493f810b10" FOREIGN KEY ("mediaId") REFERENCES "media"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_376f9c48925cfe81125f0a87152" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_d5312be6de5784293ac29089784" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_d5312be6de5784293ac29089784"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_376f9c48925cfe81125f0a87152"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_576b59d6d320e52e4493f810b10"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_122313e5405230bc430e38c12d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d5312be6de5784293ac2908978"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_376f9c48925cfe81125f0a8715"`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
