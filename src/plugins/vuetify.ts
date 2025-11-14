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
    primary: '#2D5016', // Vert foncé pour les boutons (#2D5016 = RGB(45, 80, 22))
    'on-primary': '#FFFFFF', // Texte blanc sur fond vert foncé pour bon contraste
    secondary: '#509E2F',
    'on-secondary': '#FFFFFF',
    background: '#F5F1E8', // Beige très clair pour le fond
    'on-background': '#1E1E1E', // Texte sombre sur fond beige pour bon contraste
    surface: '#FAF8F3', // Beige très clair légèrement plus clair pour les surfaces
    'on-surface': '#1E1E1E', // Texte sombre sur surface beige pour bon contraste
    error: '#CA0631',
    'on-error': '#FFFFFF',
    warning: '#FF8C00',
    'on-warning': '#FFFFFF',
    info: '#0076CF',
    'on-info': '#FFFFFF',
    success: '#2D5016', // Vert foncé pour le succès aussi
    'on-success': '#FFFFFF', // Texte blanc sur fond vert foncé pour bon contraste

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
    mainBg: '#F5F1E8', // Beige très clair pour le fond principal
    lightBorder: '#E8E3D8', // Bordure beige clair
    darkBorder: '#D4CEC0' // Bordure beige plus foncée
  }
}

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#ff4d6d',
    secondary: '#6BCB77',
    background: '#0F172A',
    surface: '#1E293B',
    error: '#ff4d6d',
    warning: '#FFA94D',
    info: '#3B82F6',
    success: '#6BCB77',

    red50: '#2D1A1D',
    red100: '#4A2D33',
    red200: '#6B3F49',
    red300: '#8F5260',
    red400: '#B36677',
    red500: '#ff4d6d',
    red600: '#E63950',
    red700: '#CC2E44',
    red800: '#B32438',
    red900: '#991A2C',

    orange50: '#2D2419',
    orange100: '#4A3D2D',
    orange200: '#6B5640',
    orange300: '#8F7354',
    orange400: '#B39068',
    orange500: '#FFA94D',
    orange600: '#E8953D',
    orange700: '#CC7F2E',
    orange800: '#B3691F',
    orange900: '#995310',

    black50: '#2D2D2D',
    black100: '#4A4A4A',
    black200: '#6B6B6B',
    black300: '#8F8F8F',
    black400: '#B3B3B3',
    black500: '#D9D9D9',
    black600: '#E6E6E6',
    black700: '#F0F0F0',
    black800: '#F5F5F5',
    black900: '#FAFAFA',

    grey50: '#1A1A1A',
    grey100: '#2D2D2D',
    grey200: '#404040',
    grey300: '#525252',
    grey400: '#666666',
    grey500: '#7A7A7A',
    grey600: '#8F8F8F',
    grey700: '#A3A3A3',
    grey800: '#B8B8B8',
    grey900: '#CCCCCC',

    green50: '#1A2417',
    green100: '#2D3D26',
    green200: '#405635',
    green300: '#537044',
    green400: '#668A53',
    green500: '#6BCB77',
    green600: '#7DD88A',
    green700: '#8FE59D',
    green800: '#A1F2B0',
    green900: '#B3FFC3',

    yellow50: '#2D2819',
    yellow100: '#4A3D2D',
    yellow200: '#6B5640',
    yellow300: '#8F7354',
    yellow400: '#B39068',
    yellow500: '#FFD93D',
    yellow600: '#E8C635',
    yellow700: '#CCB32E',
    yellow800: '#B3A027',
    yellow900: '#998D20',

    blue50: '#1A2333',
    blue100: '#2D3D4D',
    blue200: '#405766',
    blue300: '#537180',
    blue400: '#668B99',
    blue500: '#3B82F6',
    blue600: '#5B9FFF',
    blue700: '#7BB8FF',
    blue800: '#9BD1FF',
    blue900: '#BBEAFF',

    white: '#F8FAFC',
    mainBg: '#0F172A',
    lightBorder: '#334155',
    darkBorder: '#475569'
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
      lightTheme,
      darkTheme
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
    }
  }
})
