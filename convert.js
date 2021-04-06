var xml2js = require('xml2js');
var parser = new xml2js.Parser({explicitArray:false, mergeAttrs : true});
var iconv = require('iconv-lite');
const fs = require('fs');

exports.toJSON = (fileName) => {
    const fileNameNoExt = fileName.replace(".xml", "").replace(".XML", "");
    fs.readFile('./archivos/'+fileName, (err, data) => {
        const xml = iconv.decode(data, "UTF-8");
        try{
            parser.parseString(xml, function (err, result) {
                fs.writeFile("./conversiones/"+fileNameNoExt+".json", JSON.stringify(result, null, 4), function(err) {
                    if (err) {
                        console.log("Error al guardar " + fileName);
                        process.exit(1); 
                    }
                }); 
            console.log(fileName + " convertido en "+fileNameNoExt + ".json");
            });
        }catch(error){
            console.log("Error al convertir " + fileName);
            process.exit(1); 
        }
    });
}

exports.toXML = (fileName) => {
    const fileNameNoExt = fileName.replace(".json", "").replace(".JSON", "");
    fs.readFile('./archivos/'+fileName, (err, data) => {
        try{
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(JSON.parse(data));
            fs.writeFile("./conversiones/"+fileNameNoExt+".xml", xml.toString(), function(err) {
                if (err) {
                    console.log("Error al guardar " + fileName);
                    process.exit(1); 
                }
            }); 
            console.log(fileName + " convertido en "+fileNameNoExt + ".xml");
        }catch(error){
            console.log("Error al convertir " + fileName);
            process.exit(1); 
        }
    });
}

exports.allFiles = (fileType) => {
    fs.readdir('./archivos/', (err, files) => {
        files.forEach(file => {
            const ext = file.split('.').pop();
            const allowedExt = (fileType === 'x') ? ['json', 'JSON'] : ['xml', 'XML'];
            if(allowedExt.includes(ext)){
                if(fileType === 'x'){
                    exports.toXML(file);
                }
                if(fileType === 'j'){
                    exports.toJSON(file);
                }
            }
        });
    });
}

exports.init = (argv) => {
    const fileType = (argv.x) ? 'x' : 'j';
    const option = (argv.a) ? 'a' : 's';
    if(option==='a'){
        exports.allFiles(fileType);
    }else{
        if(fileType==='x'){
            exports.toXML(argv.file);
        }else{
            exports.toJSON(argv.file);
        }
    }
}