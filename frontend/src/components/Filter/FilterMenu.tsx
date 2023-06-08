import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  genre: yup.string(),
  title: yup.string(),
  artist: yup.string(),
  minPrice: yup.number().min(0),
  maxPrice: yup.number().min(0),
  available: yup.boolean(),
});

export function FilterMenu() {
  const [, setSearchParams] = useSearchParams();

  const [values, setValues] = useState({
    genre: '',
    title: '',
    artist: '',
    minPrice: 0,
    maxPrice: 0,
    available: false,
  });

  const [, setErrors] = useState({});

  const generateQuery = (formValues: typeof values) => {
    const params = new URLSearchParams();
    Object.entries(formValues).forEach(([key, value]) => {
      if (value !== '' && value !== 0) {
        if (key === 'genre') {
          const firstLetter = value.toString().charAt(0).toUpperCase();
          const restOfLetters = value.toString().slice(1).toLowerCase();
          const genre = firstLetter + restOfLetters;
          params.append(key, genre);
        } else {
          params.append(key, value.toString());
        }
      }
    });
    return params.toString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;
    // I'm having so much fun with typescript! :)
    let finalValue: string | boolean = value;
    if (name === 'available') {
      finalValue = !values.available;
    }
    setValues((prevValues) => ({ ...prevValues, [name]: finalValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        const query = generateQuery(values);

        const newSearchParams: URLSearchParams = new URLSearchParams(query);
        setSearchParams(newSearchParams.toString());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).filter_modal.close();
      })
      .catch((err: yup.ValidationError) => {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      });
  };

  const handleCancel = () => {
    setValues({
      genre: '',
      title: '',
      artist: '',
      minPrice: 0,
      maxPrice: 0,
      available: false,
    });
    setErrors({});
  };

  return (
    <form method="dialog" className="modal-box" onSubmit={handleSubmit}>
      <h3 className="font-bold text-lg">Filters</h3>
      <div className="py-4">
        <div>
          <label className="label cursor-pointer">
            <span className="label-text flex-1">Genre</span>
            <input
              type="text"
              placeholder="Type here"
              value={values.genre}
              onChange={handleChange}
              name="genre"
              className="input input-sm mx-4 flex-auto"
            />
          </label>
        </div>
        <div>
          <label className="label cursor-pointer justify-center">
            <span className="label-text flex-1">Title</span>
            <input
              type="text"
              placeholder="Your favorite album"
              value={values.title}
              onChange={handleChange}
              name="title"
              className="input input-sm mx-4 flex-auto"
            />
          </label>
        </div>
        <div>
          <label className="label cursor-pointer justify-center">
            <span className="label-text flex-1">Artist</span>
            <input
              type="text"
              placeholder="Cool artist"
              value={values.artist}
              onChange={handleChange}
              name="artist"
              className="input input-sm mx-4 flex-auto"
            />
          </label>
        </div>
        <div className="flex">
          <label className="label cursor-pointer flex-1">
            <span className="label-text">Minimum Price</span>
            <input
              type="number"
              placeholder="0"
              value={values.minPrice}
              onChange={handleChange}
              name="minPrice"
              min={0}
              className="input input-sm m-2 w-full"
            />
          </label>
          <label className="label cursor-pointer flex-1">
            <span className="label-text">Maximum Price</span>
            <input
              type="number"
              placeholder="inf"
              value={values.maxPrice}
              onChange={handleChange}
              name="maxPrice"
              min={0}
              className="input input-sm m-2 w-full"
            />
          </label>
        </div>
        <div>
          <label className="label cursor-pointer gap-16">
            <span className="label-text">Available</span>
            <div className="flex flex-col flex-auto">
              <input
                type="checkbox"
                checked={values.available}
                onChange={handleChange}
                name="available"
                className="checkbox"
              />
            </div>
          </label>
        </div>
      </div>
      <div className="modal-action flex justify-around">
        <button
          className="btn"
          type="button"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).filter_modal.close();
          }}
        >
          Cancel
        </button>
        <button className="btn" type="button" onClick={handleCancel}>
          Clear
        </button>
        <button className="btn" type="submit">
          Filter
        </button>
      </div>
    </form>
  );
}
