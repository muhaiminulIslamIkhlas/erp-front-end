import React from "react";
import Admin from "../../components/templates/dashboard/admin";

interface DashboardProps {
  children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <Admin>
      <div className="p-dashboard">{children}</div>
    </Admin>
  );
};

export default Dashboard;
