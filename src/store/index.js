import reducer from "./reducer";
import {legacy_createStore as createRedux} from 'redux'

const store = createRedux(reducer)
export default store