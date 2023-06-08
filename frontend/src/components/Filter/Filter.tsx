import { FilterMenu } from './FilterMenu';
import { FilterModalWindow } from '../../types/FilterModalWindow';

export function Filter() {
  return (
    <>
      <button
        type="button"
        className="btn"
        onClick={() => {
          const myWindow = window as unknown as FilterModalWindow;
          myWindow.filter_modal?.showModal();
        }}
      >
        Filter
      </button>
      <dialog id="filter_modal" className="modal modal-bottom sm:modal-middle">
        <FilterMenu />
        <form method="dialog" className="modal-backdrop">
          <button type="submit">Close</button>
        </form>
      </dialog>
    </>
  );
}
