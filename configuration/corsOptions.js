const allowList = ['http://localhost:3000', 'http://127.0.0.1:5173']

const corsOptions = {
    origin: (origin, callback) => {
        if (allowList.indexOf(origin) !== -1 || !origin) {
            callback(null,true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: "GET, HEAD, POST, PUT, DELETE, PATCH",
    optionsSuccessStatus: 200
}


module.exports = corsOptions
