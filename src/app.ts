import Server from "./server";

require("dotenv").config();

const port = parseInt(process.env.PORT || "8080");

const starter = new Server()
    .start(port)
    .then((port) => {
        console.log(`Server started on port ${port}`);
    })
    .catch((err) => {
        console.error(err);
    });

export default starter;
