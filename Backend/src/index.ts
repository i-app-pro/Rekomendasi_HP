import express from 'express';
import cors from 'cors';
import eventRoute from './routes/eventRoute';
import categoryRoute from './routes/categoryRoute';
import pembicaraRoute from './routes/pembicaraRoute';
import authRoute from './routes/authRoute';
import profileRoute from './routes/profileRoute';

const app = express();
const port = process.env.port || 3000; 

console.log("DATABASE_URL:", process.env.DATABASE_URL);

app.use(cors({
  origin: ["https://utsskbpemweb.vercel.app",
  "http://localhost:5173"], 
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Ini adalah API untuk Invofest');
});

app.use('/events', eventRoute);
app.use('/categories', categoryRoute);
app.use('/speeker', pembicaraRoute);
app.use('/auth', authRoute);
app.use("/", profileRoute);

app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`)
});