import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { IActivityLogs } from "../../models/activity-logs";

const ActivityLogs = ({ logs }: { logs: IActivityLogs[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const logsItem = [...logs].reverse();

  const pageCount = logsItem ? Math.ceil(logsItem.length / itemsPerPage) : 0;

  const paginationSize = Array.from(
    { length: pageCount },
    (_, index) => index + 1
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageLogs = logsItem ? logsItem.slice(startIndex, endIndex) : [];

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <article className="md:w-[60vw]: lg:w-[80vw] h-[100vh] overflow-auto mt-10">
        <Table>
          <TableCaption className="text-xl font-bold">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    className="text-black border-1 border-black py-2 px-2 font-medium rounded-lg text-lg"
                    href="#"
                  />
                </PaginationItem>
                {paginationSize.map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      className="text-black"
                      onClick={() => handlePageChange(pageNumber)}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage < pageCount &&
                      handlePageChange(currentPage + 1)
                    }
                    className="text-black border-1 border-black py-2 px-2 font-medium rounded-lg  text-lg"
                    href="#"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] text-lg font-bold">
                Action
              </TableHead>

              <TableHead className="w-[150px] text-lg font-bold">
                Created by
              </TableHead>
              <TableHead className="w-[150px] text-lg font-bold">
                Action type
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPageLogs.map((log) => (
              <TableRow key={log.id}>
                {/* Assuming each log has a unique id */}
                <TableCell className="font-medium font-hero-semibold ">
                  {log.action} {/* Replace with actual log properties */}
                </TableCell>
                <TableCell className="font-medium font-hero-semibold ">
                  {log.createdBy} {/* Replace with actual log properties */}
                </TableCell>
                <TableCell className="font-medium font-hero-semibold ">
                  {log.typeOfAction} {/* Replace with actual log properties */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter></TableFooter>
        </Table>
      </article>
    </div>
  );
};

export default ActivityLogs;
