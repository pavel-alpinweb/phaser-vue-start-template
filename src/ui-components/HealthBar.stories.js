import HealthBar from './HealthBar.component.vue';

export default {
  title: 'Game Widgets/HealthBar',
  component: HealthBar,
  tags: ['autodocs'],
  argTypes: {
    currentHealth: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Текущий уровень здоровья в процентах',
    },
    maxHealth: {
      control: { type: 'number', min: 1 },
      description: 'Максимальное здоровье',
    },
  },
};
export const Full = {
  args: {
    currentHealth: 100,
    maxHealth: 100,
  },
};
export const Half = {
  args: {
    currentHealth: 50,
    maxHealth: 100,
  },
};
export const Low = {
  args: {
    currentHealth: 20,
    maxHealth: 100,
  },
};
