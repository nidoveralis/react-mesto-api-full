import React from 'react';
import errorImg from '../images/popup__error.jpg';
import successImg from '../images/popup__ok.jpg';

function InfoTooltip({ onClose, active, answer}) {
  console.log(answer)
  const [title, setTitle] = React.useState();
  const [image, setImage] = React.useState();
  React.useEffect(()=>{
    if(answer==='error'){
      setTitle('Что-то пошло не так! Попробуйте ещё раз.');
      setImage(errorImg);
    }if(answer==='success'){
      setTitle('Вы успешно зарегистрировались!');
      setImage(successImg);
    }
  }, [answer])
  return(
    <div className={`${ active ? "popup_opened" : ""} popup  popup-picture`}>
      <div className="popup__container">
        <div className='popup__frame'>
          <button className="popup__button-close button" type="button" onClick={onClose}/>
          <img className="popup-info__image" src={`${image}`} />
          <h2 className="popup-info__title">{title}</h2>
        </div>
      </div>
    </div>
  )
}
export default InfoTooltip;