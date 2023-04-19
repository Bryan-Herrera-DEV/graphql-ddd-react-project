const Home = () => {
  return (
    <section className="w-full pt-[1.5rem] shadow-xl">
      <header className="w-full space-y-4 bg-base-200 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-white">My Todo Lists</h2>
        </div>
      </header>
      <ul className="grid h-100 grid-cols-1 gap-4 bg-base-100 p-4 text-sm leading-6 sm:grid-cols-2 sm:px-8 sm:pb-8 sm:pt-6 lg:grid-cols-1 lg:p-4 xl:grid-cols-2 xl:px-8 xl:pb-8 xl:pt-6">
        <li style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 10rem), 1fr))",
            gridAutoFlow: "dense"
        }}>
          <div className="group rounded-md bg-base-100 p-3 shadow-sm ring-1 ring-slate-200 hover:bg-primary hover:ring-primary">
            Title: Text
          </div>
        </li>
        <li className="flex">
          <a
            className="group flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-100 py-3 text-sm font-medium leading-6 text-slate-100 hover:border-solid hover:border-base-300 hover:bg-slate-100 hover:text-base-300"
          >
            <svg
              className="mb-1 text-slate-100 group-hover:text-base-300"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
            New ToDo List
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Home;
