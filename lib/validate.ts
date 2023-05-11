const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

/**
 * 判断是否为浏览器环境
 */
export const isClient = typeof window !== 'undefined'

/**
 * @description 判断是否为外链
 * @param path
 * @returns {boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @description 判断是否为数字
 * @param value
 * @returns {boolean}
 */
export function isNumber(value: unknown) {
  return typeof value === 'number'
}

/**
 * @description 判断是否是汉字
 * @param value
 * @returns {boolean}
 */
export function isChineseCharacter(value) {
  const reg = /^[\u4e00-\u9fa5]+$/
  return reg.test(value)
}

/**
 * @description 判断是否为IP
 * @param ip
 * @returns {boolean}
 */
export function isIP(ip) {
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip)
}

/**
 * @description 判断是否是传统网站
 * @param url
 * @returns {boolean}
 */
export function isURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @description 判断是否是小写字母
 * @param value
 * @returns {boolean}
 */
export function isLowerCase(value) {
  const reg = /^[a-z]+$/
  return reg.test(value)
}

/**
 * @description 判断是否是大写字母
 * @param value
 * @returns {boolean}
 */
export function isUpperCase(value) {
  const reg = /^[A-Z]+$/
  return reg.test(value)
}

/**
 * @description 判断是否是大写字母开头
 * @param value
 * @returns {boolean}
 */
export function isAlphabets(value) {
  const reg = /^[A-Za-z]+$/
  return reg.test(value)
}

/**
 * @description 判断是否是字符串
 * @param value
 * @returns {boolean}
 */
export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isFunction(func: any) {
  return (typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]')
}

/**
 * @description 判断是否是数组
 * @param arg
 * @returns {arg is any[]|boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @description 是否是对象
 */
export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

/**
 * @description 判断是否是端口号
 * @param value
 * @returns {boolean}
 */
export function isPort(value) {
  const reg = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
  return reg.test(value)
}

/**
 * @description 判断是否是手机号
 * @param value
 * @returns {boolean}
 */
export function isPhone(value) {
  const reg = /^1\d{10}$/
  return reg.test(value)
}

/**
 * @description 判断是否是身份证号(第二代)
 * @param value
 * @returns {boolean}
 */
export function isIdCard(value: string): boolean {
  const reg = /^(1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5]|71|8[1-3]|91)\d{4}(19|2\d)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dX]$/
  return reg.test(value)
}

/**
 * @description 判断是否是身份证号(第一代)
 * @param value
 * @returns {boolean}
 */
export function isOldIdCard(value: string): boolean {
  const reg = /^(1[1-5]|2[1-3]|3[1-7]|4[1-6]|5[0-4]|6[1-5]|71|8[1-3]|91)\d{4}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$/
  return reg.test(value)
}

/**
 * @description 判断是否是邮箱
 * @param value
 * @returns {boolean}
 */
export function isEmail(value: string): boolean {
  const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
  return reg.test(value)
}

/**
 * @description 判断是否是以逗号分隔的多个邮箱
 * @param value
 * @returns {boolean}
 */
export function isEmails(value: string): boolean {
  const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}(,[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4})*$/
  return reg.test(value)
}

/**
 * @description 校验车牌号是否有效
 * @param value 车牌号
 * @returns {Boolean}
 */
export function isVehicle(value: string) {
  const reg = /^[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏青甘陕宁新][A-HJ-NP-Z]([A-HJ-NP-Z\d]{4}[A-HJ-NP-Z\d港澳领警学挂]|[DF]\d{5}|\d{5}[DF])$/
  return reg.test(value)
}

/**
 * @description 判断是否为固话
 * @param value
 * @returns {boolean}
 */
export function isTel(value) {
  const reg = /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 转])*([0-9]{1,4}))?$/
  return reg.test(value)
}

/**
 * @description 判断经度 -180.0～+180.0（整数部分为0～180，必须输入1到5位小数）
 * @param value
 * @returns {boolean}
 */
export function isLongitude(value) {
  const reg = /^[-|+]?(0?\d{1,2}\.\d{1,5}|1[0-7]?\d{1}\.\d{1,5}|180\.0{1,5})$/
  return reg.test(value)
}

/**
 * @description 判断纬度 -90.0～+90.0（整数部分为0～90，必须输入1到5位小数）
 * @param value
 * @returns {boolean}
 */
export function isLatitude(value) {
  const reg = /^[-|+]?([0-8]?\d{1}\.\d{1,5}|90\.0{1,5})$/
  return reg.test(value)
}

/**
 * @description 判断是否是JSON字符串
 */
export function isJSONStr(str: any) {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str)
      return !!(typeof obj === 'object' && obj);
    } catch (e) {
      return false
    }
  }
  return false
}

/**
 * 判断是不是URL
 */
export function checkURL(URL) {
  const Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
  const objExp = new RegExp(Expression)
  return objExp.test(URL)
}
