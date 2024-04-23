import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { CarsShowAll } from './components/cars/CarsShowAll'
import { AppHome } from './components/AppHome'
import { AppMenu } from './components/AppMenu'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CarDetails } from './components/cars/CarDetails'
import { CarDelete } from './components/cars/CarDelete'
import { CarsAdd } from './components/cars/CarsAdd'
import { CarsStatistics } from './components/cars/CarsStatistics'
import { CarUpdate} from './components/cars/CarUpdate';
import { ClientsShowAll } from './components/clients/ClientsShowAll'
import { ClientDelete } from './components/clients/ClientDelete'
import { ClientDetails } from './components/clients/ClientDetails'
import { ClientAdd } from './components/clients/ClientAdd'
import { ClientsStatistics } from './components/clients/ClientsStatistics'
import { ClientUpdate } from './components/clients/ClientUpdate'
import {AddressAdd} from './components/addresses/addressAdd'
import {AddressDelete} from './components/addresses/addressDelete'
import {AddressDetails} from './components/addresses/addressDetails'
import {AddressUpdate} from './components/addresses/addressesUpdate'
import { AddressesShowAll } from './components/addresses/addressesShowAll'
import { BookingsShowAll } from './components/bookings/BookingsShowAll'
import { BookingsDetails } from './components/bookings/BookingsDetails'
import { BookingsDelete } from './components/bookings/BookingsDelete'
import { BookingsAdd } from './components/bookings/BookingsAdd'




function App() {
  return (
		<React.Fragment>
			<Router>
				<AppMenu />

				<Routes>
					<Route path="/" element={<AppHome />} />
          <Route path="/cars" element={<CarsShowAll />} />
          <Route path="/cars/:id/details" element={<CarDetails />} />
          <Route path="/cars/:id/delete" element={<CarDelete />} />
          <Route path="/cars/add" element={<CarsAdd />} />
          <Route path="/cars/statistics" element={<CarsStatistics />} />
		  <Route path="/cars/:id/edit" element={<CarUpdate />} />

		  <Route path="/clients" element={<ClientsShowAll />} />
          <Route path="/clients/:id/details" element={<ClientDetails />} />
          <Route path="/clients/:id/delete" element={<ClientDelete />} />
          <Route path="/clients/add" element={<ClientAdd />} />
          <Route path="/clients/statistics" element={<ClientsStatistics />} />
		  <Route path="/clients/:id/edit" element={<ClientUpdate />} />
		  
		  <Route path="/addresses" element={<AddressesShowAll />} />
          <Route path="/addresses/:id/details" element={<AddressDetails />} />
          <Route path="/addresses/:id/delete" element={<AddressDelete />} />
          <Route path="/addresses/add" element={<AddressAdd />} />
		  <Route path="/addresses/:id/edit" element={<AddressUpdate />} />

		  <Route path="/bookings" element={<BookingsShowAll />} />
          <Route path="/bookings/:id/details" element={<BookingsDetails />} />
          <Route path="/bookings/:id/delete" element={<BookingsDelete />} />
          <Route path="/bookings/add" element={<BookingsAdd />} />
		  <Route path="/bookings/:id/edit" element={<AddressUpdate />} />
		
				</Routes>
			</Router>
		</React.Fragment>
	);
}

export default App
