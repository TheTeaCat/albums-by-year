import Vue from "vue";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(
  faGithub
)

import { 
  faPlus,
  faMinus,
  faSearch
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faPlus,
  faMinus,
  faSearch
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
