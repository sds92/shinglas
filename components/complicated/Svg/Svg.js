export const SVGImage = ({ children, extraClasses, className, ...props }) => {
  return (
    <svg className={`${extraClasses} ${className}`} {...props}>
      {children}
    </svg>
  );
};
