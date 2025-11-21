const fs = require('fs');
try {
    console.log('--- CLIENT .ENV ---');
    console.log(fs.readFileSync('.env', 'utf8'));
} catch (e) {
    console.log('Error reading .env:', e.message);
}
