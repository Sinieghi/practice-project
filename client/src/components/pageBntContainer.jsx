import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import {
  useLocation,
  Link,
  useNavigate,
  useLoaderData,
} from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";
const PageBntContainer = () => {
  const { data } = useAllJobsContext();
  const pages = Array.from({ length: data.numOfPage }, (_, index) => {
    return index + 1;
  });
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
    console.log(pageNumber);
  };
  const addPageBtn = ({ pNumber, activeClass }) => {
    return (
      <button
        key={pNumber}
        onClick={() => handlePageChange(pNumber)}
        className={`btn page-btn ${pages === activeClass && "active"}>`}
      >
        {pNumber}
      </button>
    );
  };
  const renderPageBtns = () => {
    const pageBtn = [];
    pageBtn.push(
      addPageBtn({
        pNumber: 1,
        activeClass: data.currentPage === 1,
      })
    );
    if (data.currentPage !== 1 && data.currentPage !== 2) {
      pageBtn.push(
        addPageBtn({
          pNumber: data.currentPage - 1,
          activeClass: false,
        })
      );
    }
    if (data.currentPage !== 1 && data.currentPage !== data.numOfPage) {
      pageBtn.push(
        addPageBtn({
          pNumber: data.currentPage,
          activeClass: true,
        })
      );
    }
    if (
      data.currentPage !== data.numOfPage &&
      data.currentPage !== data.numOfPage - 1
    ) {
      pageBtn.push(
        addPageBtn({
          pNumber: data.currentPage + 1,
          activeClass: false,
        })
      );
    }
    pageBtn.push(
      addPageBtn({
        pNumber: data.numOfPage,
        activeClass: data.currentPage === data.numOfPage,
      })
    );
    return pageBtn;
  };
  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = data.currentPage - 1;
          if (prevPage < 1) prevPage = data.numOfPage;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
      </button>
      <div className="btn-container">{renderPageBtns()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = data.currentPage + 1;
          if (nextPage > data.numOfPage) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBntContainer;
