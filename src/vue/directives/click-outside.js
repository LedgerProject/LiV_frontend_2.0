let destructor = () => { }

export const clickOutside = {
  destructor () { },

  beforeMount (el, binding) {
    if (!binding?.value || !binding?.instance) return

    const handler = e => {
      if (!el.contains(e.target)) binding.value.apply(binding.instance)
    }

    document.addEventListener('click', handler, false)

    destructor = () => { document.removeEventListener('click', handler, false) }
  },

  beforeUnmount () { destructor() },
}
