// backend.js
import express from "express";
import cors from "cors";
import userServices from "./services/user-services.js"

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());


app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    userServices.findUserById(id)
        .then((result) => {
            if(result){
                res.status(200).send(result);
            }
            else{
                res.status(404).send(error);
            }
        })
        .catch((error) =>{
            res.status(500).send(error.name);
        })
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    // Generate a random ID for the user
    userServices.addUser(userToAdd)
                .then((result) => res.status(201).send(result))
                .catch((error) =>{
                    console.log(error);
                });
});

// Existing route to get all users or filter by name
app.get("/users", (req, res) => {
    const name = req.query["name"];
    const job = req.query["job"];
    userServices.getUsers(name, job)
    .then((result) => {
        res.status(200).send({users_list: result});
    })
    .catch((error) =>{
        res.status(500).send(error.name);
    })
});



app.delete("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    userServices.findUserById(id)
        .then((result) => {
            if(result){
                const updatedlist = userServices.deleteUserById(id);
                res.send({users_list : updatedlist});
            }
            else{
                res.status(404).send(error);
            }
        })
    .catch((error) =>{
        res.status(500).send(error.name);
    })
});


app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
