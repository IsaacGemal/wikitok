import { Loader2 } from "lucide-react";
import { forwardRef, ForwardedRef } from "react";

interface LoaderProps {
  text?: string;
  loading?: boolean;
  progressive?: boolean;
}

const Loader = forwardRef(
  (
    { text = "Loading...", loading, progressive }: LoaderProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div className={`loader${progressive ? " pending" : ""}`} ref={ref}>
        {loading && (
          <div className="spinner">
            <Loader2 />
            <span>{text}</span>
          </div>
        )}
      </div>
    );
  }
);

export default Loader;
