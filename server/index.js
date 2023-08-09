const express = require('express');
const port = 1802;
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const routesConnection = require('./connections/routes.connection');

app.use('/api', routesConnection);

app.get('/', (req, res) => {
    res.json({msg: "Connected!"})
})

app.listen(port, () => console.log(`server is listening to port: ${port}`));