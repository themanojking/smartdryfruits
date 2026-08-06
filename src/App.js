import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Hero from './Pages/Hero';
import DryFruits from './Pages/Product Pages/DryFruits';
import Dates from './Pages/Product Pages/Dates';
import Nuts from './Pages/Product Pages/Nuts';
import Seeds from './Pages/Product Pages/Seeds';
import { About } from './Pages/About';
import { Contact } from './Pages/Contact-Us';
import Cart from './Pages/Cart';
import { Provider } from 'react-redux';
import store from './redux/store';
import PrivacyPolicyPage from './Pages/Terms&Conditions Pages/PrivacyPolicy';
import TermsAndConditionsPage from './Pages/Terms&Conditions Pages/TermsConditions';
import ShippingPolicyPage from './Pages/Terms&Conditions Pages/Shipping';
import ReturnPolicyPage from './Pages/Terms&Conditions Pages/ReturnPolicy';
import ScrollToTop from './Component/ScrollToTop';
import ComboProduct from './Pages/Product Pages/ComboProduct';

const App = () => {
  return (
    <Provider store={store}>
      
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Hero />} />

          <Route path='/dryfruits' element={<DryFruits />} />
          <Route path='/dates' element={<Dates />} />
          <Route path='/nuts' element={<Nuts />} />
          <Route path='/seeds' element={<Seeds />} />
          <Route path='/combo' element={<ComboProduct />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
          <Route path='/terms-conditions' element={<TermsAndConditionsPage />} />
          <Route path='/shipping-policy' element={<ShippingPolicyPage />} />
          <Route path='/return-policy' element={<ReturnPolicyPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App; // Make sure to use default export
