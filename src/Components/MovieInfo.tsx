const MovieInfo: React.FC<{ info: { title: string; value: string }[] }> = ({
  info,
}) => {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col gap-3">
        {info.map((item) => (
          <p className="text-darkGrey text-2xl">{item.title}</p>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {info.map((item) => (
          <p className="text-lightGrey text-2xl">{item.value}</p>
        ))}
      </div>
    </div>
  );
};

export default MovieInfo;
