
import InputOnly from 'Components/Input/inputOnly';
import Icons from 'Utils/Icons';
import { useCommonState, useDispatch } from 'Components/CustomHooks';
import { update_error, update_search } from 'Views/Common/Slices/Common_slice';

export function SearchComponent({ className, placeholder, onClick }) {
    const dispatch = useDispatch();
    const { commonState } = useCommonState();

    function handleSearchClicked() {
        if (commonState?.search?.value) {
            if (typeof onClick === 'function') onClick();
        }
        else dispatch(update_error({ Toast_Type: "error", Err: "search field should not be empty" }))
    }

    function handleSearchEnter(event) {
        if (event.code === "Enter") {
            if (commonState?.search?.value) {
                if (typeof onClick === 'function') onClick();
            }
            else dispatch(update_error({ Toast_Type: "error", Err: "search field should not be empty" }))
        }
    }

    return (
        <div className="position-relative w-100">
            <InputOnly
                type="text"
                className={className}
                placeholder={placeholder}
                change={(e) => dispatch(update_search({ value: e.target.value || '', clicked: false }))}
                keyDown={handleSearchEnter}
                value={commonState?.search?.value || ''}
            />

            <span className="input-group-start-icon">{Icons.searchIcon}</span>
            {/* {commonState?.search?.value ? <span className="input-group-end-icon-two cursor-pointer" onClick={handleSearchClicked}>{Icons.searchIcon}</span> : null}
            <span className={`${!commonState?.search?.clicked ? "pe-none" : 'cursor-pointer'} input-group-end-icon-one`} onClick={() => dispatch(update_search({ value: '', clicked: false }))}>{Icons.searchCancelIcon}</span> */}
        </div>
    );

}