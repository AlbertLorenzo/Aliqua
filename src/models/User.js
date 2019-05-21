const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const {
    Schema
} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    strict: true
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcryptjs.genSalt(2);
    const hash = bcryptjs.hash(password, salt);
    return hash;
}; 

UserSchema.methods.matchPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
} 

module.exports = mongoose.model('User', UserSchema);
