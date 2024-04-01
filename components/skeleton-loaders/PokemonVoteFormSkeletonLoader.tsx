export const PokemonVoteFormSkeletonLoader = () => {
  return (
    <div className='flex w-full flex-wrap justify-center'>
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className='m-4 flex h-full w-full animate-pulse flex-col rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 md:w-1/3'
        >
          <div className='flex flex-col items-center p-4 sm:p-6'>
            <div className='h-24 w-24 rounded-full bg-gray-300 sm:h-28 sm:w-28'></div>
            <div className='mt-4 h-4 w-1/2 rounded bg-gray-300'></div>
            <div className='mt-2 h-4 w-1/3 rounded bg-gray-300'></div>
            <div className='mt-2 h-4 w-1/4 rounded bg-gray-300'></div>
            <div className='mt-4 h-8 w-1/3 rounded bg-gray-400'></div>
          </div>
          <div className='flex flex-col gap-2 border-t border-gray-200 p-4 dark:border-gray-700'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='h-4 w-1/2 rounded bg-gray-300'></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
