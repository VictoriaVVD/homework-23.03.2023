// Открытие модального окна с информацией

function showCard (cat) {
    cat = cats.find(el => el.id === cat)
    console.log(cat);
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

function showUpdateForm (cat) {
    cat = cats.find(el => el.id === cat)
    popupUpdate.style.visibility = 'visible';
    popupUpdateBox.style.visibility = 'visible';
	
    const content = document.getElementsByClassName('container')[0];
	content.insertAdjacentHTML('afterbegin', generateCatCardUpdatePopup(cat));
    // const cardImgBox = document.querySelector('.form-img-update');
    // if (!cat.image) {
    //     cardImgBox.style.backgroundImage = "url(images/default\ cat.jpg)";
    // } else {
    //     cardImgBox.style.backgroundImage = `url(${cat.image})`;
    // }
    
    Array.from(updateForm.elements).map((el) => {
        if (el.name) {
            console.log(el.name);
            if (el.type === 'checkbox') {
                if (cat[el.name]) {
                    el.checked};
            } else {
                el.value = cat[el.name];
            }
        };
    }); 

// Вызов формы редактирования карточки

    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const checkboxBtn = e.target.querySelector('[type=\"checkbox\"]');
        console.log(checkboxBtn);
        checkboxBtn.addEventListener('change', (e) => console.log(checkbox));
        const updateFormData = new FormData(e.target);

        let catUpd = Object.fromEntries(updateFormData.entries());
        catUpd = {id: cat.id, ...catUpd}
        
        // if (catUpd.favourite === 'on') {
        //     setLike(catUpd, card)
        // };

        updateCard(catUpd); 
        updateForm.reset();  
        popupUpdate.style.visibility = 'hidden';
        popupUpdateBox.style.visibility = 'hidden';
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

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cat = {};

    for (let i = 0; i < addForm.elements.length; i++) {
        let input = addForm.elements[i];
        if (input.name) {
            if (input.type === "checkbox") {
                cat[input.name] = input.checked;
            } else {
                cat[input.name] = input.value;
            }
        }
    }

    addCat(cat); 

    popup.classList.remove('popup_open', 'popup-animation');
    popupBox.classList.remove('popup_open');
});

document.addEventListener('click', (e) => {
    if (e.target === popupBox) {
        popup.classList.remove('popup_open', 'popup-animation');
        popupBox.classList.remove('popup_open');
    }
});