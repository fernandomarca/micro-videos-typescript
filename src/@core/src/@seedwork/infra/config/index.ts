import { config as readEnv } from 'dotenv';
import { join } from 'path';

type Vendor = 'postgres' | 'sqlite' | 'mariadb' | 'mssql';

function makeConfig(envFile) {
  const output = readEnv({ path: envFile });
  return {
    db: {
      vendor: output.parsed.DB_VENDOR as Vendor,
      host: output.parsed.DB_HOST,
      logging: output.parsed.DB_LOGGING === 'true'
    },
    mail: {},
    storages: {}
  }
}

const envTestFile = join(__dirname, "../../../../.env.test");
export const configTest = makeConfig(envTestFile);