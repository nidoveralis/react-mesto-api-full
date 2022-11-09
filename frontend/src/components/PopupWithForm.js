function PopupWithForm({onClose, active, name, title, children, onSubmit}) {

  return(
    <div className = {`${ active ? "popup_opened" : ""} popup  popup-${name}`} >
      <div className="popup__container">
        <button className="popup__button-close button" type="button" onClick={onClose} />
        <form className={`popup__form form-${name}`} name={name} noValidate onSubmit={onSubmit} >
          <h2 className="popup__title">{title}</h2>
          {children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;