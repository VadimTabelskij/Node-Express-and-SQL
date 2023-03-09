import express from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import carsRouter from 'cars';
import DatabaseService from 'services/database-service';

const server = express();
server.use(cors());
server.use(express.json());
server.use(morgan('tiny'));
server.use(express.static('public'));
server.use('/api/cars', carsRouter);

DatabaseService.connect(() => {
  server.listen(config.server.port, () => {
    console.log(`Server is running on ${config.server.address}`);
  });
});
