const admin = require('firebase-admin');
const serviceAccount = require('./project-kino-971ce-firebase-adminsdk-g9msq-a1142810b0.json');

// Инициализация Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Загрузка данных из файла JSON
const moviesData = require('./dataMovies.json'); 

async function uploadData() {
  const collectionRef = db.collection('movies'); // Название коллекции в Firestore
  const promises = [];

  // Перебор данных каждого фильма и загрузка в Firestore
  moviesData.forEach((movie) => {
    const { id, image, title, description, country, genre, release, IMDb, video, averageRating } = movie;
    const docRef = collectionRef.doc(id.toString()); // Использование ID фильма как идентификатора документа
    // Сохранение данных фильма в Firestore
    promises.push(docRef.set({
      image,
      title,
      description,
      country,
      genre,
      release,
      IMDb,
      video,
      averageRating
    }));
  });

  // Ожидание завершения всех операций записи
  await Promise.all(promises);
  console.log('All movies have been successfully uploaded!');
}

// Запуск функции загрузки данных
uploadData().catch(console.error);
