import app from "./app";
const PORT = process.env.PORT;

app.listen(PORT, () =>{
    console.log(`server en el puerto ${PORT}`)
})