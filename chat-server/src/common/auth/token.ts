import * as  jwt from 'jsonwebtoken'
const GenerateToken = (user) => {
  const token = jwt.sign({
    userID: user.name,
    signedAt: new Date()
  }, 'KEY', {
    expiresIn: '30d'
  })
  return token
}
export { GenerateToken }
