import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ onClose, isOpen, onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function nameInputValue(e) {
    setName(e.target.value);
  };

  function nameInputAbout(e) {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  const childrenProfile = <>
    <fieldset className="popup__field">
      <input id="name-input" type="text" className="popup__input popup__input_type_name" value={name} name="name" placeholder="Имя" minLength="2" maxLength="40" required onChange={nameInputValue} />
      <span className="name-input-error input-error" />
    </fieldset> 
    <fieldset className="popup__field">
      <input  id="job-input" type="text" className="popup__input popup__input_type_job" value={description} name="about" placeholder="О себе" minLength="2" maxLength="200" required onChange={nameInputAbout} />
      <span className="job-input-error input-error" /> 
    </fieldset>
    <input type="submit" value="Сохранить" className="popup__button-save" />
  </>;
  return(
    <PopupWithForm onClose = {onClose} active = {isOpen} name = {'profile'} title = {'Редактировать профиль'} children = {childrenProfile} onSubmit={handleSubmit} />
  )
}

export default EditProfilePopup;