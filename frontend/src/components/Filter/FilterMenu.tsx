export function FilterMenu() {
  return (
    <form method="dialog" className="modal-box">
      <h3 className="font-bold text-lg">Filters</h3>
      <div className="py-4">
        <div>
          <label className="label cursor-pointer">
            <span className="label-text flex-1">Genre</span>
            <input
              type="text"
              placeholder="Type here"
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
              min={0}
              className="input input-sm m-2 w-full"
            />
          </label>
          <label className="label cursor-pointer flex-1">
            <span className="label-text">Maximum Price</span>
            <input
              type="number"
              placeholder="inf"
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
                defaultChecked={false}
                className="checkbox"
              />
            </div>
          </label>
        </div>
      </div>
      <div className="modal-action flex justify-around">
        <button className="btn" type="submit">
          Cancel
        </button>
        <button className="btn" type="submit">
          Filter
        </button>
      </div>
    </form>
  );
}
