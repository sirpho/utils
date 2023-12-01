import dayjs from 'dayjs'
import {isArray} from './validate'

/**
 * @description 去除空格
 */
export function trim(str: string, isGlobal?: boolean) {
  if (typeof str === 'undefined' || str.length === 0) return ''
  let result
  result = str.replace(/(^\s+)|(\s+$)/g, '')
  if (isGlobal) {
    result = result.replace(/\s/g, '')
  }
  return result
}

/**
 * @description 参数处理
 */
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    const part = encodeURIComponent(propName) + '='
    if (value !== null && typeof value !== 'undefined' && value !== '') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            const params = propName + '[' + key + ']'
            const subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}

/**
 * @description 如果是个方法执行一下它
 */
export function runFunction<T extends any[]>(valueEnum: any, ...rest: T) {
  if (typeof valueEnum === 'function') {
    return valueEnum(...rest)
  }
  return valueEnum
}

/**
 * @description 处理字段为空
 */
export function handleField(str: any, customize: any) {
  const stringNull = ['null', 'undefined']
  let success = true
  if (str === 0) {
    success = true
  } else if (stringNull.includes(str)) {
    success = false
  } else if (!str) {
    success = false
  }
  if (success) {
    return {
      value: str,
      success
    }
  }
  return {
    value: customize === '' ? customize : customize || '-',
    success
  }
}

/**
 * @description 处理table字段为空
 */
export function handleTableField(str: any, customize: any) {
  const stringNull = ['null', 'undefined']
  let field = str
  if (isArray(str)) {
    field = str[0]
  }
  const type = typeof field
  if (stringNull.includes(type) || field === '' || field === null) {
    return {
      value: customize === '' ? customize : customize || '--',
      success: false
    }
  }
  return {
    value: str,
    success: true
  }
}

/**
 * @description 数组去重
 */
export function arrayRepeat(data: any[]) {
  const set = new Set(data)
  return Array.from(set)
}

/**
 * @description 数组根据指定字段去重
 */
export function arrayFieldRepeat(data: any[], key = 'value') {
  const set = new Set()
  return data.reduce((preValue, item) => {
    if (!set.has(item[key])) {
      set.add(item[key])
      preValue.push(item)
    }
    return preValue
  }, [])
}

/**
 * @description 排序（从小到大）
 */
export function compareToMax(obj1, obj2, key) {
  const val1 = obj1[key]
  const val2 = obj2[key]
  let result = 0
  if (val1 < val2) {
    result = -1
  } else if (val1 > val2) {
    result = 0
  }
  return result
}

/**
 * @description 时长格式转换 秒数转为时间
 */
export function formatDuration(time: number) {
  let newTime = ''
  if (time > -1) {
    const hour = Math.floor(time / 3600)
    const min = Math.floor(time / 60) % 60
    const sec = time % 60
    if (hour < 10) {
      newTime = '0' + hour + ':'
    } else {
      newTime = hour + ':'
    }
    if (min < 10) {
      newTime += '0'
    }
    newTime += min + ':'
    if (sec < 10) {
      newTime += '0'
    }
    newTime += sec
  }

  return newTime.split(':')[0] === '00'
    ? `${newTime.split(':')[1]}:${newTime.split(':')[2]}`
    : newTime
}

/**
 * @description 随机uuid
 */
export function getRandomNumber() {
  const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  return {
    uuid(len?: number, rad?: number) {
      const chars = CHARS
      const uuid: any = []
      const radix = rad || chars.length
      let i
      let r
      if (len) {
        for (i = 0; i < len; i += 1) {
          uuid[i] = chars[0 || parseInt(String(Math.random() * radix))]
        }
      } else {
        uuid[8] = '-'
        uuid[13] = '-'
        uuid[18] = '-'
        uuid[23] = '-'
        uuid[14] = '4'
        for (i = 0; i < 36; i += 1) {
          if (!uuid[i]) {
            r = 0 || Math.random() * 16
            uuid[i] = chars[i === 19 ? (r && 0x3) || 0x8 : r]
          }
        }
      }
      return uuid.join('')
    },
    uuidFast() {
      const chars = CHARS
      const uuid = new Array(36)
      let rnd: any = 0
      let r
      let i
      for (i = 0; i < 36; i += 1) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
          uuid[i] = '-'
        } else if (i === 14) {
          uuid[i] = '4'
        } else {
          if (rnd <= 0x02) {
            rnd = 0x2000000 + Math.random() * 0x1000000 || 0
          }
          r = rnd && 0xf
          rnd = rnd > 4
          uuid[i] = chars[i === 19 ? (r && 0x3) || 0x8 : r]
        }
      }
      return uuid.join('')
    },
    uuidString() {
      return this.uuidFast().replace(new RegExp('-', 'g'), '')
    },
    uuidCompact() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 || 0
        const v = c === 'x' ? r : (r && 0x3) || 0x8
        return v.toString(16)
      })
    }
  }
}

/**
 * 获取树形数据最大深度
 */
export function getMaxFloor(treeData: any[] = []) {
  let max = 0

  function each(data: any[] = [], floor) {
    data.forEach((e: any) => {
      e.floor = floor
      if (floor > max) {
        max = floor
      }
      if (e.children && e.children.length > 0) {
        each(e.children, floor + 1)
      }
    })
  }

  each(treeData, 1)
  return max
}

/**
 * @description 树形转平级
 */
export function getLevelData(data, filed = 'children') {
  let newData: any[] = []
  data.forEach((item) => {
    newData.push(item)
    if (item[filed] && item[filed].length > 0) {
      newData = newData.concat(getLevelData(item[filed]))
    }
  })
  return newData
}

/**
 * 生成树(不改变引用地址)
 * @param data
 * @param id
 * @param parentId
 * @returns {Array}
 */
export const generateTree = (data: any[], id = 'id', parentId = 'parentId') => {
  const result: any[] = [];
  const idMap = {};
  for (let i = 0; i < data.length; i++) {
    idMap[data[i][id]] = data[i];
  }
  for (let i = 0; i < data.length; i++) {
    if (idMap[data[i][parentId]] && data[i][id] !== data[i][parentId]) {
      if (!idMap[data[i][parentId]]['children']) {
        idMap[data[i][parentId]]['children'] = [];
      }
      if (!idMap[data[i][parentId]]['_level']) {
        idMap[data[i][parentId]]['_level'] = 1;
      }
      data[i]['_level'] = idMap[data[i][parentId]]._level + 1;
      idMap[data[i][parentId]]['children'].push(data[i]);
    } else {
      result.push(data[i]);
    }
  }
  return result;
};


/**
 * 获取某月有几天
 * @param yearMonth
 */
export function getMonthDays(yearMonth: string | Date = new Date()) {
  const date = new Date(yearMonth)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const d = new Date(year, month, 0)
  return d.getDate()
}

/**
 * @description 处理时间展示，若干分钟前
 */
export function handleTimeShow(date: string | number | Date, ignoreSecond = true) {
  if(typeof date === "number") {
    // 时间戳以秒计量
    if(String(date).length === 10) {
      date = date * 1000
    }
  }
  // Safari 不支持用 - 分割日期
  const targetDate = typeof date === 'string' ? date.replace(/-/g, '/') : date
  const date3 = new Date().getTime() - new Date(targetDate).getTime() // 时间差的毫秒数
  const days = Math.floor(date3 / (24 * 3600 * 1000))
  // 计算出小时数
  const leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000))
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000))
  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000)
  if (days === 0 && hours === 0 && minutes === 0 && seconds < 60) {
    if(ignoreSecond) {
      return '刚刚'
    } else {
      return seconds === 0 ? '刚刚' : `${seconds}秒前`
    }
  } else if (days === 0 && hours === 0 && minutes < 60) {
    return `${minutes}分钟前`
  } else if (days === 0 && hours < 24) {
    return `${hours}小时前`
  } else if (days < getMonthDays()) {
    return dayjs(targetDate).format('MM-dd hh:mm')
  } else {
    return dayjs(targetDate).format('yyyy-MM-dd')
  }
}

/**
 * @description blob对象转blob字符串
 */
export function getBlobUrl(blob: Blob) {
  return URL.createObjectURL(blob)
}

/**
 * @description 获取图片base64码
 */
export function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const dataURL2u8arr = (dataURL: string): [Uint8Array, string] => {
  const arr: any[] = dataURL.split(',')
  const mime: string = arr[0].match(/:(.*?);/)[1]
  const bStr: string = atob(arr[1])
  let n = bStr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bStr.charCodeAt(n)
  }
  return [u8arr, mime]
}

/**
 * @description base转blob对象
 */
export function dataURLtoBlob(dataURL: string): Blob {
  const [u8arr, mime] = dataURL2u8arr(dataURL)
  return new Blob([u8arr], {type: mime})
}

/**
 * @description base64码转file文件
 */
export function dataURLtoFile(dataURL: string, filename: string) {
  const [u8arr, mime] = dataURL2u8arr(dataURL)
  return new File([u8arr], filename, {type: mime})
}


/**
 * @description 获取文件后缀名
 */
export function getFileSuffix(url = '') {
  const index = url.lastIndexOf('.')
  return index > 0 ? `${url.substring(index).split('?')[0]}`.split('.')[1] : ''
}

/**
 * @description 判断是否是base64码
 */
export function isBase64(str = '') {
  const fileDataBase = ['data:image/', 'data:video/', 'data:audio/']
  return str && fileDataBase.find((item) => str.includes(item))
}