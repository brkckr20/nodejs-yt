const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    res.setHeader("Content-Type", "text/html");
    /*     res.write("<head><title>Nodejs</title></head>")
        res.write("<h1>Selam</h1>");
        res.end(); */

    let path = "./views/";
    switch (req.url) {
        case "/":
            path += "index.html"
            res.statusCode = 200
            break;
        case "/about":
            path += "about.html"
            res.statusCode = 200
            break;
        case "/about-us":
            res.statusCode = 301
            res.setHeader("Location","/about")
            break;
        default:
            path += "_404.html"
            res.statusCode = 404
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            //    res.write(data);
            res.end(data);
        }
    })


})

server.listen(3000, "localhost", () => {
    console.log("3000 portu calisiyor");
})