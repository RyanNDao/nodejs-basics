import * as http from "http";
import * as fs from "fs/promises";
import {URL} from "url";

http.createServer((req, resp) => {
    let url = req.url === '/' ? 'index.html' : req.url.replace('/','')
    async function NavigateToPage() {
        try {
            const data = await fs.readFile(url)
            WriteToPageFromFile(resp, data, 200)
        } catch (error) {
            const data = await fs.readFile('404.html');
            WriteToPageFromFile(resp, data, 404);
        }
    }
    NavigateToPage();
}).listen(8080);

function WriteToPageFromFile (resp, data, statusCode) {
    resp.writeHead(statusCode, {'Content-Type': 'text/html'});
    resp.write(data)
    return resp.end()
}