import express from 'express';
import mongoose from "mongoose";
import user from "./models/user.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import pharmacyRouter from "./routes/pharmacyRouter.js";
import authentificationRouter from "./routes/authentificationRouter.js"
import auth from "./middlewares/auth.js"
import product from "./models/product.js";
import pharmacy from "./models/pharmacy.js";
import orderRouter from "./routes/orderRouter.js";
import bodyParser from 'body-parser'
const app = express();

const port = process.env.PORT || 9090;

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
    .connect('mongodb+srv://medtech:Kc7VUeSYoeZ7LTjM@atlascluster.qb2ht6o.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log(`Connected to DataBase`);
    })
    .catch(err => {
        console.log(err);
    });

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json()); // Pour analyser application/json
app.use(express.urlencoded({ extended: true })); // Pour analyser application/x-www-form-urlencoded

app.use('/user', userRouter);

app.use('/product', productRouter);

app.use('/pharmacy', pharmacyRouter);

app.use('/orders', orderRouter);

app.post('/register', authentificationRouter);

app.post("/login",authentificationRouter);


app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });

export default app;
