import React from 'react'

interface Props {
  title: string;
  subTitle: string;
  children?: React.ReactNode;
}

const Tile = (props: Props) => {
  return (
    <div className={"w-full lg:w-full px-4"}>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 shadow-lg">
        <div className="flex-auto p-4">
          <h5 className="text-blueGray-400 uppercase font-bold text-xs">
            {props.title}
          </h5>
          {props.subTitle ? (
            <span className="font-bold text-xl whitespace-pre-line">
              {props.subTitle}
            </span>
          ) : (
            props.children
          )}
        </div>
      </div>
    </div>
  );
};

export default Tile;
