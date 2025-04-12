
import React from "react";
import { AppProvider } from "@/context/AppContext";
import Layout from "@/components/Layout";
import HomeScreen from "@/components/HomeScreen";

const Index: React.FC = () => {
  return (
    <AppProvider>
      <Layout>
        <HomeScreen />
      </Layout>
    </AppProvider>
  );
};

export default Index;
