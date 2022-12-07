import { SetStateAction, useCallback, useRef } from "react";

function useInfiniteScroll(isLoading:boolean,hasMore:boolean,setPageNum: (value: SetStateAction<number>) => void) {
    const observer:any = useRef();
    console.log(observer.current)
    const elementRef = useCallback(
        (node: any) => {
          if (isLoading) return;
          if (typeof observer.current !== 'undefined') observer.current.disconnect();
          observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              setPageNum((prev) => prev + 1);
            }
          });
          if (node) observer?.current.observe(node);
        },
        [isLoading, hasMore]
      );
      return elementRef;
}

export default useInfiniteScroll;