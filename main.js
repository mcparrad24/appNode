//Realizado por: Maria Camila Parra Díaz
//Código: 201819464

const axios = require('axios');
const { table } = require('console');
const fs = require('fs');
const http = require('http');

let proveedores = [];
let clientes = [];

//Modificación página web (index.html)
fs.readFile("index.html", (err, data) => {
    if (err){
        throw err;
    }
    //Obtención de archivo JSON proveedores
    axios.get('https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json')
        .then((res) => {
            proveedores = res;
        })
        .catch(err =>{
         console.log(err.toJSON);
        });
    //Obtención de archivo JSON clientes
    axios.get('https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json')
        .then((res) => {
            clientes = res;
        })
        .catch(err =>{
            console.log(err.toJSON);
        });
    //Mostrar datos en una table de clase table-striped
    tablaProv(proveedores); 
    });

//Servidor web
http.createServer((req, res) => {
    if(req.method === 'GET'){
        if(req.url === '/api/proveedores'){
            fs.readFile("prov.html", (err, data) => {
                if(err){
                    throw err;
                }
                res.write(data);
            });
        } else if(req.url === '/api/clientes'){
            fs.readFile("clien.html", (err, data) => {
                if(err){
                    throw err;
                }
                res.write(data);
            });
        }
    }
}).listen(8001);

