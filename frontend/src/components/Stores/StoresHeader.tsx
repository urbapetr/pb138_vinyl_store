interface StoresHeaderProps {
  orderByCallback: (arg0: string) => void;
  availableCallback: (arg0: boolean) => void;
}

export function StoresHeader({
  orderByCallback,
  availableCallback,
}: StoresHeaderProps) {
  return (
    <div className="flex p-4 font-aoboshi gap-4">
      <div className="flex gap-4 justify-start">
        <span className="m-auto text-white">Order By</span>
        <select
          defaultValue="Price"
          className="select select-bordered select-sm m-auto"
          onChange={(event) => {
            orderByCallback(event.target.value.toLowerCase());
          }}
        >
          <option>Price</option>
          <option>Name</option>
        </select>
      </div>
      <div data-theme="luxury" className="bg-neutral-800 flex-1 gap-2">
        <label className="label cursor-pointer flex justify-end gap-4">
          <span className="label-text text-white text-base">
            Only Available
          </span>
          <div className="flex flex-col">
            <input
              type="checkbox"
              defaultChecked={false}
              className="checkbox checkbox-primary"
              onChange={(event) => {
                availableCallback(event.target.checked);
              }}
            />
          </div>
        </label>
      </div>
    </div>
  );
}
