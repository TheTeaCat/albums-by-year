import Vue from "vue";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(
  faGithub
)

import { 
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
  faSlash
} from '@fortawesome/free-solid-svg-icons'

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
  faSlash
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
