export const Top10PokemonSkeletonLoader = () => {
  return (
    <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className='flex animate-pulse flex-col items-center rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800'
        >
          <div className='mb-2 h-24 w-24 rounded-full bg-gray-300 dark:bg-gray-600'></div>
          <div className='mt-2 h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600'></div>
          <div className='mt-2 h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-600'></div>
        </div>
      ))}
    </div>
  );
};
