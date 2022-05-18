import React from "react";
import { useEffect, useState } from "react";
import { Route, Switch } from 'react-router-dom';
import logo from "../logo.svg";
import "../App.css";
import logoHeader from "../images/logo.svg";
import editIcon from "../images/pen.svg";
import addIcon from "../images/plus.svg";
import closeIcon from "../images/Close-Icon.svg";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToBeDeleted, setCardToBeDeleted] = useState({});

  useEffect(() => {
    api
      .getUserData()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err));

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleConfirmDeleteClick(card) {
    setCardToBeDeleted(card);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.handleLikeClick(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete() {
    api
      .deleteCard(cardToBeDeleted._id)
      .then((res) => {
        setCards((state) => state.filter((c) => c._id !== cardToBeDeleted._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(info) {
    api
      .editProfile(info)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(obj) {
    api
      .updateAvatar(obj)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddCard(obj) {
    api
      .addCard(obj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="wrapper">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
         
          <Switch>
            <Route path='/sign-up'>
              <Header buttonName={'Войти'}/>
              <Register/>
            </Route>
    
            <Route path='/sign-in'>
              <Header buttonName={'Регистрация'}/>
              <Login/>
            </Route>
            <Route exact path='/'>
              <Header buttonName={'Выйти'}/>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onCardDeleteConfirm={handleConfirmDeleteClick}
                cards={cards}
              />
            </Route>
          </Switch>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
        />
        <ConfirmDeleteCardPopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={cardToBeDeleted}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        
        <InfoTooltip onClose={closeAllPopups}/>


      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
