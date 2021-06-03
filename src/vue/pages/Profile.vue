<template>
  <div class="app__page-content profile">
    <template v-if="isLoading">
      <loader
        class="profile__loader"
        :message="$t('loading-message')"
        position-center
      />
    </template>
    <template v-else>
      <template v-if="isLoadFailed">
        <loading-error-message position-center />
      </template>
      <template v-else>
        <div
          v-if="account"
          class="profile__content"
        >
          <div class="profile__content-viewer">
            <logo-viewer
              class="profile__content-avatar"
              :title="account.fullName"
              size="12"
            />
            <h4 class="profile__content-subtitle">
              {{ $globalizeUserRole(account.role) }}
            </h4>
            <h2 class="profile__content-title">
              {{ account.fullName }}
            </h2>
          </div>
          <div class="profile__content-form-wrapper">
            <h2 class="profile__content-title">
              {{ $t('edit-profile-title') }}
            </h2>
            <h4 class="profile__content-subtitle">
              {{ $t('edit-profile-subtitle') }}
            </h4>
            <kyc-form
              class="profile__content-form"
              :account-record="account"
              @submit="loadAccount"
            />
          </div>
        </div>
        <template v-else>
          <no-data-message
            :title="$t('no-data-title')"
            :message="$t('no-data-message')"
            center
          />
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import Loader from '@/vue/common/Loader'
import LoadingErrorMessage from '@/vue/common/LoadingErrorMessage'
import NoDataMessage from '@/vue/common/NoDataMessage'
import LogoViewer from '@/vue/common/LogoViewer'
import KycForm from '@/vue/forms/KycForm'

import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { vuexTypes } from '@/vuex'
import { ErrorHandler } from '@/js/helpers/error-handler'

export default {
  name: 'profile',

  components: {
    LogoViewer,
    KycForm,
    Loader,
    LoadingErrorMessage,
    NoDataMessage,
  },

  setup () {
    const store = useStore()
    const jwtToken = computed(() => store.getters[vuexTypes.jwtToken])
    const isLoading = ref(false)
    const isLoadFailed = ref(false)

    const loadAccount = async () => {
      isLoading.value = true
      isLoadFailed.value = false
      try {
        await store.dispatch(vuexTypes.LOAD_ACCOUNT, jwtToken.value)
      } catch (e) {
        isLoadFailed.value = true
        ErrorHandler.process(e)
      }
      isLoading.value = false
    }

    loadAccount()

    return {
      isLoading,
      isLoadFailed,
      loadAccount,
      account: computed(() => store.getters[vuexTypes.account]),
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/scss/variables';
@import '~@/scss/mixins';

.profile__loader { margin-top: 4rem; }

.profile__content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;

  @include respond-to(small) { grid-template-columns: 1fr; }
}

.profile__content-form-wrapper,
.profile__content-viewer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10rem 2rem;
  border-radius: 1.6rem;

  @include respond-to(small) { padding: 5rem 2rem; }
}

.profile__content-form-wrapper {
  padding: 2rem;
  box-shadow: $col-profile-viewer-shadow;
  background-color: $col-profile-viewer;

  @include respond-to(small) { padding: 2rem; }
}

.profile__content-form {
  width: 100%;
  margin-top: 4rem;
}

.profile__content-subtitle {
  font-size: 1.8rem;
  color: $col-profile-subtitle-text;
  text-align: center;
  font-weight: 300;
}

.profile__content-title {
  font-size: 3rem;
  margin-top: 0.5rem;
  text-align: center;
  font-weight: 300;

  @include respond-to(small) { font-size: 2.5rem; }
}

.profile__content-avatar {
  box-shadow: $col-profile-avatar-shadow;
  margin-bottom: 3rem;

  @include respond-to(small) { margin-bottom: 1.8rem; }
}
</style>

<i18n>
{
  "en": {
    "edit-profile-title": "Edit Profile",
    "edit-profile-subtitle": "There you can change your profile",
    "loading-message": "Loading account...",
    "no-data-title": "No account loaded",
    "no-data-message": "There is no such account"
  }
}
</i18n>
