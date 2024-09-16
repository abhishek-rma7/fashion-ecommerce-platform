import cn from "classnames";
interface Props {
  id?: string;
  className?: string;
  children?: any;
  el?: HTMLElement;
  clean?: boolean;
}

const Container: React.FC<Props> = ({
  children,
  className,
  el = "div",
  clean,
  id,
}) => {
  const rootClassName = cn(className, {
    "mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16": !clean,
  });

  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> =
    el as any;

  return (
    <Component className={rootClassName} id={id}>
      {children}
    </Component>
  );
};

export default Container;
