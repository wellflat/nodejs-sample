// error middleware
export function errorHandler(err, req, res, next) {
    console.error(err);
    let message = '';
    let code = 500;
    if (err.message) {
        message = err.message;
    } else {
        message = 'error occured';
    }
    if (err.code) {
        code = err.code;
    }
    res.status(code).json({ message: message });
};