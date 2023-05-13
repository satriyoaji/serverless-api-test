import { MigrationInterface, QueryRunner } from "typeorm"

export class productTransaction1683970763918 implements MigrationInterface {
    name = 'addedProductTransaction1683970763918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "customer_id" uuid NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_15d19356d345f6e244f508e8e97" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_92119d76b619786c6d6456b91a0" FOREIGN KEY ("customer_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_transactions" DROP CONSTRAINT "FK_92119d76b619786c6d6456b91a0"`);
        await queryRunner.query(`ALTER TABLE "product_transactions" DROP CONSTRAINT "FK_15d19356d345f6e244f508e8e97"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
