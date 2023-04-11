// Добавление карточки кота по кнопке

function createCard (cat) {
    return `
            <div class="card">
                <div class="img__box" style="background-image: url('${cat.image || "images/default\ cat.jpg"}')" onclick="setLike(${cat.id},this)">
                <i class="${cat.favourite ? "fa-solid" : "fa-regular"} fa-heart fa-xl card__like"></i>
                </div>
                <div class="card-body">
                <h2 class="card-title">${cat.name}</h2>
                </div>
                <div class="card-btn">
                    <button class="btn" onclick="showCard(${cat.id}, this)">Посмотреть</button>
                    <button class="btn-primary" onclick="showUpdateForm(${cat.id}, this)" title="Внести изменения в карточку"><i class="fa-sharp fa-solid fa-pen"></i></button>
                    <button class="btn-primary" onclick="deleteCard(${cat.id}, this)" title="Удалить карточку"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
    `;
};

// Создание модального окна с информацией

function generateCatCardShowPopup (cat) {
    return `
            <div class="popup-container-cat-card">
                <div class="popup-cat-card">
                    <div class="popup-close-cat-card btn"><i class="fa-solid fa-xmark"></i></div>
                    <div style="font-size: 18px">Кличка: ${cat.name}</div>
                    <div class="form_img_show" style="background-image: url('${cat.image || "images/default\ cat.jpg"}')"></div>
                    <div class="card-body">
                        <div>Рейтинг котика: ${cat.rate || "Рейтинг не указан"}</div>
                        <div>Возраст: ${cat.age || "Возраст не указан"}</div>
                        <div>Описание: ${cat.description || "Информации пока нет..."}</div>
                    </div>
                </div>
            </div>`;   
};

// Создание модального окна изменения карточки

const generateCatCardUpdatePopup = (cat) => {
    return `
            <div class="popup-update-container">
                <div class="popup-update">
                    <div class="popup-close-update btn-primary"><i class="fa-solid fa-xmark"></i></div>
                    <form action="" id="update" autocomplete="off">
                        <div class="form-img-update" style="background-image: url(${cat.image})">
                        </div>
                        <div><label>Кличка</label>
                            <input type="text" name="name">${cat.name}<div>
                        <div><label>Возраст</label>
                            <input type="number" name="name" />${cat.age || "Возраст не указан"}</div>
                        <div><label>Рейтинг</label>
                            <input
                                type="number"
                                name="rate"
                        />${cat.rate || "Рейтинг не указан"}</div>
                        <label>
                        Любимчик <input type="checkbox" name="favourite" checked/>
                        </label>
                        <div><label>Описание</label>
                            <textarea name="description" placeholder="Описание">${cat.description || "Информации пока нет..."}</textarea></div>
                        <div><label>Ссылка на изображение</label>
                            <input type="text" name="image" />${cat.image || "Изображение по умолчанию"}</div>
                        <button type="submit">Изменить</button>
                    </form>
                </div>
            </div>`;
};
