process.env.NODE_ENV = 'development';

const configExpress = require('./config/express');

const app = configExpress();
const port = 1234;
app.listen(port);
module.exports = app;
console.log('Server running at http://localhost:' + port + '/');