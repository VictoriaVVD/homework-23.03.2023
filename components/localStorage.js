let storage = window.localStorage; // инициализация локального хранилища
let cats = storage.getItem('cats-data');
if (cats) {
    try {
        cats = JSON.parse(cats);
        console.log(cats);
        for (let elCat of cats) {
            createCard(elCat);
        }
    } catch(error) {
        cats = null;
        console.log(error);
    }  
};
console.log(storage);
console.log(cats);

