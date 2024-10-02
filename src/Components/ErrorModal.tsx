import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

interface ErrorModalProps {
  onReset: () => void;
}

const ErrorModal = forwardRef<HTMLDialogElement, ErrorModalProps>(
  function ErrorModal(props, ref) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

    return createPortal(
      <dialog ref={dialogRef} className="bg-lightBlack rounded-md p-5">
        <div className="text-lightGrey text-2xl font-bold mx-5 my-3">
          Sorry, this page is not available now.
        </div>
        <form
          method="dialog"
          onSubmit={props.onReset}
          className="flex justify-center"
        >
          <button
            className="bg-lightOrange text-white px-4 py-2 rounded-lg mx-5 hover:bg-orange-600 my-5"
            type="submit"
          >
            Go Back
          </button>
        </form>
      </dialog>,

      document.getElementById("modal") as HTMLElement
    );
  }
);

export default ErrorModal;
