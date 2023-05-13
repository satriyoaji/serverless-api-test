import { MigrationInterface, QueryRunner } from "typeorm"

export class seedAdminUser1683124586727 implements MigrationInterface {
    name = 'seedAdminUser1683124586727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO users (name, email, password, role, verified) VALUES('Admin','admin@gmail.com','$2a$12$f2v/nkPbFWQgk04ZA3TXJeWmJLY1fnv32OoWQ8oZBEEJCmFLESdlS', 'Admin', true);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
