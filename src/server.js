const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models');
const PORT = process.env.PORT || 9000;
var corsOptions = {
    origin: 'http://localhost:3000/',
};
//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

db.sequelize
    .sync({ force: true })
    .then(() => {
        console.log('Drop end Resync db');
        initial();
    })
    .catch((err) => console.log(err));

function initial() {
    db.role.create({ name: 'student' });
    db.role.create({ name: 'admin' });
    db.role.create({ name: 'superadmin' });
}

app.listen(PORT, () => {
    console.log('Server is running on ' + PORT);
});
