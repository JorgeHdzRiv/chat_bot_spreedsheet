//import express from 'express' //NO FUNCIONA
const express = require('express');

//SE CREA LA APLICACIÓN CONFIGURÁNDOLA
const app = express();

let resultado;

function suma(){
    resultado = 5+10;
    return resultado;
}

console.log(resultado)

app.listen(3000,() => {
    console.log("conect" + 3000);
});