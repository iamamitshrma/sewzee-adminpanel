
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'


import App from './App.jsx'
import './index.css'
import { persistor, store } from './store/store.js'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)