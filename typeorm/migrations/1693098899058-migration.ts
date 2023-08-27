import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Migration1693098899058 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                    unsigned: true,
                },
                {
                    name: 'uuid',
                    type: 'varchar',
                    isGenerated: true,
                    generationStrategy: "uuid",
                    isUnique: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'birth_date',
                    type: 'date',
                    isNullable: true,
                },
                {
                    name: 'role',
                    type: 'int',
                    default: '1',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP()',
                },

        ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
