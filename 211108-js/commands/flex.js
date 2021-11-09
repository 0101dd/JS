import flex from '../template/flex.js'

export default async (event) => {
  flex.altText = '哈囉'
  flex.contents.body.contents[0].text = 'AAA'
  event.reply(flex)
}
