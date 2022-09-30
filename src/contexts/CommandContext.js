import React, { useContext, createContext, useState } from "react";

export const CommandContext = createContext();

export const CommandProvider = ({ children }) => {
  const [isOpenCommand, setIsOpenCommand] = useState(false);
  const [CommandMess, setCommandMess] = useState("");
  const [CommandType, setCommandType] = useState("");

  const OpenCommand = (isOpen, type, message) => {
    setIsOpenCommand(isOpen);
    setCommandMess(message);
    setCommandType(type);
  };

  const closeCommand = () => {
    setIsOpenCommand(false);
    setCommandMess("");
    setCommandType("");
  };

  return (
    <CommandContext.Provider
      value={{
        OpenCommand,
        isOpenCommand,
        CommandMess,
        CommandType,
        closeCommand,
      }}
    >
      {children}
    </CommandContext.Provider>
  );
};

export const useCommand = () => useContext(CommandContext);
