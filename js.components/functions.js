// Начальное добавление существующих котов из БД на страницу + обновление

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
            cats.push(cat);
            container.innerHTML = "";
            cats.forEach(cat => {
                container.innerHTML += createCard(cat);
            });
            addForm.reset();
            storage.setItem("cats-data", JSON.stringify(cats));
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
    if (id) {
        return fetch(`${path}delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
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
        if (res.status === 200) {            
            alert('Изменения внесены!')
        } else {
            alert(data.message);
        }
    })

};

function setLike(cat, el) {
    cat = cats.find(el => el.id === cat)
    let card = el.lastElementChild;

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
                container.innerHTML = "";
                    cats.map(cat => {
                        container.innerHTML += createCard(cat);
                    });
            };
        });
    };
}
