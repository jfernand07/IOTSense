"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRefreshTokensTable1765553000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateRefreshTokensTable1765553000000 {
    name = 'CreateRefreshTokensTable1765553000000';
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'refresh_tokens',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'token_hash',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'expires_at',
                    type: 'timestamptz',
                    isNullable: false,
                },
                {
                    name: 'is_revoked',
                    type: 'boolean',
                    default: false,
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamptz',
                    default: 'now()',
                    isNullable: false,
                },
            ],
        }), true);
        await queryRunner.createIndex('refresh_tokens', new typeorm_1.TableIndex({
            name: 'IDX_refresh_tokens_token_hash',
            columnNames: ['token_hash'],
            isUnique: true,
        }));
        await queryRunner.createForeignKey('refresh_tokens', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('refresh_tokens');
        if (table) {
            const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
            if (foreignKey) {
                await queryRunner.dropForeignKey('refresh_tokens', foreignKey);
            }
        }
        await queryRunner.dropIndex('refresh_tokens', 'IDX_refresh_tokens_token_hash');
        await queryRunner.dropTable('refresh_tokens');
    }
}
exports.CreateRefreshTokensTable1765553000000 = CreateRefreshTokensTable1765553000000;
//# sourceMappingURL=1765553000000-create-refresh-tokens-table.js.map