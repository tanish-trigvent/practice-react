import { User } from "../models/index.js"

export default async function createAdmin() {
    try {
        const isAdmin = await User.findOne({ role: 'admin' });
        if (!isAdmin) {
            const adminUser = new User({
                firstName: 'Admin',
                lastName: 'User',
                email: process.env.DEFAULT_EMAIL_ADDRESS,
                password: process.env.DEFAULT_PASSWORD,
                role: 'admin'
            })
            console.log(adminUser)
            await adminUser.save();
        }

    } catch (error) {
        console.log(error)
    }

}