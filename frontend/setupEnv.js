const fs = require('fs');
const path = require('path');

const defaultEnv = `
PORT=3000
REACT_APP_API_URL=http://localhost:4000
`;

const envPath = path.join(__dirname, '.env');

fs.writeFileSync(envPath, defaultEnv.trim(), { flag: 'w' });

console.log('.env file created with default values');