import pg from 'pg';
import Postgrator from "postgrator";
import path from 'node:path';
import { fileUrlToPath } from 'node:url';

const __filename = fileUrlToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
    const client = new pg.Client({
        host: '127.0.0.1',
        port: '3000',
        database: 'database/database.sqlite',
        user: 'bob',
        password: 'thebuilder',
    })

    try {
        await client.connect();

        const postgrator = new Postgrator({
            migrationPatern: path.join(__dirname, 'migrations/*'),
            driver: 'pg',
            database: 'sqliteDatabase',
            schemaTable : 'migrations',
            exxecQuery: (query) => client.query(query),
         })

        const result = await postgrator.migrate();

        if (result.length === 0)
        {
            console.log(
                'No migrations run for schema "public". Already on the latest one.'
            )
        }

        console.log('Migration done')

        process.exitCode = 0
    }
    catch (err) {
        console.error(err)
        process.exitCode = 1
    }
    await client.end()
}

migrate()