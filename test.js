const level = require('level')
const sublevel = require('level-sublevel/bytewise')

let db = sublevel(level('./db2', { valueEncoding: 'json' }))
let meta = db.sublevel('meta')

meta.put(['dadam', 2], { name: 'some2' }, err => {
  if (err) {
    return console.log(err)
  }
  console.log('OK')
})

meta
  .createReadStream({ gte: ['dadam', null], lte: ['dadam', undefined] })
  .on('data', (err, data) => {
    if (err) {
      return console.log(err)
    }
    console.log(data)
  })
