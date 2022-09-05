import React, { useContext, createContext, useState, useEffect } from "react";

export const ClusterContext = createContext();

export const ClusterProvider = ({ children }) => {
  const [Cluster, setCluster] = useState({
    name: "",
    endpoint: "",
  });

  const changeCluster = ({ name, endpoint }) => {
    setCluster({
      name,
      endpoint,
    });
    localStorage.setItem(
      "Solana-Cluster",
      JSON.stringify({
        name,
        endpoint,
      })
    );
  };

  useEffect(() => {
    const getCluster = JSON.parse(localStorage.getItem("Solana-Cluster"));

    if (getCluster) {
      const { name, endpoint } = getCluster;
      setCluster({
        name,
        endpoint,
      });
    } else {
      localStorage.setItem(
        "Solana-Cluster",
        JSON.stringify({
          name: "Mainnet Beta",
          endpoint: "https://solana-api.projectserum.com",
        })
      );
    }
  }, []);

  return (
    <ClusterContext.Provider value={{ Cluster,changeCluster }}>
      {children}
    </ClusterContext.Provider>
  );
};

export const useCluster = () => useContext(ClusterContext);
