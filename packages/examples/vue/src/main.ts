import { HeroesModel } from "#/models/HeroesModel";
import { ScaffoldApp } from "#/pages/ScaffoldApp";
import "@xsoulspace/vuefer/style.css";
import { createApp } from "vue";
import {
  MultiProvider,
  Navigation,
  NavigationController,
} from "../../../vuefer/dist";
// import vueGridLayout from 'vue-grid-layout'

const app = MultiProvider.build({
  models: [NavigationController, HeroesModel],
  child: Navigation({
    child: ScaffoldApp,
  }),
});

createApp(app).mount("#app");
