import express from 'express';
import showAndSaveLog from './log/log';
import db from './database/db';

interface IPlaces {
  image: string,
  name: string,
  address: string,
  address2: string,
  state: string,
  city: string,
  items: string
}

const now = () => {
  const dateClass = new Date();
  const dateHour = `${dateClass.getDay()}/${dateClass.getMonth()}/${dateClass.getFullYear()}-${dateClass.getHours()}:${dateClass.getMinutes()}:${dateClass.getSeconds()}`;
  return dateHour;
};

const routes = express.Router();

routes.get('/', (req, res) => {
  showAndSaveLog('rendering index.html', now());
  return res.render('index.html');
});

routes.get('/create-point', (req, res) => {
  showAndSaveLog('rendering create-point.html', now());
  return res.render('create-point.html');
});

routes.post('/savepoint', (req, res) => {
  const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `;
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  showAndSaveLog('registering point', now());
  db.run(query, values, (err: any) => {
    if (err) {
      showAndSaveLog('error when registering point', now());
      // eslint-disable-next-line no-console
      console.log(err);
      return res.send('Erro no cadastro');
    }

    showAndSaveLog('data registered in database', now());
    showAndSaveLog('rendering create-point.html', now());
    return res.render('create-point.html', { saved: true });
  });
});

routes.get('/search-results', (req, res) => {
  const { search } = req.query;

  if (search === '') {
    showAndSaveLog('rendering search-results.html', now());
    return res.render('search-results.html', { total: 0 });
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, (err: any, rows: [IPlaces]) => {
    if (err) {
      console.log(err);
    }

    showAndSaveLog('rendering search-results.html', now());
    return res.render('search-results.html', {
      places: rows,
      total: rows.length,
    });
  });
});

export default routes;
