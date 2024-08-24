interface PaginationProps {
  page: number;

  firstPage: number;
  lastPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  firstPage,
  lastPage,
  onPageChange,
}) => {
  let pages: (number | null)[] = [];

  if (page > firstPage + 3 && page < lastPage - 3) {
    pages = [1, null, page - 2, page - 1, page, page + 1, page + 2, null, 500];
  } else if (page <= firstPage + 3) {
    pages = [1, 2, 3, 4, 5, 6, null, 500];
  } else if (page >= lastPage - 3) {
    pages = [1, null, 495, 496, 497, 498, 499, 500];
  }

  return (
    <div className="mt-7 flex w-full gap-2 justify-center">
      <button
        className={`p-2 text-2xl border rounded-lg border-transparent ${
          page === firstPage
            ? "text-darkGrey"
            : "text-lightGrey hover:border-lightGrey hover:text-lightOrange"
        }`}
        onClick={() => onPageChange(page - 1)}
        disabled={page === firstPage}
      >
        Previous
      </button>
      {pages.map((pageNumber, index) => {
        if (pageNumber === null) {
          return (
            <div key={index} className="text-darkGrey text-2xl self-end mb-2">
              ...
            </div>
          );
        }
        return (
          <button
            className={`text-lightGrey px-2 text-2xl border rounded-lg ${
              pageNumber === page
                ? " border-lightGrey"
                : " border-transparent hover:border-lightGrey hover:text-lightOrange"
            }`}
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className={`p-2 text-2xl border rounded-lg border-transparent  ${
          page === lastPage
            ? "text-darkGrey"
            : "text-lightGrey hover:border-lightGrey hover:text-lightOrange"
        }`}
        onClick={() => onPageChange(page + 1)}
        disabled={page === lastPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
