import React, { ChangeEvent, SyntheticEvent } from "react";

interface Props {
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string | undefined;
}
const Search: React.FC<Props> = (props: Props): JSX.Element => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <section className="relative">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <form
          onSubmit={handleSubmit}
          className="form relative flex flex-col w-full p-10 space-y-1 rounded-lg md:flex-row md:space-y-0 md:space-x-3"
        >
          <input
            className="flex-1 p-3 border-2 rounded-lg placeholder-black focus:outline-none"
            id="search-input"
            placeholder="Search recipes"
            value={props.search}
            onChange={props.handleSearchChange}
          />
        </form>
      </div>
    </section>
  );
};

export default Search;
