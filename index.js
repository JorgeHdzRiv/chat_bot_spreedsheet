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

  //Manda los datos a la hoja de calculo
  function F_Edad(agent) {
    let edad = agent.parameters["DatoEdad"];
    console.log(edad);
    axios.post("https://sheet.best/api/sheets/f6e22c14-a37d-4f1f-bb6a-4023af5cfdb5",{session,edad});
    //Importante para que no se salte lineas en la hoja de calculo es necesario en el metodo post mandar todas las variables
    agent.add("Dato guardado")
    agent.add("Sin contar escolaridad trunca...¿De qué grado de estudios que ya hayas concluido tienes certificado?");
  }

  //Funcion agregar datos personalizada
//   function agregarDatos(){
//     axios.post("https://sheet.best/api/sheets/f6e22c14-a37d-4f1f-bb6a-4023af5cfdb5",{session,edad});
//     console.log("Datos agregados");
//   }

 
//DATOS
/*function queryBDAgregarDatos(connection){
  return new Promise((resolve, reject)=>{
  //Variables
  let edad = agent.parameters["DatoEdad"];
  let localidad = agent.parameters["DatoLocalidad"];
  let escolaridad = agent.parameters["DatoEscolaridad"];
  let nombre = agent.parameters["DatoNombre"];
//let edad = agent.parameters["DatoEdad"];
//¿Qué consulta quiero hacer a mi BD?
  connection.query(`INSERT INTO tablacandidatoschat (Edad, Escolaridad, Localidad, Nombre) VALUES (?,?,?,?)`,[edad, escolaridad, localidad, nombre],(error, results, fields) => {
    resolve(results);
  });
})
}
function welcome(agent) {
  return cnxBD()
    .then(connection => {
      return queryBDAgregarDatos(connection)
    .then(result =>{
      console.log(result);
      agent.add(`Gracias, nos pondremos en contacto.`);
      connection.end()
     });
   });
}*/

  
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Edad', F_Edad);
  
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
  //agregarDatos();
});
//Víncula la aplicación al puerto de escucha de nuestra máquina
app.listen(3000,() => {
    console.log("conect" + 3000);
});

