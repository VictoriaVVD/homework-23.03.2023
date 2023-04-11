// Открытие модального окна с информацией

function showCard (cat) {
    cat = cats.find(el => el.id === cat)

	const content = document.getElementsByClassName('container')[0];
	content.insertAdjacentHTML('afterbegin', generateCatCardShowPopup(cat));
    showCardClose();
};  


function showCardClose () {
    const popupCarCardBox = document.querySelector(".popup-container-cat-card");
    const popupCloseCatCard = document.querySelector('.popup-close-cat-card');
    popupCloseCatCard.addEventListener('click', e => {
        popupCarCardBox.style.visibility = 'hidden';
    });
    document.addEventListener('click', (e) => {
        if (e.target === popupCarCardBox) {
            popupCarCardBox.style.visibility = 'hidden';
        }
    })
};

// Открытие модального окна изменения карточки

function showUpdateForm (cat, el) {
    let cats = JSON.parse(storage.getItem('cats-data'));
    cat = cats.find(el => el.id === cat);
    let card = el.lastElementChild;

    popupUpdate.style.visibility = 'visible';
    popupUpdateBox.style.visibility = 'visible';
	
    const content = document.getElementsByClassName('container')[0];
	content.insertAdjacentHTML('afterbegin', generateCatCardUpdatePopup(cat));

    let imgBox = document.querySelectorAll('.form-img-update')[1];
    imgBox.style.backgroundImage = `url(${cat.image})`;
    console.log(imgBox);

    for (let key in cat) {
        console.log(key);
        if (key != 'id') {
            if (updateForm.elements[key].type === 'checkbox' && cat[key] === 'true') {
                updateForm.element[key].checked === 'true';
                // setLike(cat, card);
            }
            else {
                updateForm.elements[key].value = cat[key];
            }
            container.innerHTML = "";
            cats.map(cat => {
                container.innerHTML += createCard(cat);
            })
            storage.setItem("cats-data", JSON.stringify(cats));
        }  
    }

    updateForm.addEventListener('input', function(event) { 
        cat[event.target.name] = event.target.value;
        storage.setItem("cats-data", JSON.stringify(cats));
        container.innerHTML = "";
            cats.map(cat => {
                container.innerHTML += createCard(cat);

    })

// Вызов формы редактирования карточки

    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updateCard(cat); 
        storage.setItem('cats-data', JSON.stringify(cats));

        popupUpdate.style.visibility = 'hidden';
        popupUpdateBox.style.visibility = 'hidden';
        })
    })
}

popupUpdateClose.addEventListener('click', e => updateFormClose());
function updateFormClose () {
    popupUpdate.style.visibility = 'hidden';
    popupUpdateBox.style.visibility = 'hidden';
};
document.addEventListener('click', (e) => {
    if (e.target === popupUpdateBox) {
        popupUpdate.style.visibility = 'hidden';
        popupUpdateBox.style.visibility = 'hidden';
    }
});

// Вызов формы добавления

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('popup_open', 'popup-animation');
    popupBox.classList.add('popup_open');
});

popupClose.addEventListener('click', (e) => {
    popup.classList.remove('popup_open', 'popup-animation');
    popupBox.classList.remove('popup_open');
});


addForm.addEventListener('input', function(event){
    let cat = {};
    cat[event.target.name] = event.target.value;
})

addForm.addEventListener('submit', e => {
    e.preventDefault();
    addCat(cat); 

    popup.classList.remove('popup_open', 'popup-animation');
    popupBox.classList.remove('popup_open');
})

document.addEventListener('click', (e) => {
    if (e.target === popupBox) {
        popup.classList.remove('popup_open', 'popup-animation');
        popupBox.classList.remove('popup_open');
    }
})