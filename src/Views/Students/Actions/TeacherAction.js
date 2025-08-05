import { initializeDB } from "Components/CustomHooks";
import {
    updateAnswers,

} from "Views/Students/Slices/TeacherSlice";


export const handleUpdateAnswer = (data) => (dispatch) => {
    initializeDB(process.env.REACT_APP_INDEXEDDB_DATABASE_NAME, process.env.REACT_APP_INDEXEDDB_DATABASE_VERSION, process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME)
        .then((db) => {
            const transaction = db.transaction(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME, "readwrite");
            const store = transaction.objectStore(process.env.REACT_APP_INDEXEDDB_DATABASE_STORENAME);

            const targetIndex = data?.updationInd;
            const updatedAnswer = data?.ans;

            const getRequest = store.get(targetIndex);

            getRequest.onsuccess = function () {
                const targetObject = getRequest.result;
                if (targetObject) {
                    targetObject.candidate_answer = updatedAnswer;

                    const putRequest = store.put(targetObject);

                    putRequest.onsuccess = function () {
                        const getAllRequest = store.getAll();
                        getAllRequest.onsuccess = function () {
                            dispatch(updateAnswers(getAllRequest.result));
                        };
                    };

                    putRequest.onerror = function (event) {
                        console.error("Failed to update object:", event.target.error);
                    };
                } else {
                    console.error(`No object found with id: ${targetIndex}`);
                }
            };

            getRequest.onerror = function (event) {
                console.error("Failed to fetch object:", event.target.error);
            };

            transaction.oncomplete = function () {
                console.log("Transaction completed successfully.");
            };

            transaction.onerror = function (event) {
                console.error("Transaction failed:", event.target.error);
            };
        })
        .catch((error) => {
            console.error("Failed to open database:", error);
        })
};