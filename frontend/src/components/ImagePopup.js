function ImagePopup({active, onClose, card}) {

  return(
    <div className={`${ active ? "popup_opened" : ""} popup  popup-picture`}>
      <div className="popup__container">
        <button className="popup__button-close button" type="button" onClick={onClose}/>
        <img className="popup__image" src={`${card.link}`} alt={card.name} />
        <p className="popup__subtitle">{card.name}</p>
      </div>
    </div>
  )
}
export default ImagePopup;