// Начальное добавление существующих котов из БД на страницу + обновление
console.log(cards.length);
if (cards.length == 0) {
    createCardFromDatabase()
};


function createCardFromDatabase () {
    if (!cats) {
        fetch(path + "show")
            .then(res => {
                if (res.statusText === 'OK') {
                    return res.json();
                };
            })
            .then(data => {
                console.log(data);
                if (!data.length) {
                    alert('У Вас еще нет ни одного питомца!')
                } else {
                    cats = [...data];
                    storage.setItem('cats-data', JSON.stringify(data));

                    for (let catDB of data) {
                        container.innerHTML += createCard(catDB);
                    };
                };
            });
    } else {
        container.innerHTML = "";
        cats.forEach(cat => {
        container.innerHTML += createCard(cat);
        });
    }
};


reloadBtn.addEventListener("click", reload); 

function reload () {
    storage.removeItem("cats-data");
    fetch(path + "show")
        .then(res => {
            if (res.statusText === 'OK') {
                return res.json();
            };
        })
        .then(data => {
            if (!data.message) {
                cats = [...data];
                storage.setItem("cats-data", JSON.stringify(cats));
                container.innerHTML = "";
                data.forEach(cat => {
                    container.innerHTML += createCard(cat);
                })
            }
        })
        .then(data => alert('Страница обновлена!'))
};


// Функция добавления кота в БД и назначение ID

function addCat(cat) {
    fetch(path + "ids")
    .then(res => res.json())
    .then(res => {
        if (res.length) {
            cat.id = Math.max(...res) + 1
        } else {
            cat.id = 1;
        }
        return cat.id;
    })
    .then(() => {
        return fetch(path + "add", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cat),
        })
    })
    .then((res) => {
        if (res.status === 200) {
            container.innerHTML = "";
            cats.push(cat);
            storage.setItem("cats-data", JSON.stringify(cats));
            cats.forEach(cat => {
                container.innerHTML += createCard(cat);
            });
            addForm.reset()
        } else {
            alert(data.message);
        }
        return res.json()
    })
    .then(data => console.log(data));
};

// Функция удаления кота и карточки

function deleteCard (id, el) {
    let card = el.parentElement.parentElement;
    console.log(card);
    if (id) {
        return fetch(`${path}delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                card.remove();
                cats = cats.filter(el => el.id !== id);
                storage.setItem('cats-data', JSON.stringify(cats));
            }
        });
    };
};

// Функция изменения кота

function updateCard (cat) {
  fetch(`${path}update/${cat.id}`, {
        method: 'PUT',
        body: JSON.stringify(cat),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res => {
       console.log(res);
       if (res.status === 200) {
        
            // console.log(cats);
            // cats.forEach(el => {
            //     if (el.id === cat.id) {
            //         console.log(el);
            //        return el
            //     }
            //     return cat
            // });
            // console.log(cats);
            // storage.setItem("cats-data", JSON.stringify(cats));
            // console.log(cats);
            // container.innerHTML = "";
            // cats.forEach(cat => {
            //     container.innerHTML += createCard(cat);
            // })
            alert('Изменения внесены!')
            reload()
            
        } else {
            alert(data.message);
        }
        return res.json()
    })

};

function setLike(cat, el) {
    cat = cats.find(el => el.id === cat)
    console.log(cat);
    let card = el.lastElementChild;
    console.log(card); 

    if (cat.id) {
                        return fetch(`${path}update/${cat.id}`, {
                            method: 'PUT',
                            body: JSON.stringify({favourite: !cat.favourite}),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        .then(res => {
                            if (res.status === 200) {
                                card.classList.toggle("fa-solid");
                                card.classList.toggle("fa-regular");
                                cats = cats.map(catEl => {
                                    if (catEl.id === cat.id) {
                                        catEl.favourite = !cat.favourite;
                                    }
                                    return catEl;
                                });
                                storage.setItem('cats-data', JSON.stringify(cats));
                            };
                        });
                    };
}

//    function showCard (cat, id) {
//         	let content = document.getElementsByClassName('container')[0];
//             cat = cats.find(cat => cat.id === id);
//         	content.insertAdjacentHTML('afterbegin', generateCatCardShowPopup(cat));
// };


