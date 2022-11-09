import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar}) {

  const avatarRef = React.createRef();

  const childrenAvatar = 
      <>
        <fieldset className="popup__field">
          <input  id="avatar" type="url" className="popup__input popup__input_type_avatar" name="avatar" minLength="2" maxLength="200" placeholder="Ссылка на картинку" required ref={avatarRef} />
          <span className="avatar-error input-error" /> 
        </fieldset>
        <input type="submit" value="Сохранить" className="popup__button-save popup__button-save_avatar" />
      </>;

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  };

  React.useEffect(()=>{
    avatarRef.current.value='';
  },[isOpen, onClose])

  return(
    <>
      <PopupWithForm onClose = {onClose} active = {isOpen} name = {'avatar'} title = {'Обновить аватар'} children = {childrenAvatar} onSubmit={handleSubmit} />
    </>
  )
};
export default EditAvatarPopup;