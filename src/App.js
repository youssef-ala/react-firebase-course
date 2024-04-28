import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./components/Auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
function App() {
  const [movieList, setMovieList] = useState([]);
  /* new movie states*/ const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");

const [fileUpload, setFileUpload] = useState(null)


  const moviesCollectionRef = collection(db, "movies");
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      }
    
    );

    getMovieList();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();

  };
  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovieList();
  };

const uploadFile = async () =>{
  if(!fileUpload) return;
  const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
  try{

    await uploadBytes(filesFolderRef, fileUpload);
  } catch(error){
    console.log(error);
  }
}  

  return (
    <div className="App">
      <Auth />

      <div>
        <input
          placeholder="movie title..."
          type="text"
          onChange={(e) => {
            setNewMovieTitle(e.target.value);
          }}
        />
        <input
          placeholder="release date..."
          type="number"
          onChange={(e) => {
            setNewReleaseDate(Number(e.target.value));
          }}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => {
            setIsNewMovieOscar(e.target.checked);
          }}
        />
        <label>Received an oscar</label>
        <button onClick={onSubmitMovie}>submit movie</button>
      </div>

      <div>
        {movieList.map((movie) => {
          return (
            <div key={movie.id}>
              <h1 style={{ color: movie.receivedAnOscar ? "#00ff00" : "red" }}>
                {movie.title}
              </h1>
              <p>{movie.releaseDate}</p>
              <button onClick={() => deleteMovie(movie.id)}>
                Delete Movie
              </button>

              <input
                placeholder="new title..."
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <button onClick={() => updateMovieTitle(movie.id)}>
                update title
              </button>
            </div>
          );
        })}
      </div>
      <div>
      <br/>
      <br/>
      <br/>
      <br/>
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>upload file</button>
      </div>
    </div>
  );
}

export default App;




