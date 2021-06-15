
const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app=express()
app.set('view engine', 'hbs')

const viewsDir = path.join(__dirname, '../resources/views')
const layoutsDir = path.join(__dirname, '../resources/layouts')

app.set('views', viewsDir)
hbs.registerPartials(layoutsDir)


app.get('', (req,res)=>{
    res.render('index')
})
/*
app.get('/allTasks', (req,res)=>{
    res.render('allTasks')
})
*/
/*
app.get('/addTaskForm', (req,res)=>{
    res.render('addTaskForm')
})
*/


const taskContoller = require('../controllers/taskApp.controller')
app.get('/addTaskForm', taskContoller.addTaskController)
app.get('/showAllTasks',taskContoller.showAllTasksController)
app.get('/delete/:id',taskContoller.deleteSingleTask)
app.get('/edit/:id',taskContoller.editSingleTask)
module.exports = app