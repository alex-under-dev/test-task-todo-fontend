import { Routes } from './Routes';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { DndProvider } from 'react-dnd';
//@ts-ignore
import { HTML5Backend } from 'react-dnd-html5-backend';


function App() {

  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </DndProvider>
  )
}

export default App;
