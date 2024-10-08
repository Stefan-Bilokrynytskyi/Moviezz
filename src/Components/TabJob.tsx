const TabJob: React.FC<{
  job: string;
  isActive: boolean;
  onJobClick: (job: string) => void;
}> = ({ job, isActive, onJobClick }) => {
  return (
    <button
      className={`tab-job text-3xl py-4 px-6 relative text-center ${
        isActive ? "text-lightGrey" : "text-darkGrey hover:cursor-pointer"
      }`}
      onClick={() => onJobClick(job)}
    >
      {job}
      {isActive && (
        <div className="absolute h-1 bg-lightOrange bottom-0 right-0 left-0"></div>
      )}
    </button>
  );
};

export default TabJob;
