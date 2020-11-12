const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
