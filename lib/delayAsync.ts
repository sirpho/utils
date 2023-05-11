/**
 * 延时若干秒
 * @param seconds 秒数
 */
export function delayAsync(seconds = 1) {
  let _timeID: null | number
  return new Promise<void>((resolve, _reject) => {
    _timeID = window.setTimeout(() => {
      resolve()
      if (_timeID !== null) {
        clearTimeout(_timeID)
      }
    }, seconds * 1000)
  })
}
