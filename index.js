//import express from 'express' //NO FUNCIONA
const express = require('express');

//Conexion a hoja de datos
const axios = require('axios');

//SE CREA LA APLICACIÓN CONFIGURÁNDOLA
const app = express();

//Importar la clase (se instalo npm i dialogflow-fulfillment)
const {WebhookClient} = require('dialogflow-fulfillment');

//1. url, 2. Función que le dice a express que enviará de respuesta
app.get('/', function (req, res) {
  //const senderID  = agent.request_.body.originalDetectIntentRequest.payload.data.sender.id
  res.send('Hello World')
  res.send(Almacen_Datos);
})

//URL de prueba https://3000.loca.lt/webhook se va a subir a hosting GoDaddy
//POST para INSERTAR
app.post('/webhook', express.json() ,function (req, res) {
  const agent = new WebhookClient({ request:req, response:res }); //para req y res
  // console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
  let sessionId = JSON.stringify(req.body["session"]);
  var arraySep = sessionId.split("/");
  const session = arraySep[arraySep.length-1];
  console.log(session);

  //Variables prueba
  var arrayVariables =  new Array(5);

  //Agregando el dato al arreglo
  arrayVariables.push(session)
  
  function welcome(agent) {
    //const senderID  = agent.request_.body.originalDetectIntentRequest.payload.data.sender.id
    agent.add(`¡¡Hola, soy Mar!! 😄 Te voy a brindar información de las empresas que tienen vacantes disponibles. *Únicamente es información* ‼️`);
    agent.add(`Cualquier otra duda que tengas adicional a la que te brinde, de tu proceso o envío de CV se checa cuando nos pongamos en contacto contigo`);
    agent.add(`Primero, quiero conocer un poco de ti, ¿Cuántos años tienes?`);
  }
  
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  //Consulta hacia la hoja de datos, opcional
  function getData(){
    return axios.get('https://sheet.best/api/sheets/f6e22c14-a37d-4f1f-bb6a-4023af5cfdb5');
  }

  function F_Datos(agent){
    return 
  }

  //Manda los datos a la hoja de calculo
  function F_Edad(agent) {
    let edad = agent.parameters["DatoEdad"];
    console.log(edad);
    agent.add("Sin contar escolaridad trunca.¿De qué grado de estudios que ya hayas concluido tienes certificado?");
    axios.post("https://sheet.best/api/sheets/f6e22c14-a37d-4f1f-bb6a-4023af5cfdb5",{session,edad});
    console.log("Datos enviados");
    return edad;
    //arrayVariables.push(edad);
    //return arrayVariables;
    //Importante para que no se salte lineas en la hoja de calculo es necesario en el metodo post mandar todas las variables
  }


  console.log(arrayVariables);

//   function F_EdadInvalida(agent){
//     let edad = agent.parameters["DatoEdad"];
//     agent.add("Por el momento no tengo alguna vacante en sistema que sea acorde a tu edad, pero te invitó a venir a nuestra sucursal para que te podamos asesorar sobre el procedimiento que llevamos con las vacantes, nos encontramos ubicados en C. P.º de Las Fresas #77, Jardines de Irapuato, 36660 Irapuato, Gto.📍");
//     agent.add("También te invitó a seguirnos en nuestras redes sociales para que estés al tanto de las vacantes que estaremos subiendo https://www.facebook.com/LinkingBajio?mibextid=ZbWKwL");
//     console.log(edad);
//     axios.post("https://sheet.best/api/sheets/f6e22c14-a37d-4f1f-bb6a-4023af5cfdb5",{session,edad});
//     console.log("Datos enviados");
//   }

  //Funcion agregar datos personalizada
//   function agregarDatos(){
//     axios.post("https://sheet.best/api/sheets/f6e22c14-a37d-4f1f-bb6a-4023af5cfdb5",{session,edad});
//     console.log("Datos agregados");
//   }

 

  
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Edad', F_Edad);

  console.log(arrayVariables);
  //intentMap.set('EdadInvalida',F_EdadInvalida);
  
  // intentMap.set('EscolaridadPrimaria', F_Escolaridad);
  // intentMap.set('EscolaridadSecundaria', F_Escolaridad);
  // intentMap.set('EscolaridadPreparatoria', F_Escolaridad);
  // intentMap.set('Ruta10_Preparatoria', F_Localidad);
  // intentMap.set('Ruta10_Secundaria', F_Localidad);
  // intentMap.set('Ruta10_SoloPrimaria', F_Localidad);
  // intentMap.set('Ruta11', F_Localidad);
  // intentMap.set('Ruta12_Preparatoria', F_Localidad);
  // intentMap.set('Ruta12_Secundaria', F_Localidad);
  // intentMap.set('Ruta13_Secundaria', F_Localidad);
  // intentMap.set('Ruta13_SoloPrimaria_OtrasVacantes', F_Localidad);
  // intentMap.set('Ruta13_SoloPrimariaInverso', F_Localidad);
  // intentMap.set('Ruta14_Secundaria', F_Localidad);
  // intentMap.set('Ruta1_Preparatoria', F_Localidad);
  // intentMap.set('Ruta1_Secundaria', F_Localidad);
  // intentMap.set('Ruta2_Preparatoria', F_Localidad);
  // intentMap.set('Ruta2_Secundaria', F_Localidad);
  // intentMap.set('Ruta2_SoloPrimaria', F_Localidad);
  // intentMap.set('Ruta3', F_Localidad);
  // intentMap.set('Ruta4_Preparatoria', F_Localidad);
  // intentMap.set('Ruta4_Secundaria', F_Localidad);
  // intentMap.set('Ruta5_Preparatoria', F_Localidad);
  // intentMap.set('Ruta5_Secundaria', F_Localidad);
  // intentMap.set('Ruta6_Preparatoria', F_Localidad);
  // intentMap.set('Ruta6_Secundaria', F_Localidad);
  // intentMap.set('Ruta7_Secundaria', F_Localidad);
  // intentMap.set('Ruta7_SoloPrimaria', F_Localidad);
  // intentMap.set('Ruta7_SoloPrimaria_OtrasVacantes', MostrarDatosLocalidad);
  // intentMap.set('Ruta7_SoloPrimariaInverso', MostrarDatosLocalidad);
  // intentMap.set('Ruta8_BILSTEIN', MostrarDatosLocalidad);
  // intentMap.set('Ruta8_Secundaria', MostrarDatosLocalidad);
  // intentMap.set('Ruta9', MostrarDatosLocalidad);
  // intentMap.set('Comunicarse', MostrarDatosNombre);

//Para envíar la respuesta
  //intentMap.set('DefaultWelcomeIntent', DefaultWelcomeIntent);
  //intentMap.set('DefaultWelcomeIntent', MostrarDatos);
  //intentMap.set('Edad', MostrarDatos);
  agent.handleRequest(intentMap);
});


//Víncula la aplicación al puerto de escucha de nuestra máquina
app.listen(3000,() => {
    console.log("conect" + 3000);
});

