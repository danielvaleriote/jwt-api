const express = require("express");
const app = express();

const port = process.env.PORT || 3500;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port, () => console.log(`Server is listening to ${port}.`));