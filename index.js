const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded())

const port = process.env.PORT || 3000

app.get('/', async(request, response) => {
    const content = await axios.get('https://fullstack-lab-project.firebaseio.com/teste.json')
    response.render('index', {i: content.data})
    //response.send(`<h1>Hello World ${i}</h1>`)
})

app.get('/categorias/nova', (req, res) =>{
    res.render('categorias/nova')
})

app.post('/categorias/nova', async(req, res) =>{
    await axios.post("https://fullstack-lab-project.firebaseio.com/categorias.json",{
        categoria :req.body.categoria
    })
    res.redirect('/categorias')
})

app.get('/categorias', async(req, res)=>{
    const content = await axios.get("https://fullstack-lab-project.firebaseio.com/categorias.json")
    if(content.data){
        const categorias = Object.keys(content.data).map(key => {return {id:key, ...content.data[key]}})
        res.render('categorias/index', {categorias: categorias})
    }else{
        res.render('categorias/index', {categorias: []})
    }
})

app.get('/categorias/excluir/:id', async(req,res) =>{
    await axios.delete(`https://fullstack-lab-project.firebaseio.com/categorias/${req.params.id}.json`)
    res.redirect('/categorias')
})

/*await axios.post("https://fullstack-lab-project.firebaseio.com/categorias.json",{
        categoria :'Receitas'
})*/

app.listen(3000, (err) =>{
    if(err){
        console.log('error')
    }
    else{
        console.log('Is Running on port:', port)
    }
})