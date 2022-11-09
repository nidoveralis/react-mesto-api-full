import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onClose, isOpen, onAddPlace}) {

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  const childrenElement = <>
    <fieldset className="popup__field">
      <input id="name-element-input" type="text" className="popup__input popup__input_type_title" value={name} name="name" placeholder="Название" minLength="2" maxLength="30" required onChange={handleInputName} />
      <span className="name-element-input-error input-error" /> 
    </fieldset>
    <fieldset className="popup__field">
      <input id="link-element-input" type="url" className="popup__input popup__input_type_link" value={link} name="link" placeholder="Ссылка на картинку" required onChange={handleInputLink} />
      <span className="link-element-input-error input-error" /> 
    </fieldset>
    <input type="submit" value="Создать" className="popup__button-save" />
    </>;

    function handleInputName(e) {
      setName(e.target.value)
    };

    function handleInputLink(e) {
      setLink(e.target.value)
    };

    function handleAddPlaceSubmit(e) {
      e.preventDefault();
      onAddPlace({
        name,
        link
      });
    };

    React.useEffect(()=>{
      setName('');
      setLink('');
    },[isOpen, onClose])

  return (
    <>
      <PopupWithForm onClose = {onClose} active = {isOpen} name = {'elements'} title = {'Новое место'} children = {childrenElement} onSubmit={handleAddPlaceSubmit} />
    </>
  )
};
export default AddPlacePopup;