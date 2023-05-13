import { MigrationInterface, QueryRunner } from "typeorm"

export class productEntity1683970018859 implements MigrationInterface {
    name = 'addedProductsEntity1683970018859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying NOT NULL, "image_url" text array NOT NULL DEFAULT '{}', "description" character varying, "stock" integer NOT NULL, CONSTRAINT "UQ_7cfc24d6c24f0ec91294003d6b8" UNIQUE ("code"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "product_code_index" ON "products" ("code") `);
        // await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_34dbaebec7523c3b8d17bbe5801" FOREIGN KEY ("modified_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_34dbaebec7523c3b8d17bbe5801"`);
        await queryRunner.query(`DROP INDEX "public"."product_code_index"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }
}
