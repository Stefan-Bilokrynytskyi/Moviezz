import { useEffect } from "react";

const useMount = (onRender: () => void) => {
  useEffect(() => {
    onRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMount;
