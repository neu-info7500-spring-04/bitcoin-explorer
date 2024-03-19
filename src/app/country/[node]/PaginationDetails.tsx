interface Props {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

const PaginationDetails: React.FC<Props> = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
}) => {
  return (
    <div className="p-1 flex flex-row justify-center gap-2">
      <button
        className="font-bold border border-red-500 px-1 text-red-500 rounded hover:bg-red-500 hover:text-black"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <p className="cursor-default text-red-500">
        Page {currentPage} of {totalPages}
      </p>
      <button
        className="font-bold border border-red-500 px-1 text-red-500 rounded hover:bg-red-500 hover:text-black"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationDetails;
