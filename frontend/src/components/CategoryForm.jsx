import React from "react";

const CategoryForm = ({
  value,
  setValue,
  submitHandle,
  deleteHandle,
  title,
}) => {
  return (
    <div>
      <form onSubmit={submitHandle}>
        <input
          type="text"
          placeholder="danh mục..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="focus:outline-none text-primary-dark border border-gray-300 bg-white px-4 py-2 rounded-md "
        />
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="rounded-sm text-sm text-white bg-primary-blue px-4 py-2 block mt-2"
          >
            {title}
          </button>
          {deleteHandle && (
            <button
              className="rounded-sm text-sm text-primary-red bg-white font-bold px-4 py-2 block mt-2"
              type="button"
              onClick={deleteHandle}
            >
              Xóa
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
