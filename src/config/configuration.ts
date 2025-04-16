export default () => {
    return {
        db:{
            uri: process.env.MONGO_URI
        },
        jwt:{
            secret: process.env.JWT_SECRET,
            expiry: process.env.JWT_EXPIRY
        }
        
    }
}