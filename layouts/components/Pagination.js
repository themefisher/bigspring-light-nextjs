import Link from "next/link";
import React from "react";

const Pagination = ({ section, currentPage, totalPages }) => {
  const indexPageLink = currentPage === 2;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  let pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  return (
    <>
      {totalPages > 1 && (
        <nav
          className="mb-4 mt-10 flex justify-center space-x-[10px]"
          aria-label="Pagination"
        >
          {/* previous */}
          {hasPrevPage ? (
            <Link
              href={
                indexPageLink
                  ? `${section ? "/" + section : "/"}`
                  : `${section ? "/" + section : ""}/page/${currentPage - 1}`
              }
              className="inline-flex w-[42px] justify-center rounded-md bg-theme-light px-2 py-2 text-dark hover:bg-primary hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="mt-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          ) : (
            <span className="inline-flex w-[42px] justify-center rounded-md bg-theme-light px-2 py-2 text-dark">
              <span className="sr-only">Previous</span>
              <svg
                className="mt-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}

          {/* page index */}
          {pageList.map((pagination, i) => (
            <React.Fragment key={`page-${i}`}>
              {pagination === currentPage ? (
                <span
                  aria-current="page"
                  className={`rounded-md bg-primary px-4 py-2 text-white`}
                >
                  {pagination}
                </span>
              ) : (
                <Link
                  legacyBehavior={true}
                  href={
                    i === 0
                      ? `${section ? "/" + section : "/"}`
                      : `${section ? "/" + section : ""}/page/${pagination}`
                  }
                  passHref
                >
                  <a
                    aria-current="page"
                    className={`rounded-md  bg-theme-light px-4 py-2 text-dark hover:bg-primary hover:text-white`}
                  >
                    {pagination}
                  </a>
                </Link>
              )}
            </React.Fragment>
          ))}

          {/* next page */}
          {hasNextPage ? (
            <Link
              href={`${section ? "/" + section : ""}/page/${currentPage + 1}`}
              className="inline-flex w-[42px] justify-center rounded-md bg-theme-light px-2 py-2 text-dark hover:bg-primary hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="mt-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          ) : (
            <span className="inline-flex w-[42px] justify-center rounded-md bg-theme-light px-2 py-2 text-dark">
              <span className="sr-only">Next</span>
              <svg
                className="mt-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}
        </nav>
      )}
    </>
  );
};

export default Pagination;
