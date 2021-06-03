/**
  * Scroll util implements helper functions for scroll managment
*/

export class ScrollUtil {
  /**
    * If document content more then height of the screen it will has scroll,
    * and when scroll of overlay block ends it will scroll document that under
    * of it. To fix this we have to set height of document equal to viewport.
  */

  static enableScroll () {
    const mainContent = document.body.querySelector('.app__main-content')
    const scrollY = mainContent.style.top
    mainContent.style.position = ''
    mainContent.style.left = ''
    mainContent.style.right = ''
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }

  static disableScroll () {
    const mainContent = document.body.querySelector('.app__main-content')
    mainContent.style.top = `-${window.scrollY}px`
    mainContent.style.position = 'fixed'
    mainContent.style.left = '0'
    mainContent.style.right = '0'
  }
}
