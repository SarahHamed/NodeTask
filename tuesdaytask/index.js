/*const express = require('express')
app=express()*/
const app = require('./src/app')
const PORT = 3500
app.listen(PORT, ()=>{
    console.log(`we are live on localhost:${PORT}`)
})