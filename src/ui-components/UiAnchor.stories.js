import UiAnchor from './UiAnchor.component.vue';

export default {
  title: 'Base UI Components/Anchor',
  component: UiAnchor,
  parameters: {
    docs: {
      description: {
        component:
          'Компонент для позиционирования произвольного содержимого относительно canvas внутри указанного контейнера. ' +
          'Отслеживает изменения размера и переключения полноэкранного режима, подстраивая позицию элемента.',
      },
    },
  },
  argTypes: {
    target: {
      control: 'text',
      description: 'CSS-селектор контейнера, внутри которого ищется canvas',
      table: {
        category: 'Props',
        type: { summary: 'string' },
        defaultValue: { summary: '".game-container"' },
      },
    },
    anchor: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Положение относительно canvas',
      table: {
        category: 'Props',
        type: { summary: `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'` },
        defaultValue: { summary: '"top-left"' },
      },
    },
    offsetX: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Отступ по оси X в пикселях',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 10 },
      },
    },
    offsetY: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Отступ по оси Y в пикселях',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: 10 },
      },
    },
    default: {
      description: 'Слот для содержимого, которое будет позиционироваться',
      table: {
        category: 'Slots',
        type: { summary: 'VNode' },
      },
    },
  },
};

const Template = (args) => ({
  components: { UiAnchor },
  setup() {
    return { args };
  },
  template: `
    <div style="padding:20px;background: grey;">
      <div id="story-game-container" style="width:800px; height:400px; border:1px solid #ccc; margin:0 auto; position:relative;">
        <canvas id="story-canvas" width="800" height="400" style="display:block; width:100%; height:100%; background:#222;"></canvas>
      </div>
      <UiAnchor v-bind="args" target="#story-game-container">
        <div style="background: rgba(255,255,255,0.95); padding:8px; border-radius:4px;">
          UI Content
        </div>
      </UiAnchor>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  target: '.game-container',
  anchor: 'top-left',
  offsetX: 0,
  offsetY: 0,
};
