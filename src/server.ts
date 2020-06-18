import express from 'express';
import nunjucks from 'nunjucks';
import routes from './routes';

const server = express();

nunjucks.configure('src/views/', {
  express: server,
  noCache: true,
});

server.use(express.static('public'));
server.use(express.urlencoded({ extended: true }));
server.use(routes);

server.listen(3000);
