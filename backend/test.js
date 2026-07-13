const h = require('http')
const d = '{"email":"ask4coders@gmail.com","password":"password123"}'
const req = h.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {'Content-Type': 'application/json', 'Content-Length': d.length}
}, res => {
  let b = ''
  res.on('data', c => b += c)
  res.on('end', () => console.log(b))
})
req.write(d)
req.end()