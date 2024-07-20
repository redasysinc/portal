import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api';

export default {
    getUsername: async ()=>{
      //const res = await axios.get('/getusername')
        //return res.data.username
        return 'jsmith'
    },
    healthCheck: async ()=>{
      //return "I'm alive";
      const {data} = await axios.get('/')

      return data;
    },
    getMedicalProfessionals : async () => {
        const result = await axios.get(`/`)
        console.log('getMedicalProf', result)
        return result.data
    },
    getProfessional: async (npi:string) =>{
        return data.filter(x=>x.NPI === npi)[0]
        // const result = await axios.get(`/doclist?npi=${npi}`)

        // localStorage.setItem(npi, JSON.stringify(result))
        // return result;
    },
    getAppointments: async (userName: string)=>{
        const result = await axios.get(`/appointments?userName=${userName}`)
        console.log(result)
        return result.data
    },
    saveAppointment: async (appointment:any)=>{
        console.log("I'm saving....", appointment)
        const result = await axios.post('appointments', {appointment: JSON.stringify(appointment)})
        console.log(result)
        return result.data;
    },
    getUser: async (id)=>{
        const result =  await axios.get(`/users?id=${id}`)
        return result.data;
    },
    createUser: async (user:any)=>{
        return await axios.post('user', {user: JSON.stringify(user)})
    },
    getProvider:async(id)=>{
        const result = await axios.get(`/providers/${id}`)
        return result.data;
    },
    createProvider: async (provider:any)=>{
        const res = await axios.post('provider',{provider: JSON.stringify(provider)})
        console.log(res.data)
        return res.data
    }


}
