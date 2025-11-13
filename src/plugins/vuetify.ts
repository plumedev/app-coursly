import { mdiAccount } from '@mdi/js'
import { fr as dateFnsFr } from 'date-fns/locale'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import { VBtn } from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { fr } from 'vuetify/locale'
import 'vuetify/styles'

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#ca0631',

    red50: '#FAE6EA',
    red100: '#EFB2BF',
    red200: '#E78CA0',
    red300: '#DB5875',
    red400: '#D5385A',
    red500: '#CA0631',
    red600: '#B8052D',
    red700: '#8F0423',
    red800: '#6F031B',
    red900: '#550315',

    orange50: '#FFF4E6',
    orange100: '#FFDBB0',
    orange200: '#FFCA8A',
    orange300: '#FFB254',
    orange400: '#FFA333',
    orange500: '#FF8C00',
    orange600: '#E87F00',
    orange700: '#B56300',
    orange800: '#8C4D00',
    orange900: '#6B3B00',

    black50: '#E9E9E9',
    black100: '#B9B9B9',
    black200: '#989898',
    black300: '#686868',
    black400: '#4b4b4b',
    black500: '#1e1e1e',
    black600: '#1b1b1b',
    black700: '#151515',
    black800: '#111111',
    black900: '#0D0D0D',

    grey50: '#FDFDFD',
    grey100: '#F9F9F9',
    grey200: '#F7F7F7',
    grey300: '#F3F3F3',
    grey400: '#F1F1F1',
    grey500: '#EDEDED',
    grey600: '#D8D8D8',
    grey700: '#a8a8a8',
    grey800: '#828282',
    grey900: '#646464',

    green50: '#EEF5EA',
    green100: '#C9E1BF',
    green200: '#AFD29F',
    green300: '#8ABE74',
    green400: '#73B159',
    green500: '#509E2F',
    green600: '#49902B',
    green700: '#397021',
    green800: '#2C571A',
    green900: '#224214',

    yellow50: '#FFF9E7',
    yellow100: '#FFEBB5',
    yellow200: '#ffe291',
    yellow300: '#FED55E',
    yellow400: '#FECD3F',
    yellow500: '#FEC00F',
    yellow600: '#E7AF0E',
    yellow700: '#B4880B',
    yellow800: '#8C6A08',
    yellow900: '#6B5106',

    blue50: '#E6F1FA',
    blue100: '#B0D5F0',
    blue200: '#8AC0E9',
    blue300: '#54A3DF',
    blue400: '#3391D9',
    blue500: '#0076CF',
    blue600: '#006BBC',
    blue700: '#005493',
    blue800: '#004172',
    blue900: '#003257',

    white: '#FFFFFF',
    mainBg: '#F8FAFC',
    lightBorder: '#EDEDF0',
    darkBorder: '#CBD5E1'
  }
}

export const vuetify = createVuetify({
  locale: {
    locale: 'fr',
    messages: { fr }
  },
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      account: mdiAccount
    },
    sets: {
      mdi
    }
  },
  date: {
    locale: {
      fr: dateFnsFr
    }
  },
  display: {
    mobileBreakpoint: 'lg',
    thresholds: {
      xs: 0,
      sm: 560,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  },
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme
    }
  },
  aliases: {
    BaseBtnPrimary: VBtn,
    BaseBtnSecondary: VBtn,
    BaseBtnTertiary: VBtn,
    BaseBtnLink: VBtn,
    BaseBtnIcon: VBtn
  },
  defaults: {
    BaseBtnPrimary: {
      variant: 'flat',
      color: 'primary',
      class: ['base-btn-primary', 'text-body-2', 'font-weight-semiBold'],
      height: '2.25rem'
    },
    BaseBtnSecondary: {
      color: 'black500',
      variant: 'flat',
      disable: {
        style: {
          backgroundColor: 'green'
        }
      },
      style: {
        textDecoration: 'unset',
        textTransform: 'unset'
      },
      class: ['base-btn-secondary', 'text-body-2', 'font-weight-semiBold']
    },
    BaseBtnTertiary: {
      variant: 'outlined',
      style: {
        border: '1px rgb(var(--v-theme-lightBorder)) solid',
        textTransform: 'unset',
        borderRadius: '0.25em',
        height: '2.25rem'
      },
      class: ['base-btn-tertiary', 'text-body-2', 'font-weight-semiBold']
    },
    BaseBtnLink: {
      variant: 'text',
      color: 'rgb(var(--v-theme-black500))',
      style: {
        maxHeight: '2.25rem'
      },
      class: ['base-btn-link', 'text-body-2', 'font-weight-semiBold']
    },
    BaseBtnIcon: {
      variant: 'text',
      color: 'rgb(var(--v-theme-black500))',
      class: ['base-btn-link']
    },
  }
})
