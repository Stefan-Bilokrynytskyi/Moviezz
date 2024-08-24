import { useEffect, RefObject } from "react";

/**
 * Hook that alerts clicks outside of the passed refs
 */
export default function useClickOutside(
  refs: RefObject<HTMLElement>[],
  cbFn: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isContain = refs.some((ref) =>
        ref.current?.contains(event.target as Node)
      );
      if (!isContain) {
        cbFn();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, cbFn]);
}
