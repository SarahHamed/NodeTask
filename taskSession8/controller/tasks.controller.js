taskHelper = require('../helpers/myfunction.helper')


const addTask = (req, res)=>{
    let data = {
        pageTitle: 'add Task',
        errors :[],
        errorStatus:false
    }
    if(Object.keys(req.query).length != 0){
        if(req.query.title == '') data.errors.push('invalid title')
        if(req.query.content == '') data.errors.push('invalid content')
        if(data.errors.length == 0) {
            myInsertedData = req.query
            myInsertedData.status == 'on'?myInsertedData.status=true : myInsertedData.status=false;
            myInsertedData.id = Date.now()
            result = taskHelper.addData(myInsertedData)
            if(!result.helperStatus) {
                data.errors.push("cann't add to json file")
                // data.errorStatus=true
            }
//             else{
// res.redirect('/')
//             }
        }
        if(data.errors.length ==0)  res.redirect('/')
        data.errorStatus=true

    }
    res.render('add', data) // res.render('add', {name:'marwa',age:36})
}


const showAll = (req, res)=>{
    allTasks = taskHelper.readData()
    data = {
        pageTitle: 'all Tasks',
        tasks: allTasks,
        tasksLen: (allTasks.length==0?true:false)
    }
    res.render('all', data)
}

const showSingle = (req, res)=>{
    let editFinishedFlag=false
    if(req.query.success)
    editFinishedFlag=true

    let editStat=req.query.success

    let data = {
        pageTitle: 'single Task',
        status: true,
        editFinished:editFinishedFlag,
        editStatus: (req.query.success === 'true')
    }
    const id = req.params.id
    const allTasks = taskHelper.readData()
    let record = allTasks.find(task=> task.id == id )
    if(!record) data.status=false
    else data.myData=record
    res.render('single', data)
}
const deleteTask = (req, res)=>{
    const id = req.params.id
    const allTasks = taskHelper.readData()
    let record = allTasks.findIndex(task=> task.id == id )
    if(record!=-1) {
        allTasks.splice(record,1)
        taskHelper.writeData(allTasks)
    }

    res.redirect('/')
}
const editTask = (req, res)=>{
    data = {
        pageTitle: 'edit Task',
        errors :[],
        errorStatus:false
    }
    id = req.params.id
    const allTasks = taskHelper.readData()
    index=allTasks.findIndex(task=> task.id == id)
    let record = allTasks[index]
   // console.log(Object.keys(req.query).length)
    if(Object.keys(req.query).length != 0){
          if(req.query.title == '') data.errors.push('invalid title')
          if(req.query.content == '') data.errors.push('invalid content')
          if(data.errors.length == 0) {
              myInsertedData = req.query
              myInsertedData.status == 'on'?myInsertedData.status=true : myInsertedData.status=false;
              myInsertedData.id = id
              allTasks[index]=myInsertedData
              result = taskHelper.writeData(allTasks)
          }
          else{
              // res.redirect(`/showSingle/${id}?success=false`)
                data.errorStatus=true
                data.myData=record
                res.render('edit', data)
          }

          if(data.errors.length ==0)  res.redirect(`/showSingle/${id}?success=true`)
      }
      else{
            console.log(Object.keys(req.query))
            data.myData=record
            res.render('edit', data)
}
}

module.exports={ addTask, editTask, showAll, showSingle, deleteTask }