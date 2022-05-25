const http = require("https");
const fs = require("fs");
const parse = require("url").parse;
const path = require("path");

const config = {
    candidatesUrl: 'https://www.val.se/download/18.29e9cb2617d171257e63ecf/kandidaturer.csv',
    partiesUrl: 'https://www.val.se/download/18.75995f7b17f5a986a4eebb/deltagande-partier.csv',
    output: './data'
};

var download = (url) => {
    let filename = path.basename(parse(url).pathname);
    let destination = path.join(config.output, filename);

    return new Promise((resolve, reject) => {
        var file = fs.createWriteStream(destination);

        var request = http.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to retrieve ${url} (Status ${response.statusCode})`));
                return;
            }
            response.pipe(file);

            file.on('finish', () => {
                file.close(() => {
                    resolve();
                });
            });
        }).on('error', (err) => {
            fs.unlink(destination);

            promise.reject(err);
        })
    });
};

(async () => {
    await Promise.all([
        download(config.candidatesUrl),
        download(config.partiesUrl)
    ]).then(() => {
        console.log('Finished download.');
    }).catch((results) => {
        console.log(results);
        results.forEach(console.log);
        process.exit(1);
    })
})();
