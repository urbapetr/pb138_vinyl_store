import { FilterMenu } from './FilterMenu';

export function Filter() {
  return (
    <>
      <button
        type="button"
        className="btn"
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).filter_modal.showModal();
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
