const fs = require('fs');

exports.commandExists = (command) => {
    if(command !== 'convert'){
        console.log('Comando convert requerido');
        process.exit(1);            
    }
}

exports.fileExists = (file) => {
    if (file){
        if(!fs.existsSync('./archivos/'+file)){
            console.log('Archivo ' + file + ' no existe en carpeta archivos');
            process.exit(1);
        }
    }
}

exports.fileExtension = (argv) => {
    const ext = (argv.file) ? argv.file.split('.').pop() : '';
    if(ext){
        if( (argv.j && (ext !== 'xml' && ext !== 'XML')) ||
            (argv.x && (ext !== 'json' && ext !== 'JSON')) ){
            console.log('Formato de archivo inválido');
            process.exit(1);     
        }
    }
}