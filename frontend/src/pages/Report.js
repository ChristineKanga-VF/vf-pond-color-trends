import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import * as XLSX from "xlsx";

export const Report = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/submitted-data"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const openModal = (file) => {
    setModalContent(file);
    setIsModalOpen(true);
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheetData = [];
    const headers = ["Category", "Pond"];
    // Extract unique dates from the data
    const uniqueDates = [
      ...new Set(data.map((item) => item.date.split(" ")[0])),
    ];

    uniqueDates.forEach((date) => {
      headers.push({
        v: new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        s: { font: { bold: true } },
      });
    });

    worksheetData.push(headers);

    data.forEach((item) => {
      const row = [item.category, item.pond];
      uniqueDates.forEach((date) => {
        if (item.date.startsWith(date)) {
          // Push the closest color name for the corresponding date
          row.push(item.closestColorName);
        } else {
          row.push(""); // Push an empty string if the date doesn't match (optional, depends on your requirements)
        }
      });
      worksheetData.push(row);
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData, {
      skipHeader: true,
    });

    // Append the worksheet to the workbook with the name "Pond Color"
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pond Color");

    // Generate an Excel file named "VF_Ponds_Color_Trends.xlsx"
    XLSX.writeFile(workbook, "VF_Ponds_Color_Trends.xlsx");
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <Header />

      <section className="overflow-x-auto">
        <div className="lg:mx-10 sm:flex sm:items-center sm:justify-between">
          <h2 className="text-lg font-medium px-3 text-black mb-2">
            Pond Color Trends
          </h2>

          <div className="flex items-center mt-2 mb-4 gap-x-3 lg:float-right">
            <button
              onClick={exportToExcel}
              className="w-full sm:w-auto flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-green-600 rounded-lg gap-x-2 hover:bg-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>

              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-lg lg:mx-12">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-4 text-sm font-normal text-left text-black">
                  Image
                </th>
                <th className="px-4 py-4 text-sm font-normal text-left text-black">
                  Color
                </th>
                <th className="px-4 py-4 text-sm font-normal text-left text-black">
                  Category
                </th>
                <th className="px-4 py-4 text-sm font-normal text-left text-black">
                  Pond
                </th>
                <th className="px-4 py-4 text-sm font-normal text-left text-black">
                  Date
                </th>
                <th className="py-4 px-4 text-sm font-normal text-left text-black"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => (
                  <tr key={`${item.imageFilename}-${index}`}>
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                      <div className="flex items-center gap-x-3">
                        <div className="w-8 h-8 flex items-center justify-center text-green-500 bg-green-100 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h2 className="font-medium text-wrap text-black">
                            {item.imageFilename}
                          </h2>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-white whitespace-nowrap">
                      <div
                        className="inline-flex items-center gap-x-2 rounded-full px-3 py-1"
                        style={{ backgroundColor: item.closestColor }}
                      >
                        <h2 className="text-sm font-normal text-white">
                          {item.closestColorName}
                        </h2>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-black whitespace-nowrap">
                      {item.category}
                    </td>
                    <td className="px-4 py-4 text-sm text-black whitespace-nowrap">
                      {item.pond}
                    </td>
                    <td className="px-4 py-4 text-sm text-black whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <button
                        className="text-black transition-colors duration-200 hover:text-green-500 focus:outline-none"
                        onClick={() => openModal(item)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg">
              <div>
                <img
                  src={`http://localhost:5000/${modalContent.imageFilename}`}
                  alt={modalContent.imageFilename}
                  className="mt-4 w-full h-auto rounded-lg"
                />
              </div>

              <div>
                <label className="block mt-2 text-sm font-medium text-black">
                  Color in Palette:
                </label>
                <div
                  style={{ backgroundColor: modalContent.closestColor }}
                  className="py-1 px-2 mt-1 block w-full border border-gray-300 shadow-sm rounded-md"
                >
                  <p className="text-sm">
                    <span className="p-2 text-white">
                      {modalContent.closestColorName} (
                      {modalContent.closestColor})
                    </span>
                  </p>
                </div>
              </div>

              <button
                className="mt-4 px-4 py-2 bg-red-500 float-right text-white rounded-lg hover:bg-red-600"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <section className="lg:mx-10 mx-auto px-4">
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-black transition-colors duration-200 ${
                currentPage === 1
                  ? "opacity-100 cursor-not-allowed"
                  : "hover:bg-green-400 hover:text-white"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Previous </span>
            </button>

            <div className="hidden items-center gap-x-3 md:flex">
              {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number + 1)}
                    className={`rounded-md ${
                      currentPage === number + 1
                        ? "bg-green-100/60 px-2 py-1 text-sm text-black"
                        : "px-2 py-1 text-sm text-black hover:bg-green-100/60"
                    }`}
                  >
                    {number + 1}
                  </button>
                )
              )}
            </div>

            <button
              onClick={nextPage}
              disabled={data.length < itemsPerPage || data.length === 0}
              className={`flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-black transition-colors duration-200 ${
                currentPage * itemsPerPage >= data.length
                  ? "opacity-100 cursor-not-allowed"
                  : "hover:bg-green-400 hover:text-white"
              }`}
            >
              <span> Next </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};
