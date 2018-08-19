const glob = require('glob')
const path = require('path')

module.exports = async ({
    logger,
}) => {

    const db = glob.sync('../models/**/*.js', { cwd: __dirname })
    .filter(filename => !filename.endsWith('.test.js'))
    .map(filename => {
        return {
            schema: require(filename),
            name: path
            .basename(filename)
            .replace(path.extname(filename), ''),
        }
    })
    .reduce((db, {name, schema}) => {
        return {
            ...db,
            [name]: schema,
        }
    }, {})

    return db

}

