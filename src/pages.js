const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')

function pageLanding(req, res) {
    return res.render("index.html") 
}

async function pageStudy(req,res) {
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time) {

        return res.render("study.html", { filters, subjects, weekdays } )

    }

    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT c.*, p.*
        FROM proffys p
        JOIN classes c ON (p.id = c.proffy_id)
        WHERE EXISTS (
            SELECT s.*
            FROM class_schedule s
            WHERE s.class_id = c.id
            AND s.weekday = ${filters.weekday}
            AND s.time_from <= ${timeToMinutes}
            AND s.time_to > ${timeToMinutes}
        )
        AND c.subject = '${filters.subject}'
    `

    //caso haja erro no momento da consulta
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', { proffys, subjects, filters, weekdays })


    } catch (error) {
        console.log(error)
        
    }
} 

function pageGiveClasses(req,res) {
 
    return res.render("give-classes.html", {subjects, weekdays})
}


async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')
    

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost,

    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })
    
    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues})
        
        let queryString = "?subject=" + req.body.subject
            queryString += "&weekday=" + req.body.weekday[0]
            queryString += "&time=" + req.body.time_from[0]



        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
        
    }
    
    
}




module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}