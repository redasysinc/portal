import axios from 'axios';
import Router from '@koa/router';
import os from "os";
import Doclist from "../data/doclist";
import db from '../data/database'
import koaBody from "koa-body";
import provider from "../data/schema/professional";

const _ = Router();

_.get('/api', async (ctx) => {
    ctx.body = "I'm alive"
})
_.get('/api/getUsername', async (ctx) => {
    ctx.set('Content-Type', 'application/json');
    ctx.body = {username: os.userInfo().username};
})
_.get('/api/doclist', async (ctx, next) => {
    const npi = ctx.query['npi']
    const options = {
        method: 'GET',
        //url: 'https://us-doctors-and-medical-professionals.p.rapidapi.com/search_npi',
        params: {npi},//npi: '1033112214'
        headers: {
            'x-rapidapi-key': 'e2afbacb12msh7c60c3d42d0f74fp176006jsn4c588e3ceaed',
            'x-rapidapi-host': 'us-doctors-and-medical-professionals.p.rapidapi.com'
        }
    }
    if (Doclist) {
        ctx.body = Doclist
        return;
    }
    let res = []
    try {
        //const response = await axios.request(options);
        //ctx.body = JSON.parse(response.data.Data);
    } catch (error) {
        console.error(error);
    }
});
_.get('/api/mental', async (ctx, next) => {
    const options = {
        method: 'GET',
        // url: 'https://mental-health-care-file.p.rapidapi.com/timePeriod',
        params: {
            limit: '1000',
            orderBy: 'asc',
            value: '0',
            index: '0'
        },
        headers: {
            'x-rapidapi-key': 'e2afbacb12msh7c60c3d42d0f74fp176006jsn4c588e3ceaed',
            'x-rapidapi-host': 'mental-health-care-file.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        ctx.body = response.data

    } catch (error) {
        console.error(error);
    }
});

_.get('/api/appointments', async (ctx, next) => {
    const userName = ctx.query?.userName
    const list = await db.getAppointmentsForUser(userName)
    ctx.body = list?.filter(x => (x.patient.userName === userName))
    console.log(ctx.body)
})

_.post('/api/appointments', koaBody(), async (ctx, next) => {
    const appointment = JSON.parse(ctx.request.body['appointment'])
    console.log('API', appointment)
    const result = await db.createAppointment(appointment);
    console.log(result)
    ctx.body = await db.getAppointmentsForUser(appointment.patient.userName)
})

_.get('/api/user/:id', async (ctx, next) => {
    const user = await db.fetchUser(ctx.params['id'])
    console.log('API', user)
    ctx.body = user;
})

_.post('/api/user/', koaBody(), async (ctx, next) => {
    const user = ctx.request.body['user']
    console.log('API create', user)
    const res = await db.createUser(user)
    ctx.body = res;
})

_.get('/api/provider/:id', async (ctx, next) => {
    const provider = await db.getProvider(ctx.params['id'])
    console.log('API', provider)
    ctx.body = provider;
})

_.get('/api/providerList', async (ctx, next) => {return await db.providerList()})
_.post('/api/provider', koaBody(), async (ctx, next) => {
    const body = ctx.request.body
    const provider = JSON.parse(body.provider)
    console.log('API create', provider)
    const res = await db.createProvider(provider)
    ctx.body = res;
    console.log('ctx body', res)
})

_.delete('/api/provider/:id', koaBody(), async (ctx, next) => {
    console.log('params', ctx.request.params)
    const {id}= ctx.request.params
    return await db.deleteProvider(id)
})

export default _;
