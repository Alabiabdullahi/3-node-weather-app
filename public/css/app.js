// const { response } = require("express")

// const { response } = require("express")

console.log('testing microphone')


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1= document.getElementById('err1')
const message2= document.getElementById('err2')


message1.addEventListener('click',()=>{
    console.log('Testing')
})

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location= search.value

    // console.log(location)
    message1.textContent='Loading...'
    message2.textContent=''


    fetch('/weather?address='+ location)
    .then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent=data.error
            }else{
                message1.textContent=data.location
                message2.textContent=data.forecast
            console.log(data.location)
            console.log(data.forecast)
            }
        })
    })
})