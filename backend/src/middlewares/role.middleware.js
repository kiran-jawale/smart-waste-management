import ApiError from "../utils/ApiError.js";

// Higher-order function to check for one or more roles
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, `Forbidden: Requires ${roles.join(' or ')} role`);
    }
    next();
  };
};

export const isAdmin = checkRole(['admin']);
export const isCollector = checkRole(['collector']);
export const isCitizenOrOrg = checkRole(['citizen', 'organisation']);
export const isAdminOrCollector = checkRole(['admin', 'collector']);