import { createConnection } from 'typeorm'

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            database: 'amo_api_app',
            username: 'alex',
            password: 'WGYMBiu63)wdJz`',
            entities: [
                __dirname + './../**/*.entity{.ts,.js}'
            ],
            synchronize: false,
            migrationsTableName: 'migrations_table',
            migrations: ["./migration/*{.ts,.js}"],
            cli: {
                migrationsDir: 'migration'
            }
        })
    }
]
