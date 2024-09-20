
export default function extractParam(paramName) {
    return (req, res, next) => {
        req[paramName] = req.params[paramName];
        next();
    };
}
