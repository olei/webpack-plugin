

var data = {
  result: "SUCCESS",
  interfaceVersion: "1.0.3",
  requested: "10/17/2013 15:31:20",
  lastUpdated: "10/16/2013 10:52:39",
  tasks: [
    {id: 104, complete: false,            priority: "high",
              dueDate: "2013-11-29",      username: "Scott",
              title: "Do something",      created: "9/22/2013"},
    {id: 105, complete: false,            priority: "medium",
              dueDate: "2013-11-22",      username: "Lena",
              title: "Do something else", created: "9/22/2013"},
    {id: 107, complete: true,             priority: "high",
              dueDate: "2013-11-22",      username: "Mike",
              title: "Fix the foo",       created: "9/22/2013"},
    {id: 108, complete: false,            priority: "low",
              dueDate: "2013-11-15",      username: "Punam",
              title: "Adjust the bar",    created: "9/25/2013"},
    {id: 110, complete: false,            priority: "medium",
              dueDate: "2013-11-15",      username: "Scott",
              title: "Rename everything", created: "10/2/2013"},
    {id: 112, complete: true,             priority: "high",
              dueDate: "2013-11-27",      username: "Lena",
              title: "Alter all quuxes",  created: "10/5/2013"}
  ]
}

var pipe = (...fns) => val => fns.reduce((a, b) => b(a), val)

const formalGreeting = name => `Hello ${name}`
const casualGreeting = name => `Sup ${name}`
const male = name => `Mr. ${name}`
const female = name => `Mrs. ${name}`
const doctor = name => `Dr. ${name}`
const phd = name => `${name} PhD`
const md = name => `${name} M.D.`

const gred = (name, options) => {
  return pipe(
    options.male ? male : options.doctor ? doctor : female,
    options.formal ? formalGreeting : casualGreeting,
    options.md ? md : phd
  )(name)
}
gred('jzb', {formal: true, md: true})

var splitStr = s => s.split(' ')
var getLen = w => w.length
var getLenArr = arr => arr.map(getLen)
var getB = (a, b) => a > b ? a: b
var getBigger = arr => arr.reduce(getB)
var getLongestWordLength = pipe(
  splitStr,
  getLenArr,
  getBigger
)
getLongestWordLength('Lorem ipsum dolor sit amet consectetur adipiscing elit')

var getO = obj => attr => obj[attr]
var getAttr = o => getO(o)('tasks')
var getF = o => o.filter(i => !i.complete)
var sortByDueDate = o => o.sort((a, b) => a.dueDate > b.dueDate)
var getFn = pipe(
  getAttr,
  getF,
  sortByDueDate
)
getFn(data)

var add = x => y => x + y
var lte = x => x >= 10
var diff = fn => x => fn(x) ? 0 : x
var gLen = x => x.length - 1
var getT = arr => fn => fn(arr)

var pi = arr => base => {
  var x = true, put = false, l = getT(arr)(gLen)
  nArr = arr.reverse().map((i, index) => {
    if (!x) return i
    var h = diff(lte)(add(base)(i))
    x = !h
    put = x && index === l
    return h
  })
  put ? nArr.push(1) : nArr
  return nArr.reverse()
}
console.time('start')
var arr = pi([9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9])(1)
console.timeEnd('start')



let Z = {}
Z.len       = x => x.length
Z.firstSize = str => x => str.substr(x, 1)
Z.gt        = x => y => x > y
Z.lt        = x => y => x < y
Z.and       = x => y => x && y
Z.equals    = x => y => x === y

function getLongStr (str) {
  if (!Z.len(str)) return str
  let saveArr = []
  while(Z.and(Z.len(str))(Z.gt(Z.len(str))(Z.len(saveArr)))) {
    let arr = []
    let i = 0
    let l = Z.len(str)
    for (; i < l; i++) {
      let w = Z.firstSize(str)(i) //str.substr(i, 1)
      if (!Z.len(arr.filter(Z.equals(w)))) arr.push(w)
      else break
    }
    if (Z.lt(Z.len(saveArr))(Z.len(arr))) saveArr = arr
    str = str.substr(1)
  }
  return saveArr.join('')
}


class Publisher {
  constructor () {
    this.clientList = {}
  }
  add (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  }
  trigger (...args) {
    const type = Array.prototype.shift.call(args)
    const fns = this.clientList[type]
    if(!fns || !fns.length){
      return false
    }
    fns.forEach(fn => {
      fn.apply(null, args)
    })
  }
  remove (key, fn) {
    if (!key) return false
    const fns = this.clientList[key]
    if(!fns || !fns.length){
      return false
    }
    if (!fn) {
      this.clientList[key] = []
      return true
    }
    this.clientList[key] = fns.filter(i => i !== fn)
  }
}

let Sesamecakeshop = new Publisher()

function subscriber1 (type, name) {
  console.log('clent1', type, name)
}
 
function subscriber2 (type, name) {
  console.log('clent2', type, name)
}

function subscriber3 (type, name) {
  console.log('clent3', type, name)
}

Sesamecakeshop.add('1', subscriber1)
Sesamecakeshop.add('1', subscriber2)
Sesamecakeshop.add('2', subscriber3)

Sesamecakeshop.trigger('1', '椒盐', 'jzb')



class Player {
  constructor (name, teamColor) {
    this.name = name
    this.teamColor = teamColor
    this.state = 'live'
  }
  win () {
    console.log(`${this.name} 胜利！`)
  }
  lose () {
    console.log(`${this.name} 失败`)
  }
  die () {
    this.state = 'dead'
    // playerDirector.playerDead(this)
    playerDirector.reciveMessage('playerDead', this)
  }
  msg (msg) {
    console.log(msg)
  }
}

playerDirector = (function() {
  let players = {}
  let methods = {}
  methods.addPlayer = player => {
    const teamColor = player.teamColor
    if (!players[teamColor]) players[teamColor] = []
    players[teamColor].push(player) 
  }
  methods.playerDead = player => {
    const teamColor = player.teamColor
    const teamPlayers = players[teamColor].filter(i => i.state !== 'dead')
    players[teamColor].forEach(item => {
      item.msg(`${item.name} -> ${player.name} dead`)
      if (!teamPlayers.length) {
        item.lose()
      }
    })
    if (!teamPlayers.length) {
      for (let i in players) {
        if (i !== teamColor) methods.enemyPlayer(players[i])
      }
    }
    // players[teamColor] = teamPlayers
  }
  methods.enemyPlayer = enemy => {
    enemy.forEach(i => {
      i.win()
    })
  }

  const reciveMessage = (...args) => {
    const message = Array.prototype.shift.call(args)
    methods[message].apply(null, args)
  }

  return {
    reciveMessage: reciveMessage
  }
})()

const player1 = playerFactory('player1', 'red')
const player2 = playerFactory('player2', 'red')
const player3 = playerFactory('player3', 'red')
const player4 = playerFactory('player4', 'blue')
const player5 = playerFactory('player5', 'blue')
const player6 = playerFactory('player6', 'blue')

function playerFactory (name, team) {
  const player = new Player(name, team)
  playerDirector.reciveMessage('addPlayer', player)
  return player
}

player1.die()

class JClass {
  constructor () {
    this.name = '1'
    this.age = 30
    this.data = {a: 1}
  }
  fn1 () {
    console.log(1)
  }
  fn2 () {
    console.log(2)
  }
}

class PClass {
  constructor () {
    this.name = '2'
  }
  fn1 () {
    console.log(3)
  }
  fn3 () {
    console.log(4)
  }
}

function mixin (...mixins) {
  class Mix {}
  for (let mixin of mixins) {
    copyProperty(Mix, mixin) // 实例
    copyProperty(Mix.prototype, mixin.prototype) // prototype
  }
  return Mix
}

function copyProperty (target, source) {
  const keys = Reflect.ownKeys(source)
  for (let key of keys) {
    if (key !== "constructor" && key !== "prototype" && key !== "name") {
      const source_desc = Object.getOwnPropertyDescriptor(source, key)
      Object.defineProperty(target, key, source_desc)
    }
  }
}

class DistributedEdit extends mixin(JClass, PClass) {
  constructor (props) {
    super(props)
    this.name = '3'
  }
}

const sl = new DistributedEdit()