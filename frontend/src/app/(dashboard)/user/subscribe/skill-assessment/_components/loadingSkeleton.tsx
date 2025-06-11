export default function LoadingSkeleton() {
    const index: number[] = [1,2,3,4,5];
    return (
        <>
            {index.length > 0 && index.map((i) => 
                <div key={i}
                    className="mb-4 p-4 border border-gray-300 rounded flex-row sm:flex items-center justify-between gap-3 shadow-md animate-pulse"
                >
                    <div className="flex items-center gap-5">
                        <div className="border-b w-5 bg-gray-200 h-5 rounded-sm border-gray-300 text-shadow-sm"></div>
                        <div>
                            <h3 className="text-lg my-2 font-semibold h-3 w-60 bg-gray-200 rounded-sm"></h3>
                            <p className="bg-gray-200 h-3 w-96 my-2 rounded-sm"></p>
                        </div>
                    </div>
                    <div className="flex justify-end sm:items-center mt-3 sm:mt-0 gap-4 space-x-3">
                        <span className="w-20 text-xs bg-gray-200 p-3 rounded-lg text-center mr-3">
                        </span>
                        <button
                            className="px-5 py-2 bg-gray-200 rounded-lg"
                        >
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
