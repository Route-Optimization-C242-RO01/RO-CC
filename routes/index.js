const users = require('./users')
const ToDo = require('./ToDo')
const optimize = require('./optimize')
const server = {}

server.users = users
server.ToDo = ToDo
server.optimize = optimize

module.exports = server