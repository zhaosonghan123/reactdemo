import ReactDOM from "react-dom"
import Router from './router'
import './assets/base.less'
import store from './store'
import {Provider} from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <Router/>
    </Provider>,
  document.getElementById('root')
 )