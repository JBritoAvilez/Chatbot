const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


const flowSecundario = addKeyword(['siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])
const flowPortatil = addKeyword('Portatil').addAnswer('El mantenimiento del *porati*l tiene un valor de 15000')
const flowComputador = addKeyword('Portatil').addAnswer('El mantenimiento del *Computador* tiene un valor de 20000')
const flowImpresora = addKeyword('Portatil').addAnswer('El mantenimiento del *Impresora* tiene un valor de 30000')
const flowCelular = addKeyword('Portatil').addAnswer('El mantenimiento del *Celular* tiene un valor de 50000')


// const flowMantenimiento = addKeyword(['Mantenimiento','mantenimiento'])
// .addAnswer([
//     '📄 Se brinda servicio de mantenimiento a los siguientes equipos: ',
//     'Portatil 💻',
//     'Computador 🖥️',
//     'Impresora 🖨️',
//     'Celular 📱'],
//     null,
//     null,
//     [flowPortatil,flowComputador,flowImpresora,flowCelular]
// )

// const flowInstalacion = addKeyword(['Instalacion','instalacion']).addAnswer(['Se hace instalaciones de: ','Juegos clasicos','Setup Gamer','Software'],
// 'Se envian soportes de imagen',{
//     media:'https://i.imgur.com/W7HyVJx.png'
// }
// // ,
// // 'Juegos clasicos',{
// //     media:'https://i.imgur.com/2txCjNc.jpeg'
// // }


// )

const flowServicios = addKeyword(['Servicios', 'servicio']).addAnswer(
    [
        'Respuesta automática Clínica Zayma',
        'Para responder tu requerimiento, por favor facilítanos la siguiente información:',    
        ' - Tipo de documento de identidad y número',         
        ' - Teléfono de contacto',        
        ' - Correo electrónico',        
        ' - Estudio o servicio que requiere',        
        '- Foto clara de Autorización',        
        '- Foto clara de Orden médica',        
        '- Historia Clínica',        
        'ATENCION: Teniendo en cuenta que hay múltiples solicitudes por gestionar, te estaremos respondiendo en un periodo de 24 a 48 horas',        
        'Nuestros horario de atención:',        
        'Lunes a viernes: 07:00am a 12:00m y 02:00pm a 04:00pm',        
        'Sábados: 07:00am a 12:00m',        
        'Agradecemos tu comprensión y por utilizar nuestros servicios',        
        ' Si pasado este tiempo no hemos respondido su solicitud, por favor escríbanos de nuevo',       
        'Te recomendamos esperar el tiempo de respuesta informado, ya que se responde desde los últimos mensajes hasta los más recientes'
    ],
    null,
    null
    // [flowSecundario,flowMantenimiento,flowInstalacion]
)

// const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
//     [
//         '🙌 Aquí encontras un ejemplo rapido',
//         'https://bot-whatsapp.netlify.app/docs/example/',
//         '\n*2* Para siguiente paso.',
//     ],
//     null,
//     null,
//     [flowSecundario]
// )

// const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
//     [
//         '🚀 Puedes aportar tu granito de arena a este proyecto',
//         '[*opencollective*] https://opencollective.com/bot-whatsapp',
//         '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
//         '[*patreon*] https://www.patreon.com/leifermendez',
//         '\n*2* Para siguiente paso.',
//     ],
//     null,
//     null,
//     [flowSecundario]
// )

// const flowCalcular = addKeyword(['Cacular','calcular']).addAnswer(['Buenas cuales son los datos que deseas calcular'],

//     null,
//     null,
//     [flowSecundario]
// )

const flowPrincipal = addKeyword(['hola', 'Hola', 'alo', 'inicio']).addAnswer('Bienvenido, en que te puedo colaborar?')
    .addAnswer(
    [   'Respuesta automática Clínica Zayma',
        'Bienvenido(a), a Clínica Zayma. Salud con Calidez Humana.',
        'LEA ATENTAMENTE',
        'Antes de que nos expreses tu solicitud, por favor, conoce las  finalidades y derechos sobre tus datos personales contenidos en ',
        'la política de tratamiento de datos de clínica Zayma, en cumplimiento a lo  establecido en la ley 1581 de 2012 ',
        'https://clinicazayma.org/ClinicaZayma/wp-content/uploads/2020/10/POLITICA-DE-TRATAMIENTO-DE-DATOS-PERSONALES.pdf',
        '¿Para continuar aceptas el tratamiento de tu información? ',
        '(responde enviando el número (1 o 2) de la opción que escoges)',
        '1. 1 Si',
        '2. 2 No'
    ],
    null,
    null,
    [flowServicios,] 
        // flowGracias, flowTuto, flowCalcular]
)

    const flowFinal = addKeyword(['Adios', 'chao', 'Chao', 'chao'])
    .addAnswer('*Hasta luego que tengas una buena tarde*')
    // .addAnswer(
    //     [
    //         'te comparto los siguientes links de interes sobre el proyecto',
    //         '👉 *doc* para ver la documentación',
    //         '👉 *gracias*  para ver la lista de videos',
    //         '👉 *discord* unirte al discord',
    //     ],
    //     null,
    //     null,
    //     [flowDocs, flowGracias, flowTuto, flowDiscord]
    // )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowFinal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()