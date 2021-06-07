<template>
  <div
    class="input-field"
    :class="[
      {
        'input-field--error': errorMessage,
        'input-field--readonly': $attrs.readonly || $attrs.readonly === '',
        'input-field--disabled': $attrs.disabled,
        'input-field--pwd-toggle-present': isPasswordType,
      }
    ]"
  >
    <input
      v-bind="$attrs"
      v-maska="maskConfig"
      :value="modelValue"
      class="input-field__input"
      :class="{ 'input-field__input--autofill-white': whiteAutofill }"
      :aria-label="label"
      :type="isPasswordType && isPasswordShown ? 'text' : type"
      :placeholder="$attrs.placeholder || ' '"
      :tabindex="$attrs.readonly || $attrs.readonly === ''
        ? -1
        : $attrs.tabindex"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    >

    <button
      v-if="isPasswordType"
      type="button"
      class="input-field__password-toggle"
      @click="isPasswordShown = !isPasswordShown"
    >
      <i
        class="mdi input-field__password-toggle-icon"
        :class="isPasswordShown ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
      />
    </button>

    <span v-if="label" class="input-field__label">
      {{ label }}

      <template v-if="isCapsLockOn">
        {{ $t('caps-lock-warning') }}
      </template>
    </span>

    <transition name="input-field__err-transition">
      <p v-if="errorMessage" class="input-field__err-mes">
        {{ errorMessage }}
      </p>
    </transition>
  </div>
</template>

<script>
const INPUT_TYPES = {
  text: 'text',
  email: 'email',
  password: 'password',
  number: 'number',
}

/* eslint-disable quote-props */
const MASK_TOKENS = {
  '#': { pattern: /\d/ },
  'X': { pattern: /[0-9a-zA-Z]/ },
  'S': { pattern: /[a-zA-Z]/ },
  'A': { pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase() },
  'a': { pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase() },
  '!': { escape: true },
  'Z': { pattern: /[0-9a-zA-Z]/, transform: v => v.toLocaleUpperCase() },
}
/* eslint-enable quote-props */

const inputTypeValidator = v => !v || Object.values(INPUT_TYPES).includes(v)

export default {
  name: 'input-field',

  props: {
    label: { type: String, default: '' },
    modelValue: { type: [String, Number], default: '' },
    errorMessage: { type: String, default: '' },
    type: { type: String, default: '', validator: inputTypeValidator },
    whiteAutofill: { type: Boolean, default: true },
    trim: { type: Boolean, default: true },
    mask: { type: String, default: '' },
  },

  emits: ['update:modelValue', 'blur'],

  data: () => ({ isCapsLockOn: false, isPasswordShown: false }),

  computed: {
    isPasswordType () { return this.type === INPUT_TYPES.password },

    maskConfig () {
      return this.mask
        ? { mask: this.mask, tokens: MASK_TOKENS }
        : this.mask
    },
  },

  methods: {
    onInput (event) {
      const value = event.target.value
      if (this.modelValue === value) return
      this.$emit('update:modelValue', value)
    },

    onFocus (event) {
      if (this.isPasswordType) {
        /**
         * Use two events to detect Caps Lock up and down.
         * If we will use only 'keydown', we can detect only Caps Lock press to
         * ON state, but we cannot detect the OFF state.
         *
         * Actual only for MacOS's browsers.
         */
        document.addEventListener('keydown', this.detectCapsLock)
        document.addEventListener('keyup', this.detectCapsLock)
      }
    },

    onBlur (event) {
      if (this.isPasswordType) {
        document.removeEventListener('keydown', this.detectCapsLock)
        document.removeEventListener('keyup', this.detectCapsLock)

        if (!this.modelValue) this.isCapsLockOn = false
      }

      if (this.trim) this.$emit('update:modelValue', event.target.value.trim())
      this.$emit('blur')
    },

    /**
     * @param {KeyboardEvent} getModifierState
     *
     * @return {Boolean}
     */
    detectCapsLock (event) {
      this.isCapsLockOn =
        event.getModifierState &&
        event.getModifierState('CapsLock')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/mixins';

$pwd-toggle-btn-width: 3.2rem;

$pwd-toggle-btn-width: 3.2rem;

.input-field {
  position: relative;
  width: 100%;
  flex: 1;
}

/* stylelint-disable no-descending-specificity */
.input-field__input {
  -webkit-text-fill-color: $field-color-text; /* autofill hack */
  width: 100%;
  background: none;
  border: none;
  caret-color: $field-color-focused;
  color: $field-color-text;
  padding: $field-input-padding;
  text-overflow: ellipsis; /*  will work only when field not in the focus */

  @include material-border($field-color-focused, $field-color-unfocused);
  @include text-font-sizes;

  &:read-only,
  &:disabled {
    cursor: not-allowed;
    filter: grayscale(100%);
    -webkit-text-fill-color: $field-color-unfocused;
    color: $field-color-unfocused;
  }

  &::-webkit-input-placeholder {
    @include placeholder;
  }

  &::-moz-placeholder {
    @include placeholder;
  }

  &:-moz-placeholder {
    @include placeholder;
  }

  &:-ms-input-placeholder {
    @include placeholder;
  }

  &::placeholder {
    @include placeholder;
  }

  &:not(:read-only) {
    box-shadow: inset 0 0 0 5rem $field-color-background; /* autofill hack */
  }

  &--autofill-white:not([readonly]) {
    box-shadow: inset 0 0 0 5rem var(--col-block-bg);
  }

  &:placeholder-shown:not(:focus)::-webkit-input-placeholder {
    opacity: 0;
  }

  &:placeholder-shown:not(:focus)::-moz-placeholder {
    opacity: 0;
  }

  &:placeholder-shown:not(:focus):-moz-placeholder {
    opacity: 0;
  }

  &:placeholder-shown:not(:focus):-ms-input-placeholder {
    opacity: 0;
  }

  &:placeholder-shown:not(:focus)::placeholder {
    opacity: 0;
  }

  // Hide number arrows
  &[type='number']:not(:hover):not(:focus) {
    /* autoprefixer does not help us here */
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      /* autoprefixer does not help us here */
      /* stylelint-disable-next-line property-no-vendor-prefix */
      -webkit-appearance: none;
      margin: 0;
    }
  }

  // TODO: fix issue when decimal number entered in the input that have
  // mismatched "step" attribute
  //.input-field__input:not(:placeholder-shown):invalid,
  .input-field--error > & {
    @include material-border($field-color-error, $field-color-error);
  }

  .input-field--readonly > &,
  .input-field--disabled > & {
    @include readonly-material-border($field-color-unfocused);
  }

  .input-field--pwd-toggle-present > & {
    padding-right: $pwd-toggle-btn-width + 0.4rem;
  }
}

.input-field__password-toggle {
  position: absolute;
  right: 0.2rem;
  top: $field-input-padding-top - 0.6rem;
  width: 3.2rem;
  height: 3.2rem;
  cursor: pointer;

  &--autofill-white { background-color: var(--col-block-bg); }
}

.input-field__password-toggle-icon {
  position: relative;
  font-size: 2.4rem;
  top: 0.2rem;
  color: $field-color-unfocused;
}

.input-field__label {
  position: absolute;
  left: 0;
  top: 0;
  transition: all $field-transition-duration;
  pointer-events: none;
  color: $field-color-unfocused;
  white-space: nowrap;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;

  @include label-font-sizes;

  .input-field__input:not(:focus):placeholder-shown ~ & {
    top: $field-input-padding-top;

    @include text-font-sizes;
  }

  .input-field__input:focus ~ & {
    color: $field-color-focused;
  }

  .input-field--readonly > .input-field__input:focus ~ &,
  .input-field--disabled > .input-field__input:focus ~ & {
    color: $field-color-unfocused;
  }

  // TODO: fix issue when decimal number entered in the input that have
  // mismatched "step" attribute
  //.input-field__input:not(:placeholder-shown):invalid ~ .input-field__label,
  .input-field--error > &,
  .input-field--error > .input-field__input:focus ~ & {
    color: $field-color-error;
  }

  .input-field__input:read-only ~ &,
  .input-field__input:disabled ~ & {
    filter: grayscale(100%);
  }

  // HACK: Minimize label on autocomplete (Chrome).
  // Do not merge with selector above.
  .input-field__input:not(:focus):placeholder-shown:-webkit-autofill ~ & {
    top: $field-input-padding-top;

    @include text-font-sizes;
  }
}

/* stylelint-enable no-descending-specificity */

.input-field__err-mes {
  color: $field-color-error;
  margin-top: $field-error-margin-top;
  font-size: $field-error-font-size;
  line-height: $field-error-line-height;
}

.input-field__err-transition-enter-active {
  animation:
    input-field__err-transition-keyframes
    $field-transition-duration
    ease-in-out;
}

.input-field__err-transition-leave-active {
  animation:
    input-field__err-transition-keyframes
    $field-transition-duration
    ease-in-out
    reverse;
}

@keyframes input-field__err-transition-keyframes {
  from {
    max-height: 0;
    margin-top: 0;
    overflow: hidden;
  }

  to {
    max-height: $field-error-font-size * $field-error-line-height;
    margin-top: $field-error-margin-top;
    overflow: hidden;
  }
}
</style>

<i18n>
{
  "en": {
    "caps-lock-warning": "(Warning: Caps-Lock is ON)"
  }
}
</i18n>
