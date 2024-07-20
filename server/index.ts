import Koa from 'koa'
import mongoose from "mongoose";
import routes from './API/api.js'
import Router from '@koa/router'
import serve from 'koa-static'
import cors from '@koa/cors'
import os from 'os'
import process from "../.eslintrc.cjs";


mongoose.connect('mongodb://root:passw0rd@mongodb:27017/portal?authSource=admin')
    .then((cn) => console.log('db is connected', cn))


const app = new Koa()
const _ = Router()
app.context.env = process.env.NODE_ENV || 'development'
app.use(cors())

_.get('/', async (ctx) => {
    ctx.body = "I'm alive"
})

_.get('/api/getUsername', async (ctx) => {
    ctx.set('Content-Type', 'application/json');
    ctx.body = {username: os.userInfo().username};
})

app.on('error', (err, ctx) => {
    console.error(err);
    ctx.body = `ERROR: ${err.message}`;
});

app.on('post', async ctx => {
    console.log(ctx.request.body)
})

app.use(serve('dist'));

app.use(_.routes())
app.use(_.allowedMethods())
app.use(routes.routes())
app.use(routes.allowedMethods())
const server = app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
// server.setTimeout(20000)

