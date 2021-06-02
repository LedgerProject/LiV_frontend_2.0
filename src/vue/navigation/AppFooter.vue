<template>
  <footer class="app-footer">
    <a
      class="app-footer__link"
      href="http://livpoc.com/Landing/"
      rel="noopener"
      target="_blank"
      :title="$t('about')"
    >
      {{ $t('about') }}
    </a>

    <p class="app-footer__app-name">
      {{ $t('app-name', { currentYear, appName: $config.APP_NAME }) }}
    </p>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'footer',

  setup () {
    const currentYear = computed(() => new Date().getFullYear())

    return { currentYear }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';

.app-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 5rem;
  padding: 0 2rem;
  border-top: $col-app-footer-border;
  background: $col-app-footer-background;
}

.app-footer__link,
.app-footer__app-name {
  color: $col-app-footer-text;
  font-weight: 300;
}
</style>

<i18n>
{
  "en": {
    "about": "About Us",
    "app-name": "© { currentYear } { appName }"
  }
}
</i18n>
