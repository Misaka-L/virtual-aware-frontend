import { createSSRApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import {
  mdiRadar,
  mdiPoll,
  mdiCalendar,
  mdiAirplane,
  mdiAltimeter,
  mdiSpeedometerSlow,
  mdiSpaceStation,
} from "@mdi/js";

const vuetify = createVuetify({
  ssr: true,
  theme: {
    defaultTheme: "dark",
  },
  icons: {
    defaultSet: "mdi",
    aliases: {
      ...aliases,
      radar: mdiRadar,
      poll: mdiPoll,
      calendar: mdiCalendar,
      airplane: mdiAirplane,
      altimeter: mdiAltimeter,
      speedometerSlow: mdiSpeedometerSlow,
      spaceStation: mdiSpaceStation,
    },
    sets: {
      mdi,
    },
  },
});

const app = createSSRApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
