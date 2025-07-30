import TestDisplayCard from "Components/Card/TestDisplayCard";

const OngoingTest = () => {

    return (
        <div className="row py-3">
            {Array.from({ length: 24 }).map((_, index) => (
                <div className="col-4 p-2" key={index}>
                    <TestDisplayCard />
                </div>
            ))}
        </div>
    )
}

export default OngoingTest;