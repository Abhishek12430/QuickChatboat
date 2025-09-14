 import express from 'express'
 import 'dotenv/config'
 import cors from 'cors'
 import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import creditsRouter from './routes/creditRoutes.js';
import { stripeWebhooks } from './controllers/webhooksController.js';


 const app = express();
   await connectDB()

  app.use(cors());
  app.use(express.json());


   //Stripe Webhooks
   app.post('/api/stripe',express.raw({type:'application/json'}),
   stripeWebhooks)
  



  app.get('/',(req,res)=> res.send('server is live'));
  app.use('/api/user',userRouter)
  app.use('/api/chat',chatRouter)  
  app.use('/api/message',messageRouter)  
  app.use('/api/credits',creditsRouter)
  const PORT = process.env.PORT||3000

  app.listen(PORT,()=>{
    console.log(`Server is running on Port${PORT}`)
  })
 
