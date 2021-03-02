import { DirectiveBinding, ObjectDirective } from 'vue'

const HANDLERS_PROPERTY = '__v-click-outside'
const HAS_WINDOWS = typeof window !== 'undefined'
const HAS_NAVIGATOR = typeof navigator !== 'undefined'
const IS_TOUCH =
  HAS_WINDOWS &&
  ('ontouchstart' in window ||
    (HAS_NAVIGATOR && navigator.msMaxTouchPoints > 0))
const EVENTS = IS_TOUCH ? ['touchstart'] : ['click']

interface ClickOutsideElement extends HTMLElement {
  [HANDLERS_PROPERTY]: any
}

interface HandlerObject {
  event: string
  srcTarget: ClickOutsideElement | (Window & typeof globalThis)
  handler: EventListener
  capture: boolean
}

type Middleware = (evt: MouseEvent) => boolean
type Handler = (evt: MouseEvent) => void

interface EventObject {
  el: ClickOutsideElement
  event: MouseEvent
  handler: Handler
  middleware: Middleware
}

const processDirectiveArguments = (bindingValue: DirectiveBinding['value']) => {
  const isFunction = typeof bindingValue === 'function'
  if (!isFunction && typeof bindingValue !== 'object') {
    throw new Error(
      'v-click-outside: Binding value must be a function or an object'
    )
  }

  return {
    handler: (isFunction ? bindingValue : bindingValue.handler) as Handler,
    middleware: (bindingValue.middleware ||
      ((item: Event) => item)) as Middleware,
    events: (bindingValue.events as string[]) || EVENTS,
    isActive: !(bindingValue.isActive === false),
    detectIframe: !(bindingValue.detectIframe === false),
    capture: Boolean(bindingValue.capture),
  }
}

const execHandler = ({
  event,
  handler,
  middleware,
}: Omit<EventObject, 'el'>) => {
  if (middleware(event)) {
    handler(event)
  }
}

const onFauxIframeClick = ({ el, event, handler, middleware }: EventObject) => {
  // Note: on firefox clicking on iframe triggers blur, but only on
  //       next event loop it becomes document.activeElement
  // https://stackoverflow.com/q/2381336#comment61192398_23231136
  setTimeout(() => {
    const { activeElement } = document
    if (
      activeElement &&
      activeElement.tagName === 'IFRAME' &&
      !el.contains(activeElement)
    ) {
      execHandler({ event, handler, middleware })
    }
  }, 0)
}

const onEvent = ({ el, event, handler, middleware }: EventObject) => {
  // Note: composedPath is not supported on IE and Edge, more information here:
  //       https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
  //       In the meanwhile, we are using el.contains for those browsers, not
  //       the ideal solution, but using IE or EDGE is not ideal either.
  const path =
    (event as any).path || (event.composedPath && event.composedPath())
  const isClickOutside = path
    ? path.indexOf(el) < 0
    : !el.contains(event.target as Node | null)

  if (!isClickOutside) {
    return
  }

  execHandler({ event, handler, middleware })
}

const beforeMount = (el: ClickOutsideElement, { value }: DirectiveBinding) => {
  const {
    events,
    handler,
    middleware,
    isActive,
    detectIframe,
    capture,
  } = processDirectiveArguments(value)
  if (!isActive) {
    return
  }

  el[HANDLERS_PROPERTY] = events.map((eventName) => ({
    event: eventName,
    srcTarget: document.documentElement,
    handler: (event: MouseEvent) => onEvent({ el, event, handler, middleware }),
    capture,
  }))

  if (detectIframe) {
    const detectIframeEvent = {
      event: 'blur',
      srcTarget: window,
      handler: (event: MouseEvent) =>
        onFauxIframeClick({ el, event, handler, middleware }),
      capture,
    }

    el[HANDLERS_PROPERTY] = [...el[HANDLERS_PROPERTY], detectIframeEvent]
  }

  el[HANDLERS_PROPERTY].forEach(
    ({ event, srcTarget, handler: thisHandler }: HandlerObject) =>
      setTimeout(() => {
        // Note: More info about this implementation can be found here:
        //       https://github.com/ndelvalle/v-click-outside/issues/137
        if (!el[HANDLERS_PROPERTY]) {
          return
        }
        srcTarget.addEventListener(event, thisHandler, capture)
      }, 0)
  )
}

const unmounted = (el: ClickOutsideElement) => {
  const handlers = (el[HANDLERS_PROPERTY] as HandlerObject[]) || []
  handlers.forEach(({ event, srcTarget, handler, capture }) =>
    srcTarget.removeEventListener(event, handler, capture)
  )
  delete el[HANDLERS_PROPERTY]
}

const updated = (
  el: ClickOutsideElement,
  { value, oldValue }: DirectiveBinding
) => {
  if (JSON.stringify(value) === JSON.stringify(oldValue)) {
    return
  }
  unmounted(el)
  beforeMount(el, { value } as DirectiveBinding)
}

const directive: ObjectDirective = {
  beforeMount,
  updated,
  unmounted,
}

export default HAS_WINDOWS ? directive : {}
