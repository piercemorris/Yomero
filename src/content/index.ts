import { runtime } from "webextension-polyfill"

type Listener = (event: MouseEvent) => void

function registerListener(listener: Listener) {
  window.addEventListener('mouseup', listener)

  return function cleanup() {
    window.removeEventListener('mouseup', listener)
  }
}

async function getHighlightedText() {
  console.log(window.getSelection()?.toString())
  return runtime.sendMessage({ from: 'content', to: 'background', action: 'highlighted' })
}

export function init() {
  registerListener(getHighlightedText)
  console.log('[content] loaded')
}

init()