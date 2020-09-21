import * as  jwt from 'jsonwebtoken'
const GenerateToken = (user) => {
  console.log(user)
  const token = jwt.sign({
    userID: user.id,
    signedAt: new Date()
  }, 'KEY', {
    expiresIn: '30d'
  })
  return token
}
const VerifyToken = (token) => {
  console.log(token)
  const user = jwt.verify(token, 'KEY')
  return user
}
export { GenerateToken, VerifyToken }
