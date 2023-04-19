import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import AlbumForm from "../components/PizzaForm";
import DeleteButton from "../components/DeleteButton";

export default ({albums, setAlbums, errors, setErrors}) => {
  const { id } = useParams();
  const [album, setAlbum] = useState();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/album/${id}`).then((res) => {
      setAlbum(res.data);
      setLoaded(true);
    });
  }, []);

  const updateAlbum = (album) => {
    axios.put(`http://localhost:8000/api/album/${id}`, album).then((res) => {
      setErrors([]),
      navigate("/");
    })
    .catch((err) => {
      console.log("test");
      const errorResponse = err.response.data.errors;
      const errorArr = [];
      for (const key of Object.keys(errorResponse)) {
        errorArr.push(errorResponse[key].message);
      }
      setErrors(errorArr);
    })
  };

  return (
    <div>
      <div className="card my-shadow mt-5 col-4 p-4 m-auto">
        {loaded && (
          <>
            <AlbumForm
              onSubmitProp={updateAlbum}
              initialTitle={album.title}
              initialArtistName={album.artistName}
              initialOwned={album.owned}
              initialDescription={album.description}
              initialGenres={album.genres}
              initialTitleError={null}
              initialArtistNameError={null}
              initialDescriptionError={null}
              initialGenresError={null}
              formTitle={`Edit ${album.title}`}
              errors={errors}
              setErrors={setErrors}
            />
            <br/>
            <DeleteButton albumId={album._id} deleteCallback={() => navigate("/")} />
          </>
        )}
      </div>
    </div>
  );
};
