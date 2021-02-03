const yargs = require('yargs');

exports.command = () => {
    const argv = yargs
    .command(
        'convert',
        'Convierte un archivo de XML a JSON o viceversa. \n Ej: convert -j --file archivo.xml',
        yargs =>
        yargs
            .option('j', {
                describe: 'Convierte un archivo XML a JSON'
            })
            .option('x', {
                describe: 'Convierte un archivo JSON a XML'
            })
            .option('a', {
                describe: 'Convierte todos los archivos a la opción indicada'
            })
            .positional('file', {
                describe: 'Archivo a convertir',
                alias: 'f',
                default: ''
            })
            .check(function(argv){
                if (!argv.j && !argv.x) {
                    throw new Error('Opciones de conversión requeridas -j o -x');
                }
                if (argv.a && argv.file) {
                    throw new Error('Solo se puede seleccionar archivo único o todos');
                }
                if (!argv.a && (argv.file===true || !argv.file)) {
                    throw new Error('Selección de archivos requerida (--file, -a)');
                }
                return true
            })
    )
    .demandCommand(1, 'Comando convert requerido')
    .argv;

    return argv;
}