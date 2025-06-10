import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon, FontAwesomeLayers } from "@fortawesome/vue-fontawesome";

library.add(faGithub);

import {
  faCheck,
  faCopy,
  faDownload,
  faFillDrip,
  faIceCream,
  faMinus,
  faMoon,
  faPlus,
  faSearch,
  faSignOutAlt,
  faSlash,
  faSyncAlt,
  faTimes,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faPlus,
  faMinus,
  faSearch,
  faTimes,
  faFillDrip,
  faIceCream,
  faMoon,
  faSignOutAlt,
  faSyncAlt,
  faWifi,
  faSlash,
  faDownload,
  faCopy,
  faCheck
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("font-awesome-layers", FontAwesomeLayers);
