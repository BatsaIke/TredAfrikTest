import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import feedReducer from './components/redux/quiz/quizSlice';

const store = configureStore({
  reducer: {
    feed: feedReducer,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const RootComponent = (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);


root.render(RootComponent);