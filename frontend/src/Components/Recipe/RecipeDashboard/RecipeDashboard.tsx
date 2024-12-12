import React from "react";
import { Outlet } from "react-router";

interface Props {
  children: React.ReactNode;
}
const RecipeDashboard = (props: Props) => {
  return (
    <div className="relative md:ml-64 bg-blueGray-100">
      <div className="relative pt-20 pb-32 bg-lightBlue-500">
        <div className="px-4 md:px-6 mx-auto">
          <div>
            <div className="flex flex-wrap">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDashboard;
