import { useParams } from "react-router-dom";

import Icons from "Utils/Icons";
import JsonData from "Views/Teachers/Utils/JsonData";
import SubjectOptionsCard from "Components/Card/SubjectOptionsCard";
import LinkComponent from "Components/Router_components/LinkComponent";
import StudentsTableCard from "./StudentsTableCard";
import ReactPaginateComp from "Components/Pagination/ReactPaginateComp";
import PerformanceTable from "./PerformanceTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { handleJsonStudentsData } from "Views/Teachers/Slice/teachersSlice";
import axios from "axios";

const SelfTakingTest = () => {
    // const {
    //     activeTab,
    //     searchResults,
    //     jsonStudentsData
    // } = useSelector(state => state.teachersState)
    // const dispatch = useDispatch()
    const { allStudentData } = JsonData().jsonOnly;
    const { class_id, subject_id } = useParams();

    // useEffect(() => {
    //     dispatch(handleJsonStudentsData(allStudentData))
    // }, [])

    const [activeTab, setActiveTab] = useState("teachers");
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(10);

    const [jsonStudentsData, setJsonStudentsData] = useState([]);
    const [selectClass, setSelectClass] = useState("allClasses");

    useEffect(() => {
        const fetchStudentsData = async () => {
            try {
                let expr = selectClass;

                switch (expr) {
                    case "class1":
                        const res = await axios.get("/class1StudentsData.json");
                        const Data = res.data;
                        setJsonStudentsData(Data);
                        break;

                    case "class2":
                        const res2 = await axios.get("/class2StudentsData.json");
                        const Data2 = res2.data;
                        setJsonStudentsData(Data2);
                        break;

                    case "class3":
                        const res3 = await axios.get("/class3StudentsData.json");
                        const Data3 = res3.data;
                        setJsonStudentsData(Data3);
                        break;

                    default:
                        const res4 = await axios.get("/allClassesStudentsData.json");
                        const Data4 = res4.data;
                        setJsonStudentsData(Data4);
                }

                setCurrentPage(1);
            } catch (error) {
                console.log(`Error in fetchStudentsData : ${error}`);
            }
        };

        (async () => fetchStudentsData())();
    }, [selectClass]);

    const siblingCount = 1;
    const indexOfLastRecord = currentPage * recordPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
    const currentPageRecord = jsonStudentsData.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );
    const nPages = Math.ceil(jsonStudentsData.length / recordPerPage);

    const DOTS = "...";

    const range = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, index) => index + start);
    };

    const getPaginationRange = () => {
        const totalNumbersToShow = siblingCount * 2 + 5;
        if (nPages <= totalNumbersToShow) return range(1, nPages);

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, nPages);

        const showLeftDots = leftSiblingIndex > 2;
        const showRightDots = rightSiblingIndex < nPages - 1;

        if (!showLeftDots && showRightDots) {
            const leftRange = range(1, 3 + siblingCount * 2);
            return [...leftRange, DOTS, nPages];
        }

        if (showLeftDots && !showRightDots) {
            const rightRange = range(nPages - (2 + siblingCount * 2), nPages);
            return [1, DOTS, ...rightRange];
        }

        if (showLeftDots && showRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [1, DOTS, ...middleRange, DOTS, nPages];
        }
    };

    const paginationRange = getPaginationRange();

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < nPages) setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        const filteredResults = currentPageRecord.filter((record) =>
            record.name.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults);
    }, [search, currentPage, recordPerPage, jsonStudentsData]);


    return (
        <div>
            <PerformanceTable
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                students={searchResults}
                jsonStudentsData={jsonStudentsData}
            />
            <div className="mt-3">
                <ReactPaginateComp />
            </div>
        </div>
    )
}

export default SelfTakingTest;