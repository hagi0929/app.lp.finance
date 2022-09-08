import React, { useContext, createContext, useState, useEffect } from "react";

export const ClusterContext = createContext();

export const ClusterProvider = ({ children }) => {
  const [Cluster, setCluster] = useState("");

  const changeCluster = (endpoint) => {
    setCluster(endpoint);
    localStorage.setItem("web3.endpoint", endpoint);
  };

  useEffect(() => {
    const getCluster = localStorage.getItem("web3.endpoint");

    if (getCluster) {
      setCluster(getCluster);
    } else {
      setCluster("QuickNode (LP Finance)");
      localStorage.setItem("web3.endpoint", "QuickNode (LP Finance)");
    }

    return () => {
      setCluster("");
    };
  }, []);

  return (
    <ClusterContext.Provider value={{ Cluster, changeCluster }}>
      {children}
    </ClusterContext.Provider>
  );
};

export const useCluster = () => useContext(ClusterContext);
