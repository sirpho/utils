import {Decimal} from 'decimal.js'

type Digit = number | string

/**
 * 加法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export const add = (arg1: Digit = 0, arg2: Digit = 0) => {
  return Decimal.add(arg1 || 0, arg2 || 0).toNumber();
};
/**
 * 减法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export const subtract = (arg1: Digit = 0, arg2: Digit = 0) => {
  return Decimal.sub(arg1 || 0, arg2 || 0).toNumber();
};

/**
 *  * 乘法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export const multiply = (arg1: Digit = 0, arg2: Digit = 0) => {
  return Decimal.mul(arg1 || 0, arg2 || 0).toNumber()
};
/**
 * 除法
 * @param arg1
 * @param arg2
 * @returns {number}
 */
export const divide = (arg1: Digit = 0, arg2: Digit = 0) => {
  return Decimal.div(arg1 || 0, arg2 || 0).toNumber()
};

// ================================数字转换====================================
/**
 * 将数字千分位分隔
 * @param num | string 数字
 * @return {String} 千分位串
 */
export const thousandsSeparator = (num: Digit): string => {
  const [integerPart, decimalPart] = num.toString().replaceAll(',', '').split(".");
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
}

/**
 * 转成百分比形式
 * @param num
 * @param rate
 */
export const percentage = (num: Digit, rate: number = 100): string => {
  return `${multiply(num, rate)?.toFixed(2)}%`
}

const NUM: string[] = '零一二三四五六七八九'.split('')
const UNIT: string[] = '零十百千万十百千亿十百千万十百千'.split('')
const ZERO: string[] = '零零零零万零零零亿零零零万零零零'.split('')

const MONEY_NUM: string[] = '零壹贰叁肆伍陆柒捌玖'.split('')
const MONEY_UNIT: string[] = '零拾佰仟万拾佰仟亿拾佰仟'.split('')

const YEAR_NUM: string[] = '〇一二三四五六七八九'.split('')


/**
 * 获取纯中文串 (暂只支持亿亿以下)
 * @param {number | string} num 数字
 * @return {String} 纯中文串
 */
export const number2CN = (num: Digit): string => {
  const str: string = `${Number(num)}`

  // 快捷转换 0 - 99
  if (/^\d$/.test(str)) return NUM[str]
  if (/^[1-9]\d$/.test(str)) {
    const [a, b] = str.split('')
    return `${a === '1' ? '' : NUM[a]}十${b === '0' ? '' : NUM[b]}`
  }

  // 整数转换
  const sign = /-/.test(str) ? '负' : ''
  const [integerPart, decimalPart = ''] = str.replace('-', '').split('.')
  const intReverse: string[] = integerPart.split('').reverse()
  const intList: string[] = intReverse.map((x, i) => (x === '0' ? ZERO[i] : `${NUM[x]}${UNIT[i]}`))
  let cnStr: string = intList.reverse().join('')
  cnStr = cnStr.replace(/零+/g, '零').replace(/(.)零(亿|万|$)/g, '$1$2')
  cnStr = cnStr.replace(/^一十/, '十')
  if (!decimalPart) return `${sign}${cnStr}`

  // 小数转换
  const floatList = decimalPart.split('').map((x) => NUM[x])
  return `${sign}${cnStr}点${floatList.join('')}`
}

/**
 * 获取大写金额 (暂只支持万亿以下)
 * @param {number | string} num 数字
 * @return {String} 大写金额
 */
export const number2CNMoney = (num: Digit): string => {
  const [integerPart, decimalPart] = Number(num).toFixed(2).split('.')
  // 整数转换
  const strReverse: string[] = integerPart.split('').reverse()
  const strList: string[] = strReverse.map((x, i) => (x === '0' ? `零${ZERO[i]}` : `${MONEY_NUM[x]}${MONEY_UNIT[i]}`))
  let money: string = strList.reverse().join('')
  money = money.replace(/零+/g, '零').replace(/(零)([亿万])/g, '$2$1')
  money = money.replace(/亿零?万?零?零/, '亿零').replace(/万零零/, '万零')
  money = money.replace(/(.+)零$/, '$1') + '元'
  if (decimalPart === '00') return `${money}整`

  // 小数转换
  const [a, b] = decimalPart.split('')
  return `${money}${a === '0' ? '零' : `${MONEY_NUM[a]}角`}${b === '0' ? '' : `${MONEY_NUM[b]}分`}`
}


/**
 * 获取中文年份 (1000 - 9999)
 * @param {Number} num 数字
 * @return {String} 中文年份
 */
export const number2CNYear = (num: Digit): string => {
  const digits: string[] = `${num}`.split('').map((x) => YEAR_NUM[x])
  return digits.join('')
}