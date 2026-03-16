const express = require('express');
const path = require('path');
const app = express();

// Set the folder for your HTML, CSS, and Images
app.use(express.static('public'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log('------------------------------------');
    console.log('   ELISY 254: SECURITY SYSTEM ACTIVE ');
    console.log(`   Running at: http://localhost:${PORT}`);
    console.log('------------------------------------');
});