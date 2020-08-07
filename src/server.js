//Dados
const proffys = [
    {
        name: "Jefferson Fantasia",
        avatar: "https://avatars2.githubusercontent.com/u/57639040?s=460&u=8f41745eab7f166818e5631af19cb33ebbaf4162&v=4",
        whatsapp: "11999192582",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões." ,
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Mayk Brito",
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsapp: "11999192582",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões." ,
        subject: "Química",
        cost: "20",
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

//funcionalidades

function getSubject(subjectNumber) {
    
    const position = +subjectNumber -1 
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render("index.html") 
}

function pageStudy(req,res) {
    const filters = req.query

    return res.render("study.html", { proffys, filters, subjects, weekdays } )
} 

function pageGiveClasses(req,res) {
    const data = req.query

    //[]
    const isNotEmpty = Object.keys(data).length > 0
    //se tiver dados: adicionar data a lista de proffys
    if (isNotEmpty) {   

        data.subject = getSubject(data.subject)

        proffys.push(data)

        return res.redirect("/study")
    }
    //senão, mostrar a página
    return res.render("give-classes.html", {subjects, weekdays})
}

//servidor
const express = require("express")
const server = express()

//configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

//inicio e configuração do servidor
server
    //arquivos estaticos estão na pasta public      
    .use( express.static("public") ) 
    //rotas da aplicação
    .get("/", pageLanding)    
    .get("/study", pageStudy)    
    .get("/give-classes", pageGiveClasses)
    //start do servidor
    .listen(3000)



