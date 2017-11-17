import path from 'path';
import express from 'express';
import React from 'react';
import config from 'config';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import App from './components/App';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));


app.get('*', (req, res) => {
  let markup = '';
  let status = 200;

  if (process.env.UNIVERSAL) {
    const context = {};
    markup = renderToString(
      <Router location={req.url} context={context}>
        <App />
      </Router>,
    );

    if (context.url) {
      return res.redirect(302, context.url);
    }

    if (context.is404) {
      status = 404;
    }
  }

  return res.status(status).render('index', { markup });
});

const port = config.get('app.port') || 3000;
const env = process.env.NODE_ENV || 'production';

app.listen(port, (err) => {
  if (err) {
    return console.err(err);
  }

  return console.info(
    `
    Server running on http://localhost:${port} [${env}]
    Universal rendering: ${process.env.UNIVERSAL ? 'enabled' : 'disabled'}
  `);
});
