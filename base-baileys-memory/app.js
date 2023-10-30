const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


const flowSecundario = addKeyword(['siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])
const flowPortatil = addKeyword('Portatil').addAnswer('El mantenimiento del *porati*l tiene un valor de 15000')
const flowComputador = addKeyword('Portatil').addAnswer('El mantenimiento del *Computador* tiene un valor de 20000')
const flowImpresora = addKeyword('Portatil').addAnswer('El mantenimiento del *Impresora* tiene un valor de 30000')
const flowCelular = addKeyword('Portatil').addAnswer('El mantenimiento del *Celular* tiene un valor de 50000')


const flowMantenimiento = addKeyword(['Mantenimiento','mantenimiento'])
.addAnswer([
    '📄 Se brinda servicio de mantenimiento a los siguientes equipos: ',
    'Portatil 💻',
    'Computador 🖥️',
    'Impresora 🖨️',
    'Celular 📱'],
    null,
    null,
    [flowPortatil,flowComputador,flowImpresora,flowCelular]
)

const flowInstalacion = addKeyword(['Instalacion','instalacion']).addAnswer(['Se hace instalaciones de: ','Juegos clasicos','Setup Gamer','Software'],
'Se envian soportes de imagen',{
    media:'https://i.imgur.com/W7HyVJx.png'
}
// ,
// 'Juegos clasicos',{
//     media:'https://i.imgur.com/2txCjNc.jpeg'
// }


)

const flowServicios = addKeyword(['Servicios', 'servicio']).addAnswer(
    [
        '📄 Estos son los servicios que actualmente prestamos',
        '1) *Mantenimiento* de equipos',
        '2) *Instalacion* de equipos',
        '3) *Instalacion* de software',
        '4) *Instalacion* de camaras de seguridad',
        '\n *siguiente* para ver mas opciones',
    ],
    null,
    null,
    [flowSecundario,flowMantenimiento,flowInstalacion]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowCalcular = addKeyword(['Cacular','calcular']).addAnswer(['Buenas cuales son los datos que deseas calcular'],

    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'Hola', 'alo', 'inicio']).addAnswer('Bienvenido, en que te puedo colaborar?')
    .addAnswer(
    [
        'te comparto los siguientes links de interes sobre el proyecto',
        '👉 *Servicios* para ver los servicios que se brindan',
        '👉 *Calcular*  para hacer calculos sencillos',
        '👉 *Soport* Comunicarte con un tecnico',
    ],
    null,
    null,
    [flowServicios, flowGracias, flowTuto, flowCalcular]
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