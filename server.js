const http = require('http');
const port = process.env.PORT || 8080;
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const Router = require('koa-router');
const faker = require('faker');
faker.locale = 'ru';

const app = new Koa();
const server = http.createServer(app.callback());
const router = new Router();


app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET'],
  })
);

app.use(koaBody({
  json: true,
  text: true,
  urlencoded: true,
}));

app.use(router.routes()).use(router.allowedMethods());

router.get('/messages/unread', async (ctx) => {
  const messages = [];
  const random = Math.floor(Math.random() * 4);
  for (let i = 0; i < random; i++) {
    const message = {
      id: faker.datatype.uuid(),
      from: faker.internet.email(),
      subject: faker.lorem.words(),
      body: faker.lorem.sentences(),
      received: new Date().toLocaleString('ru'),
    };
    messages.push(message);
  };
  const data = {
    status: 'ok',
    timestamp: new Date().toLocaleString('ru'),
    messages,
  };
  ctx.response.body = data;
});

server.listen(port, () => console.log('Server started'));