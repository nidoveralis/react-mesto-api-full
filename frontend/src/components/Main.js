import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

  const userContext = React.useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__edit-avatar" onClick={onEditAvatar} />
        <div className="profile__avatar" style={{ backgroundImage: `url(${userContext.avatar})` }}  />
        <div className="profile-info">
          <h1 className="profile-info__title">{userContext.name}</h1>
          <button className="profile-info__edit button" type="button"  onClick={onEditProfile} />
          <p className="profile-info__subtitle">{userContext.about}</p>
        </div>
        <button className="profile__add-button button" type="button" onClick={onAddPlace} />
      </section>
      <section className="elements">
        {cards.map(card=> (
          <Card key = {card._id} card = {card} openCard = {onCardClick} onCardLike = {onCardLike} onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  )
}

export default Main;