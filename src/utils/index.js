export const directMessageConfiguration = (params) => {
  const type = params === null || params === void 0 ? void 0 : params.type;
  return {
    sourceType: "DIRECT_PUSH",
    filterType: "DIRECT_TENANT_MESSAGES",
    filterOptions: type === undefined ? null : { directMessageType: type },
  };
};
