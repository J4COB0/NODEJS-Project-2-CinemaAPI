const { app } = require('./app');

// Utils
const { sequelize } = require('./util/database');
const { initModels } = require('./util/initModels');

// Authenticate database
sequelize
    .authenticate()
    .then(() => console.log('Database authenticate'))
    .catch((err) => console.log(err));

// Init the models
initModels();

// Syncronized the models if it doesn't exist
sequelize
    .sync()
    .then(() => console.log('Database synced'))
    .catch((err) => console.log(err));

// Asing port to listen
app.listen(4000, () => {
    console.log('App running..');
});
