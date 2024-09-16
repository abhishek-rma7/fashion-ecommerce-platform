import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React from "react";

const Link: React.FC<
  NextLinkProps & { className?: string; children?: React.ReactNode }
> = ({ href, children, ...props }) => {
  return (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
