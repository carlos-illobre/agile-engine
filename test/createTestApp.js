const createDatabase = require('../database/createDatabase.js')
const createExpressApp = require('../app/createExpressApp.js')
const createLogger = require('../createLogger.js')
const _ = require('lodash')

module.exports = async (that, useLogger) => {

    const logger = createLogger({ silent: !useLogger })
    that.db = await createDatabase({ logger })
    that.app = await createExpressApp({ logger, database: that.db })
    that.db.reset = async () => Promise.all(
        Object
        .values(that.db)
        .filter(object => _.isFunction(object.deleteMany))
        .map(schema => schema.deleteMany())
    )

    await that.db.reset()

}
