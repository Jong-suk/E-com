import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin' , 10),
        isAdmin: true
    },
    {
        name: 'Farmer User',
        email: 'farmer@example.com',
        password: bcrypt.hashSync('farmer' , 10),
        isFarmer: true
    },
    {
        name: 'Mukesh',
        email: 'muki@example.com',
        password: bcrypt.hashSync('muki@5401' , 10)
    },
    {
        name: 'Lokeshwar',
        email: 'loki@example.com',
        password: bcrypt.hashSync('loki@1802' , 10)
    },
    {
        name: 'Abhuthahir',
        email: 'abhu@example.com',
        password: bcrypt.hashSync('abhu@6701' , 10)
    }
]

export default users