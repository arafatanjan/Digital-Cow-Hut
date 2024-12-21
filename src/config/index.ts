import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL
}

// k@C6RvNs_5MAsn.

// iWTmW9K6vwt9t1il