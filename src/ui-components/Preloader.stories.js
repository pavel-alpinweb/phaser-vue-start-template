import Preloader from './Preloader.component.vue';
import { EventBus } from '@/utils/utils';
import * as EventNames from '@/configs/eventNames.config.js';

export default {
  title: 'Base UI Components/Preloader',
  component: Preloader,
  parameters: {
    docs: {
      description: {
        component: 'Прелоадер, управляемый через события EventBus.',
      },
    },
  },
  argTypes: {
    // Описание событий
    PRELOADING_PROGRESS: {
      action: 'PRELOADING_PROGRESS',
      table: {
        category: 'Events',
        type: { summary: 'number' },
      },
      description: 'Вызывается при обновлении прогресса загрузки',
    },
    COMPLETE_PRELOADING: {
      action: 'COMPLETE_PRELOADING',
      table: {
        category: 'Events',
        type: { summary: 'boolean' },
      },
      description: 'Вызывается при завершении загрузки',
    },
  },
};

const Template = (args) => ({
  components: { Preloader },
  template: `
    <div style="height: 50vh; background: gray;">
        <Preloader />
    </div>`,
});

export const Default = Template.bind({});
