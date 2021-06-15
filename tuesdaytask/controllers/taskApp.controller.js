fs = require('fs')
readData = () => {
    try{
        data = JSON.parse(fs.readFileSync('tasks.json').toString())
    }
    catch(e){
        data = []
    }
    return data 
}
writeData = (data) =>{
    try{
        fs.writeFileSync('tasks.json', JSON.stringify(data))
    }
    catch(e){
        fs.writeFileSync('tasks.json', '[]')
    }
}
addTask = (task) =>{
    allData = readData()
    allData.push(task)
    writeData(allData)
}
showAllTasksController =(req, res)=>
{
 allTasks=  readData()
 res.render('showAllTasks.hbs',{allTasks})  
}
deleteSingleTask= (req, res)=>{
    allTasks = readData() 
    console.log(req.params.id) 
    index=allTasks.findIndex(elem => elem.id == req.params.id)
    allTasks.splice(index,1)
    writeData(allTasks)
    res.redirect('/showAllTasks')
}
let editFlag=false
let editIndex=0
editSingleTask=(req,res)=>{
    allTasks = readData() 
    index=allTasks.findIndex(elem => elem.id == req.params.id)
    let task=allTasks[index]
    editFlag=true
    editIndex=index
    res.render('addTaskForm',{pageTitle:'Edit task', taskTitle:task.title, taskContent:task.content,editFlag:true})
}
addTaskController = ( req, res )=>{
    task = {
        id:'',
        title:'',
        content:'',
        status:''
    }
    if(!editFlag){
    if(req.query.title == '' || req.query.content == ''|| req.query.status=='Status'){
        task = req.query
    }
    if(req.query.title && req.query.content && req.query.status!='Status'){ 
        let id=  (new Date()).getTime()
        task= {id,...req.query}
        console.log(task)
        addTask(task)
        res.redirect('/showAllTasks')
    }
    res.render('addTaskForm', {pageTitle:'add new task', taskTitle:task.title, taskContent:task.content})
}
else
{
    if(req.query.title && req.query.content && req.query.status!='Status'){ 
        allTasks = readData() 
        allTasks[editIndex]= {...allTasks[editIndex]['id'] , ...req.query}
        writeData(allTasks)
        res.redirect('/showAllTasks')
    } 
}
}

module.exports = {
    addTaskController,
    showAllTasksController,
    deleteSingleTask,
    editSingleTask
 /*   showSingleTask,
*/
}