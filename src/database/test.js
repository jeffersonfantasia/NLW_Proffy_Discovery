const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    //Inserir dados

    proffyValue = {
        name: "Jefferson Fantasia",
        avatar: "https://avatars2.githubusercontent.com/u/57639040?s=460&u=8f41745eab7f166818e5631af19cb33ebbaf4162&v=4",
        whatsapp: "11999192582",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões." ,

    }

    classValue = {
        subject: 1,
        cost: "20"
        //proffy_id vem pelo banco de dados
    }

    classScheduleValues = [
        //class_id vem pelo banco de dados após cadastro da aula
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

     await createProffy(db, {proffyValue, classValue, classScheduleValues})
    
    //consultar dados inseridos

    //todos os proffys
    const selectedProffys = await db.all(`SELECT * FROM proffys`)


    //consultor as classes de um terminado professor e trazer os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT c.*, p.*
        FROM proffys p
        JOIN classes c ON (p.id = c.proffy_id)
        WHERE c.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    //consulta dos horarios e materias
    const selectClassesSchedules = await db.all(`
        SELECT s*
        FROM class_schedule s
        WHERE s.class_id = 1
        AND s.weekday = 0
        AND s.time_from <= 520
        AND s.time_to > 520
    `)

})