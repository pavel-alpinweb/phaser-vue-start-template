import { ref } from "vue";
import UiModal from "./UiModal.component.vue";

export default {
  title: "Base UI Components/Modal",
  component: UiModal,
  parameters: {
    docs: {
      description: {
        component:
          "Модальное окно, которое позиционируется относительно элемента canvas внутри указанного контейнера. Поддерживает закрытие по Escape и клику вне содержимого.",
      },
    },
  },
  argTypes: {
    modelValue: {
      control: "boolean",
      description: "Управляет видимостью модального окна (v-model)",
      defaultValue: false,
    },
    target: {
      control: "text",
      description:
        "CSS-селектор контейнера с canvas, к которому позиционируется модалка",
      defaultValue: "#story-game-container",
    },
    maxWidth: {
      control: "text",
      description: "Максимальная ширина контента модального окна",
      defaultValue: "90%",
    },
    maxHeightPadding: {
      control: "number",
      description:
        "Отступ по высоте (в пикселях), вычитаемый из высоты canvas для максимальной высоты контента",
      defaultValue: 40,
    },
  },
};

const Template = (args) => ({
  components: { UiModal },
  setup() {
    const isOpen = ref(args.modelValue ?? false);

    // Синхронизация пропа modelValue с локальным состоянием
    const updateModelValue = (val) => {
      isOpen.value = val;
    };

    return { args, isOpen, updateModelValue };
  },
  template: `
    <div>
      <div id="story-game-container" style="width:800px; height:400px; border:1px solid #ccc; margin:0 auto; position:relative;">
        <canvas id="story-canvas" width="800" height="400" style="display:block; width:100%; height:100%; background:#222;"></canvas>
      </div>
      <button @click="isOpen = true">Открыть модалку</button>
      <UiModal 
        v-bind="args" 
        :modelValue="isOpen" 
        @update:modelValue="updateModelValue"
      >
        <template #default>
          <h2>Заголовок модального окна</h2>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <p>Это содержимое модального окна.</p>
          <button @click="updateModelValue(false)">Закрыть</button>
        </template>
      </UiModal>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  modelValue: false,
  target: "#story-game-container",
  maxWidth: "400px",
  maxHeightPadding: 40,
};
