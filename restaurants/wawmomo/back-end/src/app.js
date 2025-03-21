// Dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { EventEmitter } from 'events';


// Middlewares
import { PORT, corsOptionsCheck } from './config.js';
// import { verifConnectionDb } from './dataBases/dbConfigs/mysql.js';
import routeAuth from './routes/routeAuth.js';
import route from './routes/route.js';


const app = express();

const bus = new EventEmitter();
bus.setMaxListeners(20);

app.use(cors(corsOptionsCheck));
app.use(morgan('dev'));
app.use(express.json());

// app.use(verifConnectionDb)
// verifConnectionDb()

app.use("/", route)
app.use("/auth", routeAuth)

app.get('*', (req, res) => {
    console.log('Error 404, url not found');
    res.status(404).json({message: 'Page not found'})
});

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});