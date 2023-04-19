import { createStore } from 'vuex'

import Admin from './modules/admin/Admin'
import Public from './modules/public/Public'


export default createStore({
  modules: {
    admin: Admin,
    public: Public
  }
})
