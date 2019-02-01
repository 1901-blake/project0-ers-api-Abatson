export function logUrlMethod(req, res, next) {
    // console.log('headers:', req.headers);
    console.log(`request with url ${req.path} and method ${req.method}`);
    next();
};