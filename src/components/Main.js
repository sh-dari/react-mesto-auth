import React from 'react';
import Profile from './Profile';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';

function Main({
  isEditAvatarPopupOpen,
  isEditProfilePopupOpen,
  isAddPlacePopupOpen,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  onRegistrationSubmit,
  handleSuccessRegistration
}) {

  return(
    <main className="content">
      <Routes>
        <Route path="/mesto-react" element={<Navigate to="/" replace />}/>
        <Route path="/" element={
          <ProtectedRouteElement
            element={Profile}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            cards={cards}
          />
        }/>
        <Route path="/sign-up" element={<Register onRegistrationSubmit={onRegistrationSubmit} handleSuccessRegistration={handleSuccessRegistration}/>} />
        <Route path="/sign-in" element={<Login />} />
      </Routes>
    </main>
  );
}

export default Main;
