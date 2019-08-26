const express = require("express");
const request = require("request");
const app = express();

app.set('json spaces', 2)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    let coin = req.body.crypto;
    let fiat = req.body.fiat;
    let amount = req.body.amount;

    let requestOptions = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: coin,
            to: fiat,
            amount: amount
        }
    }

    request(requestOptions, (err, resp, body) => {
        let data = JSON.parse(body);
        let price = data.price;
        let currentDate = data.time;

        res.write("<p>The current date is " + currentDate + "</p>");
        res.write("<h1>" + amount + coin + " is currently worth " + price + fiat + "</h1>");

        res.send();
    })
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});