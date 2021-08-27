const ERROR_HANDLERS = {
    JsonWebTokenError: (res) => 
        res.status(401).json({error: 'token missing or invalid'}),

    defaultError: res=> res.status(500).end()
}

module.exports = (error, req, res, next) => {
    const handler = 
        ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
    handler(res, error)
}