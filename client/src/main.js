//imports
  import vue from 'vue';
  import vuetify from 'vuetify';
  import router from 'vue-router';
  import paths from './routing.config';
  import app from './app.vue';

  /* import the fontawesome core */
  import { library } from '@fortawesome/fontawesome-svg-core';

  /* import font awesome icon component */
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  /* import specific icons */
  import { faBars, faCirclePlus, faBan, faPenToSquare, faX } from '@fortawesome/free-solid-svg-icons';

  /* add icons to the library */
  library.add(faBars);
  library.add(faCirclePlus);
  library.add(faBan);
  library.add(faPenToSquare);
  library.add(faX);

  /* add font awesome icon component */
  vue.component('font-awesome-icon', FontAwesomeIcon);

//use
  vue.use(router);
  vue.use(vuetify);
  vue.config.productionTip = false
  new vue({
    router: new router({routes: paths}),
    vuetify: new vuetify(),
    render: h => h(app)
  }).$mount('#app')
