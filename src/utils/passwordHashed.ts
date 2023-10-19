import bcrypt from 'bcrypt';
const saltRounds = 10;
export  function  passwordHashed(password:any) {
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword
}
export  function  comparePassword(password:any, hashPassword:any) {
    const hashedPassword = bcrypt.compareSync(password, hashPassword);
    return hashedPassword
}