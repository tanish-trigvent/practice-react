import bcrypt from "bcrypt";

export default async function encrypt() {
    this.password = await bcrypt.hash(this.password, 10);
};