import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as mongoose from 'mongoose';

const app = express();

app.use(cors({
    credentials:true
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8000,()=>{
    console.log('Server is running on port 8000');
})

const MONGO_URI= "mongodb+srv://mohamed:mohamed@cluster1.oypor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";


mongoose.Promise 
mongoose.connect(MONGO_URI);
mongoose.connection.on('error',(error:Error)=>{
    console.error('Error connecting to MongoDB:', error.message);
})