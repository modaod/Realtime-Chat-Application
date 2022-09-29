import { config } from 'dotenv'
import express, {Application, Request, Response} from 'express';
import * as http from 'http'
import * as io from 'socket.io'
import {User} from "./models/user";
import cors from 'cors';

const HTTP_STATUS_CREATED = 201;
const HTTP_SUCCESSFUL_REQUEST = 200;

config();

let userList: User[] = [
    {
        name: 'rojo',
        password: 'sss',
        email: 'mmmm',
        roomId: [1,2]
    }
];

const PORT = process.env.PORT || 3000;

const app: Application = express();

app.post('/api/', (req: Request, res: Response) => {
    const user = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        roomId: []
    };
    userList.push(user);
    res.status(HTTP_STATUS_CREATED).json({message: 'User added !'});
});
app.put('/:id', (req: Request, res: Response) => {
    const name = req.params.id;
    //...
});

app.use(cors());

app.get('', (req:Request, res:Response) => {
    console.log('hello from server!!');
    res.json(userList);
});


let server = http.createServer(app);

let sio: io.Server;
sio = new io.Server(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });

sio.on('connection', (socket) => {
    socket.on('join', (user:string) => {
        socket.join('public');
        socket.emit('joinMsg', `${user} joined the room`);
    });

    socket.on('message', (data: {user: string; message: string}) => {
        console.log('app.ts ' + data.user + ' : ' + data.message);
        sio.in('public').emit('newMessage', data);
    });
});


server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
