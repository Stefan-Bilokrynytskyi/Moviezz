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
  console.log(lastPage);

  const generatePages = () => {
    if (lastPage <= 6) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    if (page > firstPage + 3 && page < lastPage - 3) {
      return [
        1,
        null,
        page - 2,
        page - 1,
        page,
        page + 1,
        page + 2,
        null,
        lastPage,
      ];
    }

    if (page <= firstPage + 3) {
      return [1, 2, 3, 4, 5, 6, null, lastPage];
    }

    return [
      1,
      null,
      lastPage - 5,
      lastPage - 4,
      lastPage - 3,
      lastPage - 2,
      lastPage - 1,
      lastPage,
    ];
  };

  const pages: (number | null)[] = generatePages();
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
