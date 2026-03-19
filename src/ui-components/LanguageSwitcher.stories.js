import LanguageSwitcher from './LanguageSwitcher.vue';
import i18next from '@/i18n.js';

export default {
  title: 'Game Widgets/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: '<div style="background: #a09380; padding: 100px; min-height: 200px;"><story /></div>',
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Кнопка переключения языков (RU/EN). Использует глобальный экземпляр i18next.',
      },
    },
  },
};

export const Default = {
  render: () => ({
    components: { LanguageSwitcher },
    template: '<LanguageSwitcher />',
  }),
};

export const InRussian = {
  render: () => ({
    components: { LanguageSwitcher },
    setup() {
      i18next.changeLanguage('ru');
    },
    template: '<LanguageSwitcher />',
  }),
};

export const InEnglish = {
  render: () => ({
    components: { LanguageSwitcher },
    setup() {
      i18next.changeLanguage('en');
    },
    template: '<LanguageSwitcher />',
  }),
};