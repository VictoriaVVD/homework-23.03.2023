const cards = document.querySelectorAll('.card');
const user = "victoriavvd";
const path = `https://cats.petiteweb.dev/api/single/${user}/`;
const container = document.querySelector('.container');
const reloadBtn = document.querySelector('#reload-page');

// Переменные для открытия модальных окон

const addBtn = document.querySelector('#add-btn');
const popupBox = document.querySelector('.popup-container');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup-close');

const popupUpdateBox = document.querySelector('.popup-update-container');
const popupUpdate = document.querySelector('.popup-update');
const popupUpdateClose = document.querySelector('.popup-close-update');

const addForm = document.querySelector('#add');
const updateForm = document.forms.update;

