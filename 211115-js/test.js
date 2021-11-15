import flex from './template/flex.js'
// nodejs 內建的，不用裝
import util from 'util'
import fs from 'fs'

flex.altText = 'abc'

fs.writeFileSync('./tes.json', JSON.stringify(flex, null, 2))

console.log(util.inspect(flex, true, null))
