//servidor
const express = require("express")
const server = express()

const{ pageLanding, pageStudy, pageGiveClasses, saveClasses } = require('./pages')

//configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

//inicio e configuração do servidor
server
    //reeber os dados do req.body
    .use(express.urlencoded({ extend: true }))
    //arquivos estaticos estão na pasta public      
    .use( express.static("public") ) 
    
    //rotas da aplicação
    .get("/", pageLanding)    
    .get("/study", pageStudy)    
    .get("/give-classes", pageGiveClasses)
    .post("/save-classes", saveClasses)
    
    //start do servidor
    .listen(3000)



