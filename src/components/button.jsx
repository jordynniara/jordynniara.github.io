import { Link } from "react-router";
import PropTypes from 'prop-types';

// Shared styling configuration
const variantClasses = {
    sky: "btn-sky",
    strawberry: "btn-strawberry",
    inchworm: "btn-inchworm",
  };

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base",
  default: "px-4 py-2 text-sm md:px-6 md:py-3 md:text-base lg:px-8 lg:py-4 lg:text-lg xl:text-xl",
  lg: "px-5 py-2.5 text-base md:px-8 md:py-4 md:text-lg lg:px-10 lg:py-5 lg:text-xl xl:text-2xl",
};

// Helper to build class names
const buildClasses = (baseClass, variant, size, className) => {
  return `${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();
};

// Shared prop types
const sharedPropTypes = {
  variant: PropTypes.oneOf(['default', 'inchworm', 'sky', 'strawberry']),
  size: PropTypes.oneOf(['xs', 'sm', 'default', 'lg']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

// ===== BUTTON COMPONENT =====
export const Button = ({
  variant = "strawberry",
  size = "default",
  className = "",
  children,
  ...props
}) => {
  const classes = buildClasses("btn", variant, size, className);
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  ...sharedPropTypes,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

// ===== INTERNAL LINK COMPONENT (React Router) =====
const InternalLink = ({
  variant = "strawberry",
  size = "default",
  className = "",
  to = "/",
  children,
  ...props
}) => {
  const classes = buildClasses("link-btn", variant, size, className);
  return (
    <Link to={to} className={classes} {...props}>
      {children}
    </Link>
  );
};

InternalLink.propTypes = {
  ...sharedPropTypes,
  to: PropTypes.string.isRequired,
};

// ===== EXTERNAL LINK COMPONENT =====
const ExternalLink = ({
  variant = "strawberry",
  size = "default",
  className = "",
  href,
  children,
  ...props
}) => {
  const classes = buildClasses("link-btn", variant, size, className);
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={classes}
      {...props}
    >
      {children}
    </a>
  );
};

ExternalLink.propTypes = {
  ...sharedPropTypes,
  href: PropTypes.string.isRequired,
};

// ===== ANCHOR LINK COMPONENT (same page) =====
const AnchorLink = ({
  variant = "strawberry",
  size = "default",
  className = "",
  href,
  children,
  ...props
}) => {
  const classes = buildClasses("link-btn", variant, size, className);
  return (
    <a 
      href={href}
      className={classes}
      {...props}
    >
      {children}
    </a>
  );
};

AnchorLink.propTypes = {
  ...sharedPropTypes,
  href: PropTypes.string.isRequired,
};

// ===== DOWNLOAD LINK COMPONENT =====
const DownloadLink = ({
  variant = "strawberry",
  size = "default",
  className = "",
  href,
  download,
  children,
  ...props
}) => {
  const classes = buildClasses("link-btn", variant, size, className);
  return (
    <a 
      href={href} 
      download={download}
      className={classes}
      {...props}
    >
      {children}
    </a>
  );
};

DownloadLink.propTypes = {
  ...sharedPropTypes,
  href: PropTypes.string.isRequired,
  download: PropTypes.string,
};

// ===== LEGACY LINKBUTTON (for backwards compatibility) =====
// This component maintains the old API but delegates to the new components
export const LinkButton = ({
  variant = "strawberry",
  size = "default",
  className = "",
  to,
  href,
  download,
  children,
  ...props
}) => {
  // Download link
  if (download && href) {
    return (
      <DownloadLink 
        variant={variant} 
        size={size} 
        className={className} 
        href={href} 
        download={download}
        {...props}
      >
        {children}
      </DownloadLink>
    );
  }

  // Anchor link (same page)
  if (to?.startsWith('#') || href?.startsWith('#')) {
    return (
      <AnchorLink 
        variant={variant} 
        size={size} 
        className={className} 
        href={to || href}
        {...props}
      >
        {children}
      </AnchorLink>
    );
  }

  // External link
  if (href) {
    return (
      <ExternalLink 
        variant={variant} 
        size={size} 
        className={className} 
        href={href}
        {...props}
      >
        {children}
      </ExternalLink>
    );
  }

  // Internal link (React Router)
  return (
    <InternalLink 
      variant={variant} 
      size={size} 
      className={className} 
      to={to || '/'}
      {...props}
    >
      {children}
    </InternalLink>
  );
};

LinkButton.propTypes = {
  ...sharedPropTypes,
  to: PropTypes.string,
  href: PropTypes.string,
  download: PropTypes.string,
  onClick: PropTypes.func,
};