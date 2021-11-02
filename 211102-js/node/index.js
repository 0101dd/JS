// 引用預設匯出
// import 變數 from 檔案或套件
// 檔案必須寫相對路徑 ./ 或 ../
import name from './exportdefault.js'

// 引用具名匯出
// 可以用 as 將變數重新命名
// import { aaa, bbb as b, ccc, edit } from './export.js'
// 同一個東西不要多次引用

// 匯入預設和具名
import exp, * as aaa from './export.js'

console.log(name.firstName)
console.log(name.lastName)
console.log(name.fullName())

// console.log(aaa)
// console.log(b)

// 無法直接修改匯入變數的值
//  ccc = 'aaa'
// console.log(ccc)
// edit()
// console.log(ccc)
console.log(aaa.aaa)
console.log(exp.apple)