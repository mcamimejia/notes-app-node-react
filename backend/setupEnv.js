const fs = require('fs');
const path = require('path');

const defaultEnv = `
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_NAME=CMnotesApp
DATABASE_HOST=localhost
DATABASE_PORT=NA
PORT=4000 
JWT_SECRET=my-jwt-secret
UI_URL=http://localhost:3000
`;

const envPath = path.join(__dirname, '.env');

fs.writeFileSync(envPath, defaultEnv.trim(), { flag: 'w' });

console.log('.env file created with default values');