import { CorsOptions } from 'cors'

const cors: CorsOptions = {
    methods: 'GET, POST, OPTIONS, DELETE, PUT, PATCH',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    origin: '*'
}

export default cors;