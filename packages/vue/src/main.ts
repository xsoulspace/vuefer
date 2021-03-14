import { HeroesModel } from "#/models/HeroesModel";
import { ScaffoldApp } from "#/pages/ScaffoldApp";
import { createApp } from "vue";
import "../../vuefer/dist/style.css";
import {
  MultiProvider,
  Navigation,
  NavigationController
} from "../../vuefer/lib";
// import vueGridLayout from 'vue-grid-layout'

const app = MultiProvider.build({
  models: [NavigationController, HeroesModel],
  child: Navigation({
    child: ScaffoldApp,
  }),
});

createApp(app).mount("#app");
