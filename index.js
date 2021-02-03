const { command } = require('./command');
const { init } = require('./convert');
const { commandExists, fileExists, fileExtension } = require('./validations');

try{
    //lectura de comando
    const argv = command();

    //valida existe comando convert
    commandExists(argv._[0]);

    //valida archivo existe
    fileExists(argv.file);

    //valida extensión correcta
    fileExtension(argv);

    //inicia conversión
    init(argv);
}catch(error){
    console.log(error);
    process.exit(1); 
}