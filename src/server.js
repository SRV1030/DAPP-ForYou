const { createServer } = require("http");
const next = require("next");
const routes = require("./routes");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../", ".env") });
const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV.toLowerCase() != 'production' });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    createServer(handler).listen(port, err => {
        if (err) throw err;
        console.log("Ready on localhost:"+`${port}`);
    });
});