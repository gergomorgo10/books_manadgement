const renderErrorHandler = (res, err) => {
    res.status(500).json({
        message: err.message || "smth went wong",
    })
};

module.exports = renderErrorHandler;