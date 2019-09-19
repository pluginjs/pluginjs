import Service from '../service'
import { each } from '@pluginjs/utils'

import amazon from './amazon'
import flipboard from './flipboard'
import pinterest from './pinterest'
import viadeo from './viadeo'
import baidu from './baidu'
import gmail from './gmail'
import pocket from './pocket'
import viber from './viber'
import blogger from './blogger'
import qzone from './qzone'
import vkontakte from './vkontakte'
import buffer from './buffer'
import instapaper from './instapaper'
import reddit from './reddit'
import wechat from './wechat'
import weibo from './weibo'
import delicious from './delicious'
import line from './line'
import skype from './skype'
import whatsapp from './whatsapp'
import digg from './digg'
import linkedin from './linkedin'
import sms from './sms'
import wordpress from './wordpress'
import email from './email'
import livejournal from './livejournal'
import telegram from './telegram'
import xing from './xing'
import evernote from './evernote'
import mailru from './mailru'
import tumblr from './tumblr'
import facebook from './facebook'
import odnoklassniki from './odnoklassniki'
import twitter from './twitter'

const SERVICES = {
  amazon,
  flipboard,
  pinterest,
  viadeo,
  baidu,
  gmail,
  pocket,
  viber,
  blogger,
  qzone,
  vkontakte,
  buffer,
  instapaper,
  reddit,
  weibo,
  wechat,
  delicious,
  line,
  skype,
  whatsapp,
  digg,
  linkedin,
  sms,
  wordpress,
  email,
  livejournal,
  telegram,
  xing,
  evernote,
  mailru,
  tumblr,
  facebook,
  odnoklassniki,
  twitter
}

each(SERVICES, (name, service) => {
  Service(service)

  service.name = name
})

export default SERVICES
