const express = require('express');
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8000
const fs = require('fs')

const fetchData = () => {
    let data = 'test';
    return fs.readFileSync('./data/cases.json', 'utf-8', (err, data) => {
        if (err)
            data = JSON.stringify(err)
        else {
            const cases = JSON.parse(data)
            data = JSON.stringify(cases)
        }
        return data;
    })
}

app.use(cors())


app.get('/', (req, res) => {
    res.json({ message: 'welcome to job application' })
})

app.use('/cases', (req, res) => {
    res.json(fetchData())
})


app.listen(PORT, () => {
    console.log("Listening at port " + PORT)
})




// const http = require('http');
// const fs = require('fs')
// const PORT = process.env.PORT || 8000;
// const server = http.createServer(requestHandler);
// // const socketio = require('socket.io');
// // const io = socketio(server);

// const fetchData = () => {
//     let data = 'test';
//     return fs.readFileSync('./data/cases.json', 'utf-8', (err, data) => {
//         if (err)
//             data = JSON.stringify(err)
//         else {
//             const cases = JSON.parse(data)
//             data = JSON.stringify(cases)
//         }
//         return data;
//     })
// }

// function requestHandler(req, res) {
//     if (req.url == '/cases' && req.method == 'GET') {
//         res.end(fetchData())
//     }
// }


// // io.on('connection', (socket) => {
// //     console.log('we have a new connection ' +socket.id)
// //     const data = fetchData()
// //     const interval = setInterval(() => {
// //         const data = fetchData()
// //         socket.emit('cases', data)
// //         socket.off('cases', ()=>{
// //             console.log('listening off')
// //         });    
// //     }, 3600000 );

// //     socket.on('disconnect', function () {
// //         socket.removeAllListeners();
// //         clearInterval(interval);
// //         console.log('connection closed')
// //     });
// // })

// server.listen(PORT, () => {
//     console.log("Listening at port " + PORT)
// })
