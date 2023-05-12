
/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event: any = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

/**
 * 鼠标的选择文本
 */
export function mouseSelection(): string {
  if (window && window.getSelection) {
    return window.getSelection()?.toString() || ''
  }
  return ''
}

/**
 * 绑定事件
 */
export const on = function (
  element: HTMLElement | Document | Window | null,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}

/**
 * 注销事件
 */
export const off = function (
  element: HTMLElement | Document | Window | null,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture)
  }
}