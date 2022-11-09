import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, openCard, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `element__delete  popup-button ${isOwn ? "element__delete_active" : ""}`
  ); 
  const cardLikeButtonClassName = `element__like button ${isLiked ? "element__like_active" : ""} `;
  
  function handelCardClick() {
    openCard(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  };

  return (
    <div className="element">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} />
      <img className="element__image" style={{ backgroundImage: `url(${card.link})`}} onClick={handelCardClick} />
     <h2 className="element__title">{card.name}</h2>
      <div className="element__like-conteiner">
        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
        <span className="element__like-count">{card.likes.length}</span>
      </div>
    </div>
  )
};
export default Card