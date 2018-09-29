import { isString } from '@pluginjs/is'

export default function punctuationize(input) {
  if (!isString(input)) {
    return input
  }

  return input.replace(
    /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~¡¦§«°¶·»¿×÷ˉ،‖‘’“”†‡•…‰‱′″‴‹›※⁄№−∕、。〈〉《》「」『』【】〔〕〖〗︳︴﹌﹏﹝﹞﹤﹪！＃＆（）＊＋，－：；＜＝＞？＠［］＿～￣]/g,
    ''
  )
}
