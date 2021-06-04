<template>
  <a
    v-if="href"
    v-bind="$attrs"
    v-ripple="rippleOptions"
    :aria-label="$attrs.title"
    class="app-button"
    :class="styleClassArray"
    :href="href"
    :disabled="isDisabled"
    @click="onClick"
    ref="appButtonRef"
  >
    <i
      v-if="icon"
      :class="['mdi', icon]"
      class="app-button__material-icon"
    />
    <slot />
  </a>
  <button
    v-else
    v-bind="$attrs"
    v-ripple="rippleOptions"
    :type="$attrs.type || 'button'"
    :aria-label="$attrs.title"
    class="app-button"
    :class="styleClassArray"
    :disabled="isDisabled"
    @click="onClick"
    ref="appButtonRef"
  >
    <i
      v-if="icon"
      :class="['mdi', icon]"
      class="app-button__material-icon"
    />
    <slot />
  </button>
</template>

<script>
import isEmpty from 'lodash/isEmpty'

const SCHEMES = {
  primary: 'primary',
  secondary: 'secondary',
}

const MODIFIERS = ['iconned']

export default {
  name: 'app-button',

  props: {
    icon: { type: String, default: '' },
    href: { type: String, default: '' },
    scheme: { type: String, default: SCHEMES.primary },
    modifiers: { type: String, default: '' },
    route: { type: Object, default: () => ({}) },
  },

  emits: ['click'],

  computed: {
    isDisabled () {
      return ['disabled', '', true].includes(this.$attrs.disabled)
    },

    rippleOptions () {
      return { isDisabled: this.isDisabled }
    },

    isRouterLink () { return !isEmpty(this.route) },

    styleClassArray () {
      const classPrefix = 'app-button--'
      const isModifierExist = modifier => MODIFIERS.includes(modifier)

      const isSchemeExist = Object.values(SCHEMES).includes(this.scheme)

      const classes = isSchemeExist
        ? [`${classPrefix}${this.scheme}`]
        : [`${classPrefix}${SCHEMES.primary}`]

      if (this.modifiers) {
        const modifiers = this.modifiers.split(' ')
        modifiers.forEach(m => {
          if (isModifierExist(m)) classes.push(`${classPrefix}${m}`)
        })
      }

      if (this.isDisabled) classes.push(`${classPrefix}disabled`)

      return classes
    },
  },

  methods: {
    redirectToRoute () { this.$router.push(this.route) },

    onClick (event) {
      this.$refs.appButtonRef.blur()
      if (this.isRouterLink) this.redirectToRoute()
      this.$emit('click', event)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';

@function hex-to-rgb($hex) {
  @return red($hex), green($hex), blue($hex);
}

/* stylelint-disable declaration-colon-space-after */
.app-button {
  /* magic value to align icon in the center */
  --app-button-mdi-magic-margin-value: 0;
  --app-button-icon-size: 2.4rem;
  --app-button-iconned-padding: 1rem;
  --app-button-padding-vertical: 1.2rem;
  --app-button-padding-horizontal: 2.4rem;
  --app-button-border-width: 0.1rem;
  --app-button-text: #{$col-app-button-primary-text};
  --app-button-hover-text: #{$col-app-button-primary-text};
  --app-button-disabled-text: #{$col-app-button-primary-text};
  --app-button-bg: #{$col-app-button-primary-bg};
  --app-button-disabled-bg: #{$col-app-button-primary-disabled-bg};
  --app-button-hover-bg-rgb: #{hex-to-rgb($col-app-button-primary-hover-bg)};
  --app-button-hover-bg: rgba(var(--app-button-hover-bg-rgb), 1);
  --app-button-border: none;
  --app-button-border-color: transparent;
  --app-button-hover-border-color: transparent;
  --app-button-disabled-border-color: transparent;

  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  grid-gap: 1.5rem;
  align-items: center;
  justify-content: center;
  padding:
    var(--app-button-padding-vertical)
    var(--app-button-padding-horizontal);
  border-radius: 0.6rem;
  font-size: 1.4rem;
  line-height: 2rem;
  letter-spacing: 0.1rem;
  font-weight: 700;
  white-space: nowrap;
  min-height: 3rem;
  max-height: 4.8rem;
  transition: all 0.2s ease;
  transition-property: background-color, box-shadow, color, border-color;
  cursor: pointer;
  text-decoration: none;
  background-color: var(--app-button-bg);
  color: var(--app-button-text);
  border: var(--app-button-border);
  border-color: var(--app-button-border-color);
  text-transform: uppercase;

  &:disabled,
  &--disabled {
    cursor: not-allowed;
    background-color: var(--app-button-disabled-bg);
    border-color: var(--app-button-disabled-border-color);
    color: var(--app-button-disabled-text);
  }

  &:not([disabled]):focus {
    box-shadow: 0 0.4rem 0.8rem rgba(var(--app-button-hover-bg-rgb), 0.32);
  }

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    background-color: var(--app-button-hover-bg);
    color: var(--app-button-hover-text);
    border-color: var(--app-button-hover-border-color);
  }

  &:not([disabled]):active {
    color: var(--app-button-hover-text);
  }

  &--primary {
    --app-button-text: #{$col-app-button-primary-text};
    --app-button-hover-text: #{$col-app-button-primary-text};
    --app-button-disabled-text: #{$col-app-button-primary-text};
    --app-button-bg: #{$col-app-button-primary-bg};
    --app-button-disabled-bg: #{$col-app-button-primary-disabled-bg};
    --app-button-hover-bg-rgb: #{hex-to-rgb($col-app-button-primary-hover-bg)};
    --app-button-border: none;
    --app-button-border-color: transparent;
    --app-button-hover-border-color: transparent;
  }

  &--secondary {
    --app-button-text: #{$col-app-button-secondary-text};
    --app-button-hover-text: #{$col-app-button-secondary-text};
    --app-button-disabled-text: #{$col-app-button-secondary-disabled};
    --app-button-bg: #{$col-app-button-secondary-bg};
    --app-button-disabled-bg: #{$col-app-button-secondary-disabled-bg};
    --app-button-hover-bg-rgb:
      #{hex-to-rgb($col-app-button-secondary-hover-bg)};
    --app-button-border: none;
    --app-button-border-color: transparent;
    --app-button-hover-border-color: transparent;
  }

  &--iconned {
    --app-button-icon-size: 1.6rem;

    width: 4.8rem;
    padding: var(--app-button-iconned-padding);

    &:not([disabled]):active {
      padding:
        var(--app-button-iconned-padding) + var(--app-button-border-width)
        var(--app-button-iconned-padding) + var(--app-button-border-width);
    }
  }
}
/* stylelint-enable declaration-colon-space-after */

.app-button__material-icon {
  font-size: var(--app-button-icon-size);
  line-height: var(--app-button-icon-size);
  vertical-align: middle;
  margin-left: var(--app-button-mdi-magic-margin-value);
}
</style>
