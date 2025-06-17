import { createApp } from "vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { VBtn, VChip, VExpansionPanel, VExpansionPanels, VAlert, VSnackbar } from "vuetify/components";
import * as directives from "vuetify/directives";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import { aliases, md } from "vuetify/iconsets/md";
import "./style.scss";

const vuetify = createVuetify({
  components: {
    VBtn,
    VChip,
    VExpansionPanel,
    VExpansionPanels,
    VAlert,
    VSnackbar,
  },
  directives,
  aliases,
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
  },
});

import App from "./App.vue";
import { router } from "@/router.js";
import { createPinia } from "pinia";

createApp(App).use(router).use(createPinia()).use(vuetify).mount("#app");
