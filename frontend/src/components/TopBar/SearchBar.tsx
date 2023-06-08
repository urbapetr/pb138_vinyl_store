import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface SearchData {
  search: string;
}

export function SearchBar() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const { register, handleSubmit } = useForm<SearchData>();

  return (
    <form
      className="flex items-center justify-center"
      onSubmit={handleSubmit((data) => {
        const url = window.location.href.split('?');
        if (!url[0].endsWith('/search')) {
          if (!data.search) {
            navigate('/search?genre=All');
          } else {
            navigate(`/search?needle=${encodeURIComponent(data.search)}`);
          }
          return;
        }

        const newSearchParams: URLSearchParams = new URLSearchParams();
        if (!data.search) {
          newSearchParams.set('genre', 'All');
          setSearchParams(newSearchParams.toString());
        } else {
          newSearchParams.set('needle', data.search);
          setSearchParams(newSearchParams.toString());
        }
      })}
    >
      <div className="join">
        <div>
          <div>
            <input
              id="search"
              className="input join-item"
              placeholder="Search..."
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register('search')}
            />
          </div>
        </div>
        <button type="submit" className="btn join-item">
          Search
        </button>
      </div>
    </form>
  );
}
